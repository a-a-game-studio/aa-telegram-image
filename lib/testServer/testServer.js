"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require('fs');
var express = require('express');
var app = express();
const AATelegramImage = require("../AATelegramImage");
app.use('/telegram_temp_img', express.static(__dirname + '/../../telegram_temp_img'));
app.get('/', function (req, res) {
    res.send('file');
});
app.get(AATelegramImage.ImgUploadR.route, function (req, res) {
    res.send('upload _from');
});
app.get(AATelegramImage.ImgGetR.route, function (req, res) {
    res.send('ImgGetR');
});
app.listen(3008, function () {
    console.log('Example app listening on port 3000!');
});
//# sourceMappingURL=testServer.js.map