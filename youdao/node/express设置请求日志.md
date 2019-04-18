##### express生成请求日志
    npm i --save express morgan
    
    const fs = require('fs');
    const path = require('path');
    const express = require('express');
    const morgan = require('morgan');
    const app = express();
    
    // 输出日志
    const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs/access.log'));
    app.use(morgan('common', { stream: accessLogSteam }));