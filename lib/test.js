"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const crypto = require('crypto');
const bot = require("./bot");
const index_1 = require("./index");
const AATelegramImageDB_1 = require("./AATelegramImageDB");
async function sendMsg() {
    const data = {
        chat_id: bot.chat_id,
        text: 'test text',
    };
    try {
        const respAxios = await axios_1.default.post(`https://api.telegram.org/bot${bot.token}/sendMessage`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.dir(respAxios.data.result);
    }
    catch (e) {
        //console.log(e);
    }
}
const DBConnect_1 = require("./testServer/DBConnect");
const faTestFnc = async () => {
    const data = {
        chat_id: bot.chat_id,
        file_id: 'AgACAgQAAx0ETCGJ2QACAhhemeXIwZhtYdDLpogZ2epDSnhDSAACAasxG6h01FDQQ0zykJObCqK1BiNdAAMBAAMCAANtAAPigAACGAQ',
    };
    try {
        let respAxios = await axios_1.default.post(`https://api.telegram.org/bot${bot.token}/getFile`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(respAxios.data.result);
        let url1 = `https://api.telegram.org/file/bot${bot.token}/${respAxios.data.result.file_path}`;
        console.log(url1);
        respAxios = await axios_1.default.get(`https://api.telegram.org/file/bot${bot.token}/${respAxios.data.result.file_path}`);
        respAxios.data;
        // console.dir(respAxios);
    }
    catch (e) {
        //console.log(e);
    }
};
async function main1() {
    const aATelegramImageSys = new index_1.AATelegramImageSys.AATelegramImageSys(bot.token, null, null);
    //let data= aATelegramImageSys.faGetUpdates();
    let img = `http://likechoco.ru/img/majent1_b.jpg`;
    let data = await aATelegramImageSys.faSendImgByUrl(bot.chat_id, img, 'Привет');
    console.log(data);
}
async function main() {
    let a = crypto.createHash('md5').update('asdasd').digest("hex");
    console.log(a.length);
    const aATelegramImageDB = new AATelegramImageDB_1.AATelegramImageDB(DBConnect_1.db);
    let data = await aATelegramImageDB.faGetTelegramFile('string');
    console.log(data);
}
main1();
//# sourceMappingURL=test.js.map