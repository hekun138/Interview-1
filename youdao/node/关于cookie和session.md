##### 相关资料    
    http://wiki.jikexueyuan.com/project/node-lessons/cookie-session.html
    
##### 什么是session?
    session就是服务器给客户端一个编号，当一台服务器运行时，可能有若干个用户浏览器正在运行这台服务器的网站，
    当每个用户首次与这台服务器建立链接时，它就会与这台服务器建立一个session，同时服务器会自动的为其分配一个SessionID，
    用以标识这个用户的唯一身份，这个SessionID是由服务器随机产生的一个由24个字符组成的字符串。

##### cookie 和 session为什么会出现？
    1. 由于http是无状态的, 也就是说每次的http请求之间都是没有任何联系的,
    无状态的好处是快速, 但是有一个问题, 在希望多个请求的页面要有关联, 并且记录登录状态的情况下, 就无法解决了。
    
    2. 为了解决记录登录状态, 出现了客户端存储数据方式cookie, cookie在同一个域名下是全局的, 
    只要设置它的存储数据在指定域名下, 那么就可以记录这个域名下所有的页面登陆问题.
    
    3. 但是cookie是保存在客户端的, 有安全问题,并且大小有限(4K) 所以出现了保存在服务器端session(保存/tmp目录下)
    
    

##### 二者比较
    cookie:
        保存在客户端浏览器
        cookie不是很安全，别人可以分析存放在本地的cookie并进行cookie欺骗
        cookie机制是通过检查客户身上的“通行证”来确定客户身份
        单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。
    
    session:
        保存在服务器
        相当于程序在服务器上建立的一份客户档案
        session机制是通过检查服务器上的“客户明细表”来确认客户身份
        session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能 考虑到减轻服务器性能方面，应当使用COOKIE。
        
    所以建议：将登陆信息等重要信息存放为session、其他信息如果需要保留，可以放在cookie中
        
##### 为什么不使用cookie
    cookie会保存在客户端, 如果将登录的一些重要信息，比如密码之内的保存在用户自己那里，这显然是很不安全，很不靠谱的。
    所以，我们使用session，将用户的登录信息保存在服务端或者数据库中，就相对安全靠谱多了。
    
##### 如何使用cookie
    1. 依赖
        var cookieParser = require('cookie-parser');
    
    2. 注册
        const app = express();
        app.use(cookieParser());
        
    3. 发送cookie到客户端
        // 三个参数: cookie的key, cookie的value, cookie的配置参数
        res.cookie('cookieName', 'cookieValue', {maxAge: 60000, httpOnly:true }); 
        
    4. 接收cookie
        req.cookies
        
##### session的创建顺序
    1. 生成全局唯一的标识符(sessionid)
    
    2. 开辟数据存储空间(内存/cookie/redis缓存/数据库)
    
    3. 将session的全局唯一标识符发送给客户端
    
##### 如何使用session
    注意： cookie和session配置基本信息要写在主入口文件的总路由app.use('/', require('./router/index'));的上面

    1. node的session依赖两个插件
        const express = require('express');
        const cookieParser = require('cookie-parser');
        const session = require('express-session');
        const app = express();
    
    2. 配置基本信息
        const sessionStore = new session.MemoryStore({ reapInterval: 10000 });
        app.use(cookieParser());    // cookie
        app.use(session({           // session
            store: sessionStore,  //  session存储位置 的存储方式，默认存放在内存中，也可以使用 redis，mongodb 等。
            secret: 'session_id',   // 通过设置的 secret 字符串，来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改。
            name: '',   // 设置 cookie 中，保存 session 的字段名称，默认为 connect.sid
            resave: false,  // 即使 session 没有被修改，也保存 session 值，默认为 true
            saveUninitialized: true,    // 是否保存未初始化的会话
            cookie : {  // 设置存放 session id 的 cookie     的相关选项，默认为(default: { path: '/', httpOnly: true, secure: false, maxAge: null })
                maxAge : 1000 * 60 * 3, // 设置 session 的有效时间，单位毫秒 该有效时间对存在redis和数据库中的session无效
            },
            genid: '',  // 产生一个新的 session_id 时，所使用的函数， 默认使用 uid2 这个 npm 包
            rolling: false, // 每个请求都重新设置一个 cookie，默认为 false
        }));
    
    3. 取出session中的数据
        // 设置session
        req.session.userAccount = userAccount;
    
        // 访问session中的所有数据
        req.session
        
##### session存储的4个常用地方
    session 的 store 有四个常用选项：1）内存 2）cookie 3）缓存 4）数据库
    1. 内存: 省事, 不能共享
    2. cookie: 省事, 耗费网络传输
    3. redis缓存, 推荐
    4. 数据库, 麻烦
    
##### 在内存中使用session
    在内存:
        const sessionStore = new session.MemoryStore({ reapInterval: 10000 });

    在redis:
        const session = require('express-session');
        const redisStore = require('connect-redis')(session);
        const sessionStore = new redisStore({ 
            host: '127.0.0.1',
            port: 6379,
            db: 0,                  // 使用第0个数据库
            // pass: 123456,        // 数据库密码 默认无
            prefix: 'sessionid:',   // 数据表前缀, 默认为"sess:"
            ttl: 10 * 60,           // 过期时间 单位：s, 当session保存在redis中，在此处设置过期时间，而不是在maxAge中设置过期时间
         });

    在mongodb:
        const sessionStore = new MongoStore({
    		db: "my_database",
    		host: "localhost",
    		port: 27017
    	});

    1. 配置session
        const session = require('express-session');
        const app = express();
       // 设置session缓存到redis
        app.use(session({           // session
            store: sessionStore,    // 设置session存储在redis中
        	secret: 'session_id',
        	// genid: function (req) { // 生成一个自定义的sessionid串，实际值： sessionid:xxx...
        	// 	const { username } = req.body;
        	// 	if (username) {
        	// 		return md5(username);
        	// 	}
        	// },
            name: 'token', // 设置sessionid的名字，默认是connect.sid
            resave: true,  
            rolling: true, // 用户每次请求都修改session的保存时间
            saveUninitialized: false, // 配置session是否需要初始化
        	// cookie : { // 该有效时间对存在redis和数据库中的session无效
        	//     path: '/', // cookie是设置在根目录
            //     httpOnly: true, // 禁止客户端JavaScript的访问，防止当前会话（sessionid)被恶意的js脚本盗取
            //     maxAge : 10 * 60 * 1000, // 设置 session 的有效时间，单位毫秒    该有效时间对存在redis和数据库中的session无效，只在内存中生效
            // },
        }));

        
    2. 保存session
        req.session.userAccount = userAccount;
        
    3. 判断session是否超时
        if (req.session.userAccoun) {
            res.json({
                status: 401,
                message: '登录超时',
                data: null
            });
            return;
        }
        
    