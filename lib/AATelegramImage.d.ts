import { CacheSys } from "@a-a-game-studio/aa-redis-sys/lib";
import * as AATelegramImageDB from "./AATelegramImageDB";
export declare enum ImgSizeE {
    s302 = 320,
    s800 = 800,
    s1024 = 1024
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
export declare namespace ImgUploadR {
    const route = "/telegram/img_upload";
    interface RequestI {
        fileBase64: string;
    }
    interface ResponseI {
        file_name: string;
    }
}
/**
 * Полученеи файла
 */
export declare namespace ImgGetR {
    const route = "/telegram/img/:file_name/:img_size";
    interface RequestI {
    }
    interface ResponseI {
    }
}
/**
 * Хранение картинк в телеграме
 */
export declare class AATelegramImage {
    protected db: any;
    protected redisClient: any;
    protected token: string;
    protected chatId: number;
    tempFileUrl: string;
    hostUrl: string;
    constructor(token: string, chatId: number, db: any, redisClient: CacheSys.CacheSys);
    faPutImg(): Promise<number>;
    faGetImg(id: number, size: ImgSizeE): Promise<any>;
    /**
     * Контролер загрузки файла Express
     * @param req
     * @param resp
     * @param next
     */
    faFileUploadCtrl(req: any, resp: any, next: any): Promise<void>;
    /**
     * Контролер получения картинки Express
     * @param req
     * @param resp
     * @param next
     */
    faFileGetCtrl(req: any, resp: any, next: any): Promise<void>;
    fMd5(s: string): string;
    generateFilename(): string;
}
