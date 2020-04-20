export interface TelegramFileI {
    file_id: string;
    file_unique_id: string;
    file_size: number;
    width: number;
    height: number;
}
export interface TelegramImgI {
    file_name: string;
    file_id_320: string;
    file_id_800: string;
    file_id_1024: string;
}
export declare const sTelegramFileTable = "telegram_file";
export declare const sTelegramImgTable = "telegram_img";
export declare const fGetFirst: (a: any[]) => any;
export declare const fGetRow: (a: any[]) => any;
export declare class AATelegramImageDB {
    protected db: any;
    constructor(db: any);
    /**
     * Вставить данные о файле
     * @param data
     */
    faInsertTelegramFile(data: TelegramFileI): Promise<void>;
    /**
     * Получить данные о файле
     * @param file_id
     */
    faGetTelegramFile(file_id: string): Promise<TelegramFileI>;
    /**
     * Вставить данные о картинке
     * @param data
     */
    faInsertTelegramImg(data: TelegramImgI): Promise<void>;
    /**
     * Получить данные о картинке
     * @param file_name
     */
    faGetTelegramImg(file_name: string): Promise<TelegramImgI>;
}
