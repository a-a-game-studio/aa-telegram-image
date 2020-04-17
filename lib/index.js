"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
/**
 * Отправить фото в чат по url
 * @param token - Токен бота
 * @param chatId  - ID чата можно получить используя метод getUpdates
 * @param imgUrl - url картинки
 * @param imgCaption - подпись к картинки
 */
exports.faSendImgByUrl = async (token, chatId, imgUrl, imgCaption) => {
    const data = {
        chat_id: chatId,
        photo: imgUrl,
        caption: imgCaption
    };
    const respAxios = await axios_1.default.post(`https://api.telegram.org/bot${token}/sendPhoto`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return respAxios.data.result;
};
exports.faGetImg = async (token, file_id) => {
    const data = {
        file_id: file_id,
    };
    let respAxios = await axios_1.default.post(`https://api.telegram.org/bot${token}/getFile`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    let url1 = `https://api.telegram.org/file/bot${token}/${respAxios.data.result.file_path}`;
    console.log(url1);
    respAxios = await axios_1.default.get(`https://api.telegram.org/file/bot${token}/${respAxios.data.result.file_path}`);
    return respAxios.data;
};
//# sourceMappingURL=index.js.map