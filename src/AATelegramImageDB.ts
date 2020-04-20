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


export const sTelegramFileTable = 'telegram_file';
export const sTelegramImgTable = 'telegram_img';


export const fGetFirst = (a: any[]) => {
    let resp: any
    try {
        resp = a[0];
    } catch (e) {

    }

    return resp;
};

export const fGetRow = (a: any[]) => fGetFirst(fGetFirst(a));



export class AATelegramImageDB {
    protected db: any;
    constructor(db: any) {
        this.db = db;
    }


    /**
     * Вставить данные о файле
     * @param data 
     */
    public async faInsertTelegramFile(data: TelegramFileI): Promise<void> {
        await this.db(sTelegramFileTable).insert(data);
    }

    /**
     * Получить данные о файле
     * @param file_id 
     */
    public async faGetTelegramFile(file_id: string): Promise<TelegramFileI> {
        return <TelegramFileI>fGetFirst(await this.db(sTelegramFileTable).where('file_id', file_id));
    }


    /**
     * Вставить данные о картинке
     * @param data 
     */
    public async faInsertTelegramImg(data: TelegramImgI): Promise<void> {
        await this.db(sTelegramImgTable).insert(data);
    }

    /**
     * Получить данные о картинке
     * @param file_name 
     */
    public async faGetTelegramImg(file_name: string): Promise<TelegramImgI> {
        return <TelegramImgI>fGetFirst(await this.db(sTelegramImgTable).where('file_name', file_name));
    }




}