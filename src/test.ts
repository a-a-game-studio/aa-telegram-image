import axios from 'axios';
import randomUseragent = require('random-useragent');
import punycode = require('punycode');

import * as bot from './bot';

import { faSendImgByUrl, faGetImg } from "./index";

const fProcessUrl = (fileSource: string): string => {
    try {
        const aUrl: string[] = fileSource.split('/');
        let domain = aUrl[2];
        domain = punycode.toASCII(domain);
        let url = `${aUrl[0]}//${domain}`;
        for (let i = 3; i < aUrl.length; i++) {
            url += `/${aUrl[i]}`;
        }
        fileSource = url;
    } catch (e) {
        // если чтото не так ничего не делаем
    }

    return fileSource;
}


const faLoadFileByAxios = async (sUrl: string): Promise<Buffer> => {
    const userAgent = randomUseragent.getRandom((ua: any) => ua.browserName === 'Firefox');

    const respAxios = await axios.get(encodeURI(decodeURI(fProcessUrl(sUrl))), {
        responseType: 'arraybuffer',
        headers: {
            'User-Agent': { userAgent },
        },
    });

    return respAxios.data;
}

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
async function sendImg(photo: string) {

    const data = {
        chat_id: bot.chat_id,
        //photo: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/epKF/5EWfAfHFM/juno.jpg',
        photo: 'https://thumb.cloud.mail.ru/weblink/thumb/xw1/epKF/5EWfAfHFM/juno.jpg',
        caption: 'test photo'
    };

    try {
        const respAxios = await axios.post(`https://api.telegram.org/bot${bot.token}/sendPhoto`,
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


//faTestFnc();

faGetImg(bot.token,'AgACAgQAAx0ETCGJ2QACAhhemeXIwZhtYdDLpogZ2epDSnhDSAACAasxG6h01FDQQ0zykJObCqK1BiNdAAMBAAMCAANtAAPigAACGAQ')
.then(data=>{
    console.log(data);
    
})

/* 

faSendImgByUrl(bot.token, bot.chat_id, 
    `https://thumb.cloud.mail.ru/weblink/thumb/xw1/4NZB/5hq2BURmx/%D0%A7%D0%B8%D1%81%D1%82%D0%B0%D1%8F%20%D0%B2%D0%BE%D0%B4%D0%B0.jpg`,
    'test'
    ).then(data =>{
        console.log(data);
        
    }) */