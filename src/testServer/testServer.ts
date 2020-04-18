var fs = require('fs');

var express = require('express');
var app = express();

import * as AATelegramImage from "../AATelegramImage";

app.use('/telegram_temp_img', express.static(__dirname+'/../../telegram_temp_img'));

app.get('/', function (req: any, res: any) {   
    res.send('file');
});

app.get(AATelegramImage.ImgUploadR.route, function (req: any, res: any) {   
    res.send('upload _from');
});

app.get(AATelegramImage.ImgGetR.route, function (req: any, res: any) {   
    res.send('ImgGetR');
});



app.listen(3008, function () {
  console.log('Example app listening on port 3000!');
});