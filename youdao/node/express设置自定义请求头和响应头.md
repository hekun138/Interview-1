##### 自定义请求头和响应头报错解决
    // 允许所有跨域请求
    // 默认请求上, 浏览器只能访问以下默认的响应头 Cache-Control, Content-Language, Content-Type, Expires, Last-Modified, Pragma
    // 如果要前端的axios等能获取到自定义响应头, 如Authorization, 则要设置 Access-Control-Expose-Headers
    // 如果要前端的axios等能发送自定义请求头, 如Authorization, 则要设置 Access-Control-Allow-Headers
    // Access-Control-Allow-Headers 表示 允许前端传给后端的 字段
    // Access-Control-Expose-Headers 表示 允许前端接收后端给的 字段
    app.all('*', function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    	res.header('Access-Control-Expose-Headers', 'Authorization'); 
        next();
    });
    
    // 前端设置请求头
    config.headers.authorization = commonStore.authorization;
    
    // 前端接收响应头
    const { headers: { authorization } } = response;
    
    // 后端设置响应头头和响应body
    // 设置响应头
    res.append('authorization', authorization);
    // 设置响应body
    res.json({
        status: 0,
        message: '登录成功',
        data: {},
    });
    
    // 后端接收请求头
    const { authorization } = req.headers;
    
    
    
    
    
    
    
    
    
    
    