"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
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
        resp.send({
            ok: true,
            data: {
                file_id: 0,
            },
            errors: [],
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
}
exports.AATelegramImage = AATelegramImage;
//# sourceMappingURL=AATelegramImage.js.map