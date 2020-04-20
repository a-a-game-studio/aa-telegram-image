import * as ImgS from "./ImgS";
import { AATelegramImageSys } from "./AATelegramImageSys";

import uniqid = require('uniqid');

const crypto = require('crypto');

import { CacheSys } from "@a-a-game-studio/aa-redis-sys/lib";
import * as AATelegramImageDB from "./AATelegramImageDB";

export enum ImgSizeE {
    s302 = 320,
    s800 = 800,
    s1024 = 1024,
}

/**
 * Данные о картинке
 */
export interface TelegramImageDataI {
    telegramImg: AATelegramImageDB.TelegramImgI;
    file320: AATelegramImageDB.TelegramImgI;
    file800: AATelegramImageDB.TelegramImgI;
    file1024: AATelegramImageDB.TelegramImgI;
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
        file_name: string; // md5 содержимого
    }

}

/**
 * Полученеи файла
 */
export namespace ImgGetR {
    export const route = "/telegram/img/:file_name/:img_size";

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
    protected chatId: number;

    public tempFileUrl = '/telegram_temp_img/';
    public hostUrl = 'http://likechoco.ru'

    constructor(token: string, chatId: number, db: any, redisClient: CacheSys.CacheSys) {
        this.token = token;
        this.chatId = chatId;
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

        let bOk = true;
        let errors: any[] = [];
        let file_id: string;


        const aATelegramImageSys = new AATelegramImageSys(this.token, null, null);
        const aATelegramImageDB = new AATelegramImageDB.AATelegramImageDB(this.db);

        const input: ImgUploadR.RequestI = req.body;

        const fileMd5 = this.fMd5(input.fileBase64)

        const fileName = fileMd5 + '.jpg';
        const sSaveFilePath = `${__dirname}/../${this.tempFileUrl}/`;
        const sFileUrl = `${this.hostUrl}${this.tempFileUrl}${fileName}`;


        const img = await aATelegramImageDB.faGetTelegramImg(fileMd5);
        if (img) {
            bOk = false;
            errors.push('img exist')

        }

        if (bOk) {
            try {
                await ImgS.faSaveBase64ToFile(input.fileBase64, `${sSaveFilePath}/${fileName}`);
                const tData = await aATelegramImageSys.faSendImgByUrl(this.chatId, sFileUrl, 'hiall');

                /* file_id в телеграмме может уже быть знчит ты такой файл уже загружал */

                if (!await aATelegramImageDB.faGetTelegramFile(tData.photo[0].file_id)) {
                    await aATelegramImageDB.faInsertTelegramFile(tData.photo[0]);
                }

                if (!tData.photo[1]) {
                    tData.photo.push(tData.photo[0])
                }
                if (!tData.photo[2]) {
                    tData.photo.push(tData.photo[1])
                }

                if (!await aATelegramImageDB.faGetTelegramFile(tData.photo[1].file_id)) {
                    await aATelegramImageDB.faInsertTelegramFile(tData.photo[1]);
                }

                if (!await aATelegramImageDB.faGetTelegramFile(tData.photo[2].file_id)) {
                    await aATelegramImageDB.faInsertTelegramFile(tData.photo[2]);
                }

                await aATelegramImageDB.faInsertTelegramImg({
                    file_name: fileMd5,
                    file_id_320: tData.photo[0].file_id,
                    file_id_800: tData.photo[1].file_id,
                    file_id_1024: tData.photo[2].file_id,
                });

            } catch (e) {
                bOk = false;
                console.log(e);
            }
        }

        /* TODO: Удалить файл потом */


        resp.send({
            ok: bOk,
            data: {
                file_name: fileMd5,
            },
            errors: errors,
        });
    }



    /**
     * Контролер получения картинки Express
     * @param req 
     * @param resp 
     * @param next 
     */
    public async faFileGetCtrl(req: any, resp: any, next: any) {

        let bOk = true;
        const nImgSize = Number(req.params.img_size);
        const sFileName = String(req.params.file_name);


        const aATelegramImageSys = new AATelegramImageSys(this.token, null, null);
        const aATelegramImageDB = new AATelegramImageDB.AATelegramImageDB(this.db);

        const img = await aATelegramImageDB.faGetTelegramImg(sFileName);


        let imgFile = '';

        if (!img) {
            bOk = false
        }

        try {
            if (bOk) {
                if (nImgSize == 320) {
                    imgFile = this.redisClient.get(`${sFileName}_${320}`);
                    if (!imgFile) {
                        imgFile = await aATelegramImageSys.faGetImg(img.file_id_320);
                        this.redisClient.set(`${sFileName}_${320}`, imgFile, 1024);
                    }
                }
                if (nImgSize == 800) {
                    imgFile = this.redisClient.get(`${sFileName}_${800}`);
                    if (!imgFile) {
                        imgFile = await aATelegramImageSys.faGetImg(img.file_id_800);
                        this.redisClient.set(`${sFileName}_${800}`, imgFile, 1024);
                    }
                }
                if (nImgSize == 1024) {
                    imgFile = this.redisClient.get(`${sFileName}_${800}`);
                    if (!imgFile) {
                        imgFile = await aATelegramImageSys.faGetImg(img.file_id_800);
                        this.redisClient.set(`${sFileName}_${800}`, imgFile, 1024);
                    }
                }
            }
        } catch (e) {
            console.log(e);
        }

        resp.contentType('image/jpeg');
        resp.send(imgFile);
    }

    public fMd5(s: string): string {
        return crypto.createHash('md5').update(s).digest("hex");;
    }

    public generateFilename(): string {
        return crypto.createHash('md5').update(uniqid()).digest("hex");;
    }
}