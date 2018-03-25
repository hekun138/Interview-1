Node基础知识
1. 浏览器区别和nodejs的区别
1) 全局对象：	
	浏览器this: window
	node的this: global
2) 作用域:
	1个文件是一个作用域
3)	调试:
	node: 只有 console.log() 没有alert()
	
2. global对象的常用方法
1)	获取当前文件路径 	__filename
	console.log(__filename);
2)  获取当前文件所在的目录  __dirname
	console.log(__dirname);
3)  process对象	  ===  node进程工作目录
	console.log(process.cwd());
	
3. 模块 (在node中一个文件可以看作是一个模块)
1)	引用
	模块:
		自定义模块	require('./1.js')	自定义模块引用需要带路径 

		核心模块	核心模块直接使用模块的名字引用
			1) 安装好node就有的自带模块	require('http')  	
			2) node_modules目录下的模块	require('vue')

	a. 文件后缀可以省略  require('./1')  
	
	b. 如果引入模块是模块的名字 一定是核心模块(不需要 ./ 等路径)
	
	c. 模块的加载机制:	文件名 > 文件名.js > 文件名.json > 文件名.node
	
	d. 模块之间的相互引用:
		暴露对象	module.exports = a;
		
4. node目录的配置	
	1) 配置文件	package.json
		dependencies: 当前项目所使用的依赖模块
			"dependencies" : {
				"express" : "latest"  // latest表示最新版本  
			}
	在配置文件目录下使用 npm install 会自动安装 package.json配置文件中的 依赖模块

	2) router目录	用来存放路由文件

	3) views目录 用来存放html模板文件

	4) module目录 自定义的一些模块 
		
		
Node 常用模块
		
1. http模块
	使用http模块创建一个fwq
	// 创建http服务器
	const http = require('http');

	http.createServer((req, res) => {
		// 响应头
		res.writeHead(200, {'Content-Type': 'text/html'});
		// 结束响应
		res.end('success');
	}).listen(233);
	// .listen();  监听端口

2. express模块	用于启动http服务, 链接数据库模块, 链接前端接口, 设置服务端路由的中间件

	http.createServer(fn).listen(8080);
	相当于
	const express = require('express');
	const app = express();
	http.createServer(app).listen(8080);

	所以 express框架相当于fn, 处理req和res的框架

	app.use('/', require('./router/index'));  表示访问'/'路径的时候, 交给指定目录下的index.js处理
	// 可以在express的get、post 等方法中操作数据库的回调 以及 和前端的交互
	app.get('/', callback);  设置get请求端口
	app.post('/', callback);  设置post请求端口	响应数据: req.body
	app.get('/', function (req, res, next) {
		// 响应头
    	res.writeHead(200, {'Content-Type': 'text/html'});
		// 响应数据
		res.send({})  响应数据的方法之一
		res.sendFile() 响应一个模板文件的方法   绝对路径  
		res.json() 响应json数据
		// 响应结束
		res.end()
		// next	跳出该函数继续往下执行
		next()
	})  
	
	app.use(express.static(__dirname + '/public'));	设置前端的静态目录

3.  mysql模块  用于操作mysql的模块
	// 1. 创建数据库链接
	let config = mysql.createConnection({
		// 数据库url
		host: '127.0.0.1',
		// 用户名密码
		user: 'root',
		password: '',
		// 数据库端口
		port: '3306',
		// 数据名
		database: ''
	});
	// 2. 开始链接
	config.connect();
	// 3. 操作数据库
	config.query('数据库语句', (err, data) => {
		
	});
	// 4. 结束链接
	config.end();
	
4. body-parser模块   用于接收post等非get请求的数据
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended:true }));
	
5. cookie-parser模块   用于获取cookie
	var cookieParser = require('cookie-parser');
	app.use(cookieParser('cookieName')); 	// 密钥
	// 1. 设置cookie
	// 发送cookie	名称, 数据, 过期时间
	res.cookie('cookieName', {cookie数据}, {maxAge: 1000*60*60*24})
	// 2. 获取前台发送的cookie
	req.cookies['cookieName'];
	// 3. 清空cookie
	res.clearCookie('cookieName'); 
	// 4. 网址重定向
	res.redirect('/');	
	
6. 爬虫	(http模块 或者 https模块)
	意义: 相当于服务器上的ajax, 用于服务器去请求它需要的一些数据
	第一种 http.get(url, callback);
		http.get(url, (res) => {	
			// 请求图片的时候设置二进制数据
			res.setEncoding('binary');
			// 请求有数据时触发
			res.on('data', (data) => {
				// 处理请求到的数据
			}
			// 当请求完成时触发
			res.on('end', (data) => {
				// 请求完成后的事件
				// 如果是图片的话和普通请求不一样, 通过爬虫获取的二进制数据保存为本目录下的1.png
				fs.writeFile('./1.png',img,'binary')
			}
		});
	
	第二种	http.get(options, callback);
		例如: http://nodejs.cn/api/
		options = {
			// 请求的主域名
			hostname: 'nodejs.cn',
			// 主域名之后
			path: '/api/',
			// 端口号
			port: '80',
			headers: {
				// 设置编码格式
				'Content-Length':'utf-8'
			}
		};
		
	
	
	










	



















	