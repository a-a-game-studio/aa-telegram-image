var fs = require('fs');
const cors = require('cors');
var express = require('express');
var app = express();
app.use(cors());
app.options('*', cors());

const bodyParser = require('body-parser');

import { db } from "./DBConnect";


app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

import * as bot from "../bot";

import * as AATelegramImage from "../AATelegramImage";
import { CacheSys, SharedMemSys } from "@a-a-game-studio/aa-redis-sys/lib";

const appMem: CacheSys.MemSysI = {};


app.use('/telegram_temp_img', express.static(__dirname + '/../../telegram_temp_img'));

app.get('/', function (req: any, res: any) {

    if (!appMem['1.jpg']) {
        console.log('From file');
        fs.readFile(__dirname + '/../../telegram_temp_img/1.jpg', (err: any, data: any) => {
            if (err) {
                res.send('error');

            } else {
                appMem['1.jpg'] = data;
                res.contentType('image/jpeg');
                res.send(data);
            }

        });
    } else {
        console.log('From NodeMemChache');
        res.contentType('image/jpeg');
        res.send(appMem['1.jpg']);
    }

});

app.post(AATelegramImage.ImgUploadR.route, (req: any, resp: any, next: any) => {
    const sharedMemSys = new SharedMemSys.SharedMemSys(appMem);
    const aATelegramImage = new AATelegramImage.AATelegramImage(bot.token, bot.chat_id, db, sharedMemSys);
    aATelegramImage.faFileUploadCtrl(req, resp, next);
});

app.get(AATelegramImage.ImgGetR.route, (req: any, resp: any, next: any) => {
    const sharedMemSys = new SharedMemSys.SharedMemSys(appMem);
    const aATelegramImage = new AATelegramImage.AATelegramImage(bot.token, bot.chat_id, db, sharedMemSys);
    aATelegramImage.faFileGetCtrl(req, resp, next);
});


const port = 3008
app.listen(port, function () {
    console.log(`server start at port ${port}`);
});