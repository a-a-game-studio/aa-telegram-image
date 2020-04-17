const fs = require('fs');
const request = require('request');
const faDownload = (uri, filename) => {
    return new Promise((resolve, reject) => {
        request.head(uri, function (err, res, body) {
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length']);
            request(uri).pipe(fs.createWriteStream(filename)).on('close', resolve(true));
        });
    });
};
faDownload('https://www.google.com/images/srpr/logo3w.png', 'google.png').then((data) => {
    console.log('done');
});
//# sourceMappingURL=test.js.map