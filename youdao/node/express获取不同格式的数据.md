#####  application/json
    1. get请求
        req.query
    
    2. post
        req.body
        
        需要使用第三方插件 body-parser 才可以获取兼容json数据
        npm i --save body-parser express
        
        const express = require('express');
        const bodyParser = require('body-parser');
        const app = express();
        
        // 兼容json数据
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));


##### application/x-www-form-urlencoded 表单默认提交




##### FormData 上传文件
    https://blog.csdn.net/java_2017_csdn/article/details/78706555
    
    req.body

    npm i --save express connect-multiparty
    
    const express = require('express');
    const multiparty = require('connect-multiparty');
    
    const app = express();
    const multipartMiddleware = multiparty();
    
    app.post('/', multipartMiddleware, (req, res) => {
        console.log(req.body, req.files); 
        // req.body里面获取除了文件之外的其他同时提交的字段
        // req.files里面放着提交的文件
    });
    
    