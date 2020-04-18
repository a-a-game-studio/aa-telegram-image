export declare enum ImgSizeE {
    s302 = 320,
    s800 = 800,
    s1024 = 1024
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
        img_id: number;
    }
}
/**
 * Полученеи файла
 */
export declare namespace ImgGetR {
    const route = "/telegram/img/:img_id";
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
    tempFileUrl: string;
    hostUrl: string;
    constructor(token: string, db: any, redisClient: any);
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
}
