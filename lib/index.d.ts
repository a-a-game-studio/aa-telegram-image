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
/**
 * Отправить фото в чат по url
 * @param token - Токен бота
 * @param chatId  - ID чата можно получить используя метод getUpdates
 * @param imgUrl - url картинки
 * @param imgCaption - подпись к картинки
 */
export declare const faSendImgByUrl: (token: string, chatId: string, imgUrl: string, imgCaption: string) => Promise<TelegramMsgI>;
export declare const faGetImg: (token: string, file_id: string) => Promise<any>;
