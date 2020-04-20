"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
const cors = require('cors');
var express = require('express');
var app = express();
app.use(cors());
app.options('*', cors());
const bodyParser = require('body-parser');
const DBConnect_1 = require("./DBConnect");
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
const bot = require("../bot");
const AATelegramImage = require("../AATelegramImage");
const lib_1 = require("@a-a-game-studio/aa-redis-sys/lib");
const appMem = {};
app.use('/telegram_temp_img', express.static(__dirname + '/../../telegram_temp_img'));
app.get('/', function (req, res) {
    if (!appMem['1.jpg']) {
        console.log('From file');
        fs.readFile(__dirname + '/../../telegram_temp_img/1.jpg', (err, data) => {
            if (err) {
                res.send('error');
            }
            else {
                appMem['1.jpg'] = data;
                res.contentType('image/jpeg');
                res.send(data);
            }
        });
    }
    else {
        console.log('From NodeMemChache');
        res.contentType('image/jpeg');
        res.send(appMem['1.jpg']);
    }
});
app.post(AATelegramImage.ImgUploadR.route, (req, resp, next) => {
    const sharedMemSys = new lib_1.SharedMemSys.SharedMemSys(appMem);
    const aATelegramImage = new AATelegramImage.AATelegramImage(bot.token, bot.chat_id, DBConnect_1.db, sharedMemSys);
    aATelegramImage.faFileUploadCtrl(req, resp, next);
});
app.get(AATelegramImage.ImgGetR.route, (req, resp, next) => {
    const sharedMemSys = new lib_1.SharedMemSys.SharedMemSys(appMem);
    const aATelegramImage = new AATelegramImage.AATelegramImage(bot.token, bot.chat_id, DBConnect_1.db, sharedMemSys);
    aATelegramImage.faFileGetCtrl(req, resp, next);
});
const port = 3008;
app.listen(port, function () {
    console.log(`server start at port ${port}`);
});
//# sourceMappingURL=testServer.js.map