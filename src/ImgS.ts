var fs = require('fs');

/**
 * Сохранить Base64 строку в файл
 * @param base64Image 
 * @param sFile 
 */
export const faSaveBase64ToFile = (base64Image: string, sFile: string) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(sFile, fGetBase64Str(base64Image), { encoding: 'base64' }, function (err: any) {
            resolve(true);
        });
    });
}



/**
 * Картинка base64 в Buffer
 * @param sDataBase64 
 */
export const  fImgBase64ToBuffer = (sDataBase64: string): Buffer => {
    return Buffer.from(fGetBase64Str(sDataBase64), 'base64');
}


/**
 * Вырезает лишнее из строки Base64
 * @param sBase64 
 */
export const fGetBase64Str = (sBase64: string): string => sBase64.split(';base64,').pop();


