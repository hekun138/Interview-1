##### express设置静态资源接口
    npm i --save express
    
    const http = require('http');
    const path = require('path');
    const express = require('express');
    const app = express();
    
    // public为静态资源目录  
    // 访问 /public/image/a.jpg 地址为 http://ip:9000/image/a.jpg
    app.use(express.static(path.join(__dirname, 'public')));
    
    http.createServer(app).listen(9000);