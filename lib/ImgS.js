"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
/**
 * Сохранить Base64 строку в файл
 * @param base64Image
 * @param sFile
 */
exports.faSaveBase64ToFile = (base64Image, sFile) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(sFile, exports.fGetBase64Str(base64Image), { encoding: 'base64' }, function (err) {
            resolve(true);
        });
    });
};
/**
 * Картинка base64 в Buffer
 * @param sDataBase64
 */
exports.fImgBase64ToBuffer = (sDataBase64) => {
    return Buffer.from(exports.fGetBase64Str(sDataBase64), 'base64');
};
/**
 * Вырезает лишнее из строки Base64
 * @param sBase64
 */
exports.fGetBase64Str = (sBase64) => sBase64.split(';base64,').pop();
//# sourceMappingURL=ImgS.js.map