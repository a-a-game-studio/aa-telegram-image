import axios from 'axios';
import randomUseragent = require('random-useragent');
import punycode = require('punycode');


const  fProcessUrl = (fileSource: string): string => {
    try {
        const aUrl: string[] = fileSource.split('/');
        let domain = aUrl[2];
        domain = punycode.toASCII(domain);
        let url = `${aUrl[0]}//${domain}`;
        for (let i = 3; i < aUrl.length; i++) {
            url += `/${aUrl[i]}`;
        }
        fileSource = url;
    } catch (e) {
        // если чтото не так ничего не делаем
    }

    return fileSource;
}


const faLoadFileByAxios = async (sUrl: string): Promise<Buffer> => {
    const userAgent = randomUseragent.getRandom((ua: any) => ua.browserName === 'Firefox');

    const respAxios = await axios.get(encodeURI(decodeURI(fProcessUrl(sUrl))), {
        responseType: 'arraybuffer',
        headers: {
            'User-Agent': { userAgent },
        },
    });

    return respAxios.data;
}



