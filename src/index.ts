import axios from 'axios';

export interface TelegramPhotoI {
    file_id: string,
    file_unique_id: string,
    file_size: number,
    width: number,
    height: number,
}

export interface TelegramMsgI {
    message_id: number;
    chat: {
        id: number,
        title: string,
        type: string
    },
    date: number,
    photo: TelegramPhotoI[], // массив размеров картинок
    caption: string;
}

/**
 * Отправить фото в чат по url
 * @param token - Токен бота
 * @param chatId  - ID чата можно получить используя метод getUpdates
 * @param imgUrl - url картинки
 * @param imgCaption - подпись к картинки
 */
export const faSendImgByUrl = async (token: string, chatId: string, imgUrl: string, imgCaption: string): Promise<TelegramMsgI> => {

    const data = {
        chat_id: chatId,
        photo: imgUrl,
        caption: imgCaption
    };

    const respAxios = await axios.post(`https://api.telegram.org/bot${token}/sendPhoto`,
        data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return respAxios.data.result;
}


/**
 * Получить файл по его id. ID  получается отправкой до этого
 * @param token 
 * @param file_id 
 */
export const faGetImg = async (token: string, file_id: string): Promise<any> => {
    const data = {
        file_id: file_id,
    };

    let respAxios = await axios.post(`https://api.telegram.org/bot${token}/getFile`,
        data,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );

    respAxios = await axios.get(`https://api.telegram.org/file/bot${token}/${respAxios.data.result.file_path}`);

    return respAxios.data;
}


