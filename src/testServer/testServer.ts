var fs = require('fs');
const cors = require('cors');
var express = require('express');
var app = express();
app.use(cors());
app.options('*', cors());

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

import * as bot from "../bot";

import * as AATelegramImage from "../AATelegramImage";


app.use('/telegram_temp_img', express.static(__dirname + '/../../telegram_temp_img'));

app.get('/', function (req: any, res: any) {
    res.send('file');
});

app.post(AATelegramImage.ImgUploadR.route, (req: any, resp: any, next: any) => {
    const aATelegramImage = new AATelegramImage.AATelegramImage(bot.token, null, null);
    aATelegramImage.faFileUploadCtrl(req, resp, next);
});

app.post(AATelegramImage.ImgGetR.route, (req: any, resp: any, next: any) => {
    const aATelegramImage = new AATelegramImage.AATelegramImage(bot.token, null, null);
    aATelegramImage.faFileGetCtrl(req, resp, next);
});



app.listen(3008, function () {
    console.log('Example app listening on port 3000!');
});