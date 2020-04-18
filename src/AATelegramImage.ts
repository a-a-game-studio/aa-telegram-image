var fs = require('fs');

export enum ImgSizeE {
    s302 = 320,
    s800 = 800,
    s1024 = 1024,
}

/**
 * Загрузка картинки
 */
export namespace ImgUploadR {
    export const route = "/telegram/img_upload";

    /* запрос */
    export interface RequestI {
        fileBase64: string; // файл для загрузки
    }

    /* ответ */
    export interface ResponseI {
        img_id: number; // id картинки оп базе
    }

}

/**
 * Полученеи файла
 */
export namespace ImgGetR {
    export const route = "/telegram/img/:img_id";

    /* запрос */
    export interface RequestI {
    }

    /* ответ */
    export interface ResponseI {
    }

}

/**
 * Хранение картинк в телеграме
 */
export class AATelegramImage {

    protected db: any; // knex
    protected redisClient: any; // клиет редиса
    protected token: string;

    public tempFileUrl = '/telegram_temp_img/';

    constructor(token: string, db: any, redisClient: any) {
        this.token = token;
        this.db = db;
        this.redisClient = redisClient;
    }


    public async faPutImg(): Promise<number> {
        return 0;
    }

    public faGetImg(id: number, size: ImgSizeE): Promise<any> {
        var fs = require('fs');

        return null;
    }

    /**
     * Контролер загрузки файла Express
     * @param req 
     * @param resp 
     * @param next 
     */
    public async faFileUploadCtrl(req: any, resp: any, next: any) {
        resp.send({
            ok: true,
            data: {
                file_id: 0,
            },
            errors: [],
        });
    }
    /**
     * Контролер получения картинки Express
     * @param req 
     * @param resp 
     * @param next 
     */
    public async faFileGetCtrl(req: any, resp: any, next: any) {

        const fileId = req.params.file_id;        


        let file = '';
     
        resp.send(file);
    }
}