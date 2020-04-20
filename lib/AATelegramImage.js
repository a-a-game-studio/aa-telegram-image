"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImgS = require("./ImgS");
const AATelegramImageSys_1 = require("./AATelegramImageSys");
const uniqid = require("uniqid");
const crypto = require('crypto');
const AATelegramImageDB = require("./AATelegramImageDB");
var ImgSizeE;
(function (ImgSizeE) {
    ImgSizeE[ImgSizeE["s302"] = 320] = "s302";
    ImgSizeE[ImgSizeE["s800"] = 800] = "s800";
    ImgSizeE[ImgSizeE["s1024"] = 1024] = "s1024";
})(ImgSizeE = exports.ImgSizeE || (exports.ImgSizeE = {}));
/**
 * Загрузка картинки
 */
var ImgUploadR;
(function (ImgUploadR) {
    ImgUploadR.route = "/telegram/img_upload";
})(ImgUploadR = exports.ImgUploadR || (exports.ImgUploadR = {}));
/**
 * Полученеи файла
 */
var ImgGetR;
(function (ImgGetR) {
    ImgGetR.route = "/telegram/img/:file_name/:img_size";
})(ImgGetR = exports.ImgGetR || (exports.ImgGetR = {}));
/**
 * Хранение картинк в телеграме
 */
class AATelegramImage {
    constructor(token, chatId, db, redisClient) {
        this.tempFileUrl = '/telegram_temp_img/';
        this.hostUrl = 'http://likechoco.ru';
        this.token = token;
        this.chatId = chatId;
        this.db = db;
        this.redisClient = redisClient;
    }
    async faPutImg() {
        return 0;
    }
    faGetImg(id, size) {
        var fs = require('fs');
        return null;
    }
    /**
     * Контролер загрузки файла Express
     * @param req
     * @param resp
     * @param next
     */
    async faFileUploadCtrl(req, resp, next) {
        let bOk = true;
        let errors = [];
        let file_id;
        const aATelegramImageSys = new AATelegramImageSys_1.AATelegramImageSys(this.token, null, null);
        const aATelegramImageDB = new AATelegramImageDB.AATelegramImageDB(this.db);
        const input = req.body;
        const fileMd5 = this.fMd5(input.fileBase64);
        const fileName = fileMd5 + '.jpg';
        const sSaveFilePath = `${__dirname}/../${this.tempFileUrl}/`;
        const sFileUrl = `${this.hostUrl}${this.tempFileUrl}${fileName}`;
        const img = await aATelegramImageDB.faGetTelegramImg(fileMd5);
        if (img) {
            bOk = false;
            errors.push('img exist');
        }
        if (bOk) {
            try {
                await ImgS.faSaveBase64ToFile(input.fileBase64, `${sSaveFilePath}/${fileName}`);
                const tData = await aATelegramImageSys.faSendImgByUrl(this.chatId, sFileUrl, 'hiall');
                /* file_id в телеграмме может уже быть знчит ты такой файл уже загружал */
                if (!await aATelegramImageDB.faGetTelegramFile(tData.photo[0].file_id)) {
                    await aATelegramImageDB.faInsertTelegramFile(tData.photo[0]);
                }
                if (!tData.photo[1]) {
                    tData.photo.push(tData.photo[0]);
                }
                if (!tData.photo[2]) {
                    tData.photo.push(tData.photo[1]);
                }
                if (!await aATelegramImageDB.faGetTelegramFile(tData.photo[1].file_id)) {
                    await aATelegramImageDB.faInsertTelegramFile(tData.photo[1]);
                }
                if (!await aATelegramImageDB.faGetTelegramFile(tData.photo[2].file_id)) {
                    await aATelegramImageDB.faInsertTelegramFile(tData.photo[2]);
                }
                await aATelegramImageDB.faInsertTelegramImg({
                    file_name: fileMd5,
                    file_id_320: tData.photo[0].file_id,
                    file_id_800: tData.photo[1].file_id,
                    file_id_1024: tData.photo[2].file_id,
                });
            }
            catch (e) {
                bOk = false;
                console.log(e);
            }
        }
        /* TODO: Удалить файл потом */
        resp.send({
            ok: bOk,
            data: {
                file_name: fileMd5,
            },
            errors: errors,
        });
    }
    /**
     * Контролер получения картинки Express
     * @param req
     * @param resp
     * @param next
     */
    async faFileGetCtrl(req, resp, next) {
        let bOk = true;
        const nImgSize = Number(req.params.img_size);
        const sFileName = String(req.params.file_name);
        console.log(req.params);
        const aATelegramImageSys = new AATelegramImageSys_1.AATelegramImageSys(this.token, null, null);
        const aATelegramImageDB = new AATelegramImageDB.AATelegramImageDB(this.db);
        const img = await aATelegramImageDB.faGetTelegramImg(sFileName);
        console.log(img);
        let imgFile = '';
        if (!img) {
            bOk = false;
        }
        try {
            if (bOk) {
                if (nImgSize == 320) {
                    imgFile = this.redisClient.get(`${sFileName}_${320}`);
                    if (!imgFile) {
                        imgFile = await aATelegramImageSys.faGetImg(img.file_id_320);
                        this.redisClient.set(`${sFileName}_${320}`, imgFile, 1024);
                        console.log('from telegram');
                    }
                }
                if (nImgSize == 800) {
                    imgFile = this.redisClient.get(`${sFileName}_${800}`);
                    if (!imgFile) {
                        imgFile = await aATelegramImageSys.faGetImg(img.file_id_800);
                        this.redisClient.set(`${sFileName}_${800}`, imgFile, 1024);
                    }
                }
                if (nImgSize == 1024) {
                    imgFile = this.redisClient.get(`${sFileName}_${800}`);
                    if (!imgFile) {
                        imgFile = await aATelegramImageSys.faGetImg(img.file_id_800);
                        this.redisClient.set(`${sFileName}_${800}`, imgFile, 1024);
                    }
                }
            }
        }
        catch (e) {
            console.log(e);
        }
        resp.contentType('image/jpeg');
        resp.send(imgFile);
    }
    fMd5(s) {
        return crypto.createHash('md5').update(s).digest("hex");
        ;
    }
    generateFilename() {
        return crypto.createHash('md5').update(uniqid()).digest("hex");
        ;
    }
}
exports.AATelegramImage = AATelegramImage;
//# sourceMappingURL=AATelegramImage.js.map