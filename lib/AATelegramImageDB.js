"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sTelegramFileTable = 'telegram_file';
exports.sTelegramImgTable = 'telegram_img';
exports.fGetFirst = (a) => {
    let resp;
    try {
        resp = a[0];
    }
    catch (e) {
    }
    return resp;
};
exports.fGetRow = (a) => exports.fGetFirst(exports.fGetFirst(a));
class AATelegramImageDB {
    constructor(db) {
        this.db = db;
    }
    /**
     * Вставить данные о файле
     * @param data
     */
    async faInsertTelegramFile(data) {
        await this.db(exports.sTelegramFileTable).insert(data);
    }
    /**
     * Получить данные о файле
     * @param file_id
     */
    async faGetTelegramFile(file_id) {
        return exports.fGetFirst(await this.db(exports.sTelegramFileTable).where('file_id', file_id));
    }
    /**
     * Вставить данные о картинке
     * @param data
     */
    async faInsertTelegramImg(data) {
        await this.db(exports.sTelegramImgTable).insert(data);
    }
    /**
     * Получить данные о картинке
     * @param file_name
     */
    async faGetTelegramImg(file_name) {
        return exports.fGetFirst(await this.db(exports.sTelegramImgTable).where('file_name', file_name));
    }
}
exports.AATelegramImageDB = AATelegramImageDB;
//# sourceMappingURL=AATelegramImageDB.js.map