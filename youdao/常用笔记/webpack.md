##### webpack + vue项目 创建
    npm i vue --save
    npm i -g vue-cli
    vue init webpack demo

##### webpack和其他打包工具不同点
	1. 代码分割
	2. loaders		解析那些webpack不支持的文件  require('style-loader!css-loader!./style.css')
	3. 插件系统
	4. 模块热更新(用于开发过程中提高开发和调试效率)

##### webpack 安装和命令行
    1. 安装    npm i --save-dev webpack webpack-cli 
    2. 打包    webpack 文件名 压缩后的文件名
    3. 启动    webpack --config webpack.dev.config.js --progress --display-module --color
    4. 服务器  webpack-dev-server(注意没有空格)
    
##### 安装loader
    1. 转换es6
        npm i --save-dev babel-loader babel-core babel-preset-latest
        
    2. 解析css
        npm i --save-dev autoprefixer postcss-loader style-loader css-loader
        autoprefixer:    postcss-loader需要依赖的插件
        postcss-loader:  处理css文件中的兼容性
        style-loader:    使你能够使用类似@import 和 url(…)的方法实现 require()的功能
        css-loader:      将所有的计算后的样式加入页面中
        
    3. 解析sass
        npm i --save-dev node-sass sass-loader
        node-sass:       sass-loader的依赖项
        
    4. 处理html模板
        npm i --save-dev html-webpack-plugin
    
##### webpack.dev.config.js
    const htmlWebpackPlugin = require('html-webpack-plugin');   
    const path = require('path');
    const webpack = require('webpack');
    
    // 单页面开发
    module.exports = {
        entry: './src/app.js',          // 打包入口
        output: {                       // 输出参数
            path: __dirname + '/dist',  // 输出项目主目录
            filename: 'js/[name]-[chunkhash].js',   // js输出路径和名称
            publicPath: 'http://localhost:8081/'    // 设置上线环境的路径
        },
        mode: 'development',    // 解决webpack4.x 打包的时候报错  
        module: {
        rules: [
                {
                    test: /\.vue$/,
                    exclude: path.resolve(__dirname, 'node_modules'),
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,              // 正则校验所有.js结尾的文件
                    loader: 'babel-loader',     // 使用对应的loader解析这些js文件, 并返回解析过后的文件       
                    exclude: path.resolve(__dirname, 'node_modules'),       // 排除不需要解析的文件范围
                    include: path.resolve(__dirname, 'src'),                // 包含需要解析的文件范围, 缩小范围 可以提高打包速度
                }, {
                    test: /\.css$/,
                    exclude: path.resolve(__dirname, 'node_modules'),   
                    loader: 'style-loader!css-loader!postcss-loader',       // !可以串联所有loader   执行顺序从右到左
                }, {
                    test: /\.scss$/,
                    exclude: path.resolve(__dirname, 'node_modules'),
                    loader: 'style-loader!css-loader!postcss-loader!sass-loader'
                }
            ]
        },
        plugins: [              // 初始化插件(不初始化插件用不了)    
            new htmlWebpackPlugin({
                // filename: 'index-[hash].html',  // 动态指定html名称    
                filename: 'index.html',            // 静态指定html名称   
                template: 'index.html',            // 指定html模板
                inject: 'head',                    // 设置在head中引用打包后的script, 默认是在body中引用
                inject: false,                     // 取消自动引用打包生成的script
                title: '配置index.html的title',    // 在index.html页面中使用 <%= htmlWebpackPlugin.options.title %> 来获取title中的配置信息 
                date: new Date(),                  // <%= htmlWebpackPlugin.options.date %> 来获取title中的配置信息
                minify: {                          // 压缩     
                    removeComments: true,          // 删除注释
                    collapseWhitespace: true       // 删除空格
                }
            })
        ],
        // 服务器地址
        devServer: {
            contentBase: path.join(__dirname, './dist')
        } 
    }
    
    // 多页面开发
    module.exports = {
        entry: {                        
            main: './main.js',
            a: './a.js',
            b: './b.js',
            c: './c.js'
        },
        mode: 'development',           
        plugins: [                         
            new htmlWebpackPlugin({    
                filename: 'a.html',                
                template: 'index.html',        
                title: 'a页面', 
                // chunks: ['main', 'a'],       // 给不同html引入不同的js模块
                excludeChunks: ['b', 'c'],      // 排除指定chunks, 引入剩下的
            }),
            new htmlWebpackPlugin({    
                filename: 'b.html',                
                template: 'index.html',     
                title: 'b页面',  
                // chunks: ['main', 'b'],   
                excludeChunks: ['a', 'c'],  
            }),
            new htmlWebpackPlugin({    
                filename: 'c.html',                
                template: 'index.html',    
                title: 'c页面',  
                // chunks: ['main', 'c'], 
                excludeChunks: ['a', 'b'],    
            }),
        ]
    }

#####  postcss.config.js
    module.exports = {      // 解决 报错 No PostCSS Config found in  处理css兼容性前缀
        plugins: {
            'autoprefixer': { browsers: 'last 5 version' }
        }
    } 

    
##### 坑
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
		
##### webpack设置css中的图片引用url路径为相对路径
	 {
                test: /\.(png|jpg|gif)$/,
                //use: 'url-loader?limit=8192&name=images/[hash].[ext]?',
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            esModule: false,
                            name: 'images/[hash].[ext]',
                            publicPath: '../../',  // webpack设置css中的图片引用url路径为相对路径 ../../
                        },
                    },
                ],
           },
    
