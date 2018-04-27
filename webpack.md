### webpack和其他打包工具不同点
	1. 代码分割
	2. loaders		解析那些webpack不支持的文件  require('style-loader!css-loader!./style.css')
	3. 插件系统
	4. 模块热更新(用于开发过程中提高开发和调试效率)
	
### webpack 安装和命令行
	1. 项目初始化				npm init
	2. 安装webpack				npm i webpack --save-dev
		或者安装 webpack和webpack-cli	npm install -D webpack-cli webpack
	3. 原始打包文件(原理)		webpack 文件名 打包后的文件名	
	4. 打包的时候报错	The CLI moved into a separate package: webpack-cli
						Would you like to install webpack-cli? (That will run npm install -D webpack-cli   
						) (yes/NO)
		解决办法1 		在config配置文件中加入配置：mode: 'development'或者 mode: 'production'
						module.exports = {
							entry: 'demo.js',	// 不能写成	./demo.js
							output: {
								path: __dirname + '/dist/js',
								filename: 'bundle.js'
							},
							mode: 'development',
						}
		解决方法2       不要使用webpack4.x版本  npm install webpack@2.4.1 --save-dev
	
	5.  打包正常却找不到文件
			path: '/dist/js' 会解析成 C:\dist\js
			所以应该写成   
				path: __dirname + '/dist/js'
	
	6. 安装对应css-loader		npm i css-loader style-loader --save-dev
	指定文件引用的css文件会使用css和style的loader解析	webpack 文件名 打包后的文件名 --module-bind 'css=style-loader!css-loader' --watch
	
	webpack --config webpack.dev.config.js	--progress --display-module --color
		--config	指定webpack配置文件
		--progress	展示打包过程
		--display-module	展示打包的模块
		--colors	彩色显示
		--display-reason	展示打包的原因
	
### webpack配置文件
	webpack.dev.config.js
		module.exports = {
			entry: './src/script/main.js',		// 打包入口			
			output: {							// 设置打包之后的文件放置的位置和文件名
				path: './dist/js',				// 打包保存目录
				filename: 'bundle.js'			// 打包保存文件
			}
		}
		
		entry三种形式:	
			1. entry: 'String' 单文件打包		
			2. entry: ['module1', 'module2'] 多平行文件打包			
			3. entry: {
					key1: 'module1',
					key2: ['module2', 'module3']
			   }
			   
		filename多文件打包时, 为了防止打包输出后的文件名重复
			filename: '[name].js'				[name] 为 entry对应的 key1, key2
			filename: '[name]-[hash].js'		[hash] 为 每次打包生成的hash
			filename: '[name]-[chunkhash].js'   [chunkhash] 为 每次修改过后打包文件的版本号, 也是md5值, 如果文件不修改则没有hash 
			
### html-webpack-plugin
	功能	让html可以自动引用打包出来的js
	安装	npm i html-webpack-plugin --save-dev 
	使用	1.  先导入		const htmlWebpackPlugin = require('html-webpack-plugin');
			2.  再初始化	plugins: [        // 初始化插件(不初始化插件用不了)
								new htmlWebpackPlugin({
			3.  传入指定html模板	template: 'index.html'  
								})
							]
							
### loader 和 rules
	功能	处理webpack不支持的资源文件, 并返回支持的格式
	使用	module: {
				rules: [		// webpack4.x使用rules, 低版本使用loaders
					{
						test: /\.js$/,
						loader: 'babel'
					}
				]
			}
	
### babel-loader babel-core babel-preset-latest
	功能	转换es6
	安装	npm i --save-dev babel-loader babel-core
			npm i --save-dev babel-preset-latest
	使用
	
### style-loader css-loader	postcss-loader
	功能	解析css
	安装	npm i css-loader style-loader --save-dev
			npm i --save-dev postcss-loader
			npm i --save-dev autoprefixer
	使用
		

			
###  坑
	1.	mode不能忘 
		打包报错	The CLI moved into a separate package: webpack-cli
		原因:版本的问题	 webpack4.x版本 需要在配置文件中添加  mode: 'development'或者 mode: 'production'
	
	2.  entry 路径格式按版本写
		entry: 'demo.js' 入口文件的路径不能写成相对路径, 例如  ./demo.js  否则报错, 改成 demo.js

	3.  path 路径默认为c盘
		打包成功确找不到打包文件
		path: __dirname + '/dist/js',  输出路径不能忘记项目路径, 如果写成 path: '/dist/js', 打包文件会输出到C:\dist\js目录下
	
	4.  loader 新版本不能缩写
		loader: 'babel-loader' 写成 loader: 'babel' 有的版本会报错, 因为webpack4.x的loader不支持缩写
	
	5. exclude 和 include 路径
		exclude: __dirname + '/node_modules/'   或	  include: path.resolve(__dirname, 'node_modules')
		include: __dirname + '/src/'	或 		include: path.resolve(__dirname, 'src')
	
	6. 报错 No PostCSS Config found in
		webpack4.x 需要在项目根目录新建一个 postcss.config.js 内容
		module.exports = {
			plugins: {
				'autoprefixer': { browsers: 'last 5 version' }
			}
		} 
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	

	