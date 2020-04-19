"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
const cors = require('cors');
var express = require('express');
var app = express();
app.use(cors());
app.options('*', cors());
const bodyParser = require('body-parser');
const NodeMemChache_1 = require("../NodeMemChache");
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
const bot = require("../bot");
const AATelegramImage = require("../AATelegramImage");
app.use('/telegram_temp_img', express.static(__dirname + '/../../telegram_temp_img'));
app.get('/', function (req, res) {
    if (!NodeMemChache_1.NodeMemChache['1.jpg']) {
        console.log('From file');
        fs.readFile(__dirname + '/../../telegram_temp_img/1.jpg', (err, data) => {
            if (err) {
                res.send('error');
            }
            else {
                NodeMemChache_1.NodeMemChache['1.jpg'] = data;
                res.contentType('image/jpeg');
                res.send(data);
            }
        });
    }
    else {
        console.log('From NodeMemChache');
        res.contentType('image/jpeg');
        res.send(NodeMemChache_1.NodeMemChache['1.jpg']);
    }
});
app.post(AATelegramImage.ImgUploadR.route, (req, resp, next) => {
    const aATelegramImage = new AATelegramImage.AATelegramImage(bot.token, null, null);
    aATelegramImage.faFileUploadCtrl(req, resp, next);
});
app.get(AATelegramImage.ImgGetR.route, (req, resp, next) => {
    const aATelegramImage = new AATelegramImage.AATelegramImage(bot.token, null, null);
    aATelegramImage.faFileGetCtrl(req, resp, next);
});
app.listen(3008, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=testServer.js.map