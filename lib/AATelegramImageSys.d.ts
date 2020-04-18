export interface TelegramPhotoI {
    file_id: string;
    file_unique_id: string;
    file_size: number;
    width: number;
    height: number;
}
export interface TelegramMsgI {
    message_id: number;
    chat: {
        id: number;
        title: string;
        type: string;
    };
    date: number;
    photo: TelegramPhotoI[];
    caption: string;
}
export declare class AATelegramImageSys {
    protected db: any;
    protected redisClient: any;
    protected token: string;
    protected sTelegramApiUrl: string;
    constructor(token: string, db: any, redisClient: any);
    /**
     * Отправить фото в чат по url
     * @param token - Токен бота
     * @param chatId  - ID чата можно получить используя метод getUpdates
     * @param imgUrl - url картинки
     * @param imgCaption - подпись к картинки
     */
    faSendImgByUrl(chatId: number, imgUrl: string, imgCaption: string): Promise<TelegramMsgI>;
    /**
     * Получить файл по его id. ID  получается отправкой до этого
     * @param token
     * @param file_id
     */
    faGetImg(file_id: string): Promise<any>;
    /**
     * ПОлучит последние события для бота
     */
    faGetUpdates(): Promise<any>;
    /**
     * Получить значение из редиса
     * @param key
     */
    redisGet(key: string): Promise<string>;
    /**
     * Поместить значение в редис
     * @param key
     * @param val
     * @param time
     */
    redisSet(key: string, val: string | number, time?: number): void;
    /**
     * Удалить ключи по ID
     * @param keys
     */
    redisDel(keys: any[]): void;
}
