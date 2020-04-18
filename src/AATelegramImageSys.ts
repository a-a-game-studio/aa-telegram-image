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

export class AATelegramImageSys {

    protected db: any;
    protected redisClient: any;
    protected token: string;

    protected sTelegramApiUrl = `https://api.telegram.org`;


    constructor(token: string, db: any, redisClient: any) {
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
    public async faSendImgByUrl(chatId: number, imgUrl: string, imgCaption: string): Promise<TelegramMsgI> {

        const data = {
            chat_id: chatId,
            photo: imgUrl,
            caption: imgCaption
        };

        const respAxios = await axios.post(`${this.sTelegramApiUrl}/bot${this.token}/sendPhoto`,
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
    public async faGetImg(file_id: string): Promise<any> {
        const data = {
            file_id: file_id,
        };

        let respAxios = await axios.post(`${this.sTelegramApiUrl}/bot${this.token}/getFile`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        respAxios = await axios.get(`${this.sTelegramApiUrl}/file/bot${this.token}/${respAxios.data.result.file_path}`);

        return respAxios.data;
    }
    /**
     * ПОлучит последние события для бота
     */
    public async faGetUpdates(): Promise<any> {
       
        let respAxios = await axios.get(`${this.sTelegramApiUrl}/bot${this.token}/getUpdates`);

        return respAxios.data;
    }


    /**
     * Получить значение из редиса
     * @param key
     */
    public redisGet(key: string): Promise<string> {
        return new Promise((resolve, reject) => {
            this.redisClient.get(key, function (err: any, reply: string) {
                if (err) {
                    resolve(null);
                }
                resolve(reply);
            });
        });
    };

    /**
     * Поместить значение в редис
     * @param key
     * @param val
     * @param time
     */
    public redisSet(key: string, val: string | number, time: number = 3600) {
        this.redisClient.set(key, val, 'EX', time);
    }

    /**
     * Удалить ключи по ID
     * @param keys
     */
    public redisDel(keys: any[]) {
        if (keys.length > 0) {
            this.redisClient.del(keys);
        }
    }


}

