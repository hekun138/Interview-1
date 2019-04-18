##### 使用node启动服务器, 重定向, 以及自动打开网页
    const http = require('http');
    const path = require('path');
    const open = require('child_process');
    const express = require('express');
    const app = express();
    
    // 访问重定向   
    // 使用302 将 '/'临时重定向到 'http://localhost:8081/adminsystem/static/start/#/user/login'
    app.get('/', (req, res) => {
        res.redirect(302, 'http://localhost:8081/adminsystem/static/start/#/user/login'  
    });
    
    // 设置静态资源路径
    app.use(express.static(path.join(__dirname, 'public')));
    
    // http服务
    http.createServer(app).listen(3000);
    
    // 自动打开网址     
    // 指定使用chrome.exe打开指定网址
    open.exec('C:\\Users\\Administrator\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe http://localhost:3000');
    // 或
    // 使用默认浏览器打开指定网址
    open.exec('explorer http://localhost:3000');
    
    console.log("Start Serving Success  >>>  localhost:3000");