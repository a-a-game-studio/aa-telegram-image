"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
class AATelegramImageSys {
    constructor(token, db, redisClient) {
        this.sTelegramApiUrl = `https://api.telegram.org`;
        this.token = token;
        this.db = db;
        this.redisClient = redisClient;
    }
    /**
     * Отправить фото в чат по url
     * @param token - Токен бота
     * @param chatId  - ID чата можно получить используя метод getUpdates
     * @param imgUrl - url картинки
     * @param imgCaption - подпись к картинки
     */
    async faSendImgByUrl(chatId, imgUrl, imgCaption) {
        const data = {
            chat_id: chatId,
            photo: imgUrl,
            caption: imgCaption
        };
        const respAxios = await axios_1.default.post(`${this.sTelegramApiUrl}/bot${this.token}/sendPhoto`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return respAxios.data.result;
    }
    /**
     * Получить файл по его id. ID  получается отправкой до этого
     * @param token
     * @param file_id
     */
    async faGetImg(file_id) {
        const data = {
            file_id: file_id,
        };
        let respAxios = await axios_1.default.post(`${this.sTelegramApiUrl}/bot${this.token}/getFile`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        respAxios = await axios_1.default.get(`${this.sTelegramApiUrl}/file/bot${this.token}/${respAxios.data.result.file_path}`);
        return respAxios.data;
    }
    /**
     * ПОлучит последние события для бота
     */
    async faGetUpdates() {
        let respAxios = await axios_1.default.get(`${this.sTelegramApiUrl}/bot${this.token}/getUpdates`);
        return respAxios.data;
    }
    /**
     * Получить значение из редиса
     * @param key
     */
    redisGet(key) {
        return new Promise((resolve, reject) => {
            this.redisClient.get(key, function (err, reply) {
                if (err) {
                    resolve(null);
                }
                resolve(reply);
            });
        });
    }
    ;
    /**
     * Поместить значение в редис
     * @param key
     * @param val
     * @param time
     */
    redisSet(key, val, time = 3600) {
        this.redisClient.set(key, val, 'EX', time);
    }
    /**
     * Удалить ключи по ID
     * @param keys
     */
    redisDel(keys) {
        if (keys.length > 0) {
            this.redisClient.del(keys);
        }
    }
}
exports.AATelegramImageSys = AATelegramImageSys;
//# sourceMappingURL=AATelegramImageSys.js.map