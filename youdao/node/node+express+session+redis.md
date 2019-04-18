##### 1. 配置session存入redis中
    const express = require('express'); // express
    const cookieParser = require('cookie-parser');  // cookie
    const session = require('express-session');     // session
    const redisStore = require('connect-redis')(session);   // 将session链接到redis
    const sessionStore = new redisStore({   // 配置session的store
        host: '127.0.0.1',
        port: 6379,
        db: 0,                  // 使用第0个数据库
        // pass: 123456,        // redis密码, 默认无
        prefix: 'sessionid',    // 数据表前缀, 默认为: "sess:"
        ttl: 30 * 60,           // redis中session的过期时间 单位s 
    });
    
    const app = express();
    app.use(cookieParser('session_id'));    // 不用cookie可以不用
    app.use(session({       // 配置session
        store: sessionStore,        // 设置session存储在redis中
        secret: 'session_id',       
        // resave: true, rolling: true, saveUninitialized: false, 这三个配置加起来实现客户端每次请求自动刷新redis中的session的过期时间
        resave: true,
        rolling: true,
        saveUninitialized: false,   
        // cookie : {
        //     httpOnly: true,
        //     maxAge : 10 * 60 * 1000, // 设置 session 的有效时间，单位毫秒    该有效时间对存在redis和数据库中的session无效
        // },
    }));
    
    
##### 使用
    1. 用户登录设置session
        req.session.userAccount = userAccount;
        
    2. 每次客户端请求判断session是否过期
        if (!req.session.userAccount) {
            res.json({
                status: 401,
                message: '登录过期'
            });
        }
    
    3. 登出
        req.session.userAccount = null;
        
##### 单点登录的实现