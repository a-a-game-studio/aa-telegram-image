"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ImgS = require("./ImgS");
const AATelegramImageSys_1 = require("./AATelegramImageSys");
const bot = require("./bot");
const uniqid = require("uniqid");
const crypto = require('crypto');
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
    ImgGetR.route = "/telegram/img/:img_id";
})(ImgGetR = exports.ImgGetR || (exports.ImgGetR = {}));
/**
 * Хранение картинк в телеграме
 */
class AATelegramImage {
    constructor(token, db, redisClient) {
        this.tempFileUrl = '/telegram_temp_img/';
        this.hostUrl = 'http://likechoco.ru';
        this.token = token;
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
        const aATelegramImageSys = new AATelegramImageSys_1.AATelegramImageSys(bot.token, null, null);
        const input = req.body;
        const fileName = `${this.generateFilename()}.jpg`;
        const sSaveFilePath = __dirname + '/../telegram_temp_img/';
        const sFileUrl = `${this.hostUrl}${this.tempFileUrl}${fileName}`;
        console.log(sFileUrl);
        let error = [];
        try {
            await ImgS.faSaveBase64ToFile(input.fileBase64, `${sSaveFilePath}/${fileName}`);
            await aATelegramImageSys.faSendImgByUrl(bot.chat_id, sFileUrl, 'Привет');
        }
        catch (e) {
            error.push(e);
            console.log(e);
        }
        resp.send({
            ok: true,
            data: {
                file_id: 0,
            },
            errors: error,
        });
    }
    /**
     * Контролер получения картинки Express
     * @param req
     * @param resp
     * @param next
     */
    async faFileGetCtrl(req, resp, next) {
        const fileId = req.params.file_id;
        let file = '';
        resp.send(file);
    }
    generateFilename() {
        return crypto.createHash('md5').update(uniqid()).digest("hex");
        ;
    }
}
exports.AATelegramImage = AATelegramImage;
//# sourceMappingURL=AATelegramImage.js.map