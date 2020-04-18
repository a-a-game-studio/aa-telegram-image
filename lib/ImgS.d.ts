/// <reference types="node" />
/**
 * Сохранить Base64 строку в файл
 * @param base64Image
 * @param sFile
 */
export declare const faSaveBase64ToFile: (base64Image: string, sFile: string) => Promise<unknown>;
/**
 * Картинка base64 в Buffer
 * @param sDataBase64
 */
export declare const fImgBase64ToBuffer: (sDataBase64: string) => Buffer;
/**
 * Вырезает лишнее из строки Base64
 * @param sBase64
 */
export declare const fGetBase64Str: (sBase64: string) => string;
