import axios from 'axios';

import * as bot from './bot';

import { AATelegramImageSys } from "./index";

async function sendMsg() {

    const data = {
        chat_id: bot.chat_id,
        text: 'test text',
    };

    try {
        const respAxios = await axios.post(`https://api.telegram.org/bot${bot.token}/sendMessage`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.dir(respAxios.data.result);

    } catch (e) {
        //console.log(e);
    }
}


const faTestFnc = async () => {
    const data = {
        chat_id: bot.chat_id,
        file_id: 'AgACAgQAAx0ETCGJ2QACAhhemeXIwZhtYdDLpogZ2epDSnhDSAACAasxG6h01FDQQ0zykJObCqK1BiNdAAMBAAMCAANtAAPigAACGAQ',
    };

    try {
        let respAxios = await axios.post(`https://api.telegram.org/bot${bot.token}/getFile`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log(respAxios.data.result);

        let url1 = `https://api.telegram.org/file/bot${bot.token}/${respAxios.data.result.file_path}`;
        console.log(url1);


        respAxios = await axios.get(`https://api.telegram.org/file/bot${bot.token}/${respAxios.data.result.file_path}`);
        respAxios.data
        // console.dir(respAxios);

    } catch (e) {
        //console.log(e);
    }

}


async function main() {

    const aATelegramImageSys = new AATelegramImageSys.AATelegramImageSys(bot.token, null, null);

    //let data= aATelegramImageSys.faGetUpdates();
    let img = `http://likechoco.ru:3008`;
    let data = await aATelegramImageSys.faSendImgByUrl(bot.chat_id, img, 'Привет');

    console.log(data);

}


main();