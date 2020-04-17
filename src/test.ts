import axios from 'axios';

import * as bot from './bot';

import { faSendImgByUrl, faGetImg } from "./index";



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