##### 此项目为spa项目

##### 一、 create-react-app项目初始化

    1. 安装脚手架
        npm i -g create-react-app
        
    2. 创建项目并进入项目目录
        cd create-app-demo
        
    3. 初始化react项目
        create-react-app react-demo
    
    4. 启动项目
        cd react-demo
        npm run start
        
    5. 打包项目
        npm run build
        
    6. 生成webpack的配置文件
        npm run eject
        
    7. 设置根目录别名
        7.1 开发模式目录别名设置:
            webpack.config.dev.js中
            在module.exports = {} 上设置:
                function resolve(dir) {
                  return path.join(__dirname, '..', dir)
                }
            
            在alias:{} 中设置:
                '@': resolve('src'),     
        
        7.2 正式环境目录别名设置
            webpack.config.prod.js中
            在module.exports = {} 上设置:
                function resolve(dir) {
                  return path.join(__dirname, '..', dir)
                }
            
            在alias:{} 中设置:
                '@': resolve('src'),  
                
        使用: 
            在项目模块中可以使用@代替src路径:
            import xxx from '@/xxx';
            
    8. 删除src目录下除了 index.js和registerServiceWorker.js以外其他的文件

    
    9. 设置git忽略提交文件, 这里我用的是vscode做项目, 所以.gitignore中加上几个下面三个忽略目录
        /dist
        /vscode
        ./vscode
    
#####  二、 react项目架构
    /public 
        index.html    主页面
    /src 
        /components   组件 (这里放置比模块小的组件)
        /config       静态配置文件 (这里放置接口文件和权限码文件等)
        /fetch        请求封装 (可以选择fecth或者axios)
        /redux        状态管理 (可以选择redux-thunk或者reudx-saga)
        /router       路由 (按照项目需求配置静态或者动态路由)
        /services     返回所有的接口请求
        /util         公用工具类 
        /views        模块 (这里放置路由对应的页面或者模块)
        index.js      入口文件
        index.less    公共less文件
        registerServiceWorker.js  脚手架自带离线缓存处理模块
        
    
        
#####  三、 项目依赖的选择和安装
    项目选择淘宝的 ant 框架
    1. 安装yarn 
        npm install -g create-react-app yarn
        
    2. 安装antd
        yarn add antd
        
    3. 将package.js开发依赖(devDependencies)和项目依赖(dependencies)分离
        "dependencies": {
            "antd": "^3.8.1",
            "react": "^16.4.2",
            "react-dev-utils": "^5.0.1",
            "react-dom": "^16.4.2"
        },
        "devDependencies": {
            其他的放到这里面
        }
        
    4. 其他依赖的选择
        分块加载:   react-loadable 
        请求工具:   axios
        css工具:    less ("less": "^2.7.3")
        加密工具:   md5
        路由:       react-router-dom
        redux:      redux   react-redux   redux-saga  redux-thunk
        
    这里关于redux-thunk和redux-saga的选择(二选一):
        这两个redux的中间件都用于增强redux的功能, 更方便的实现了redux的异步操作。
        redux-thunk: 该redux中间件写法为promise的语法, 比较繁琐
        redux-saga:  该redux中间件写法为Generator函数的语法, 比较直观, 但是开发的时候要在 action reducers saga 之间来回切换, 比较绕
        这里推荐淘宝的dva架构, 在redux-saga基础上进行封装, 使用起来特别简单
        
    npm i --save react-loadable axios less md5 react-router-dom redux react-redux redux-saga
    
    npm i --save-dev less-loader babel-plugin-import babel-plugin-transform-decorators-legacy
    
    注意: 
        1. antd项目里面用到了es7的装饰器, 如@Form.create(), 为了兼容, 安装插件 babel-plugin-transform-decorators-legacy, 并且按照文档在package.json中的babel里加入如下
        "babel": {
            "plugins": ["transform-decorators-legacy"],
            "presets": [
              "react-app"
            ]
         },
        }
        
        2. 在package.js的中导入antd的样式
        "babel": {
            "plugins": [
              "transform-decorators-legacy",
              [
                "import",
                {
                  "libraryName": "antd",
                  "style": "css"
                }
              ]
            ],
            "presets": [
              "react-app"
            ]
        }
        
        3. 配置代理(一般项目代理配置在webpack的配置文件中, antd的项目配置在package.json中)
        "proxy": {
            "/api": {   // 后台接口文根
              "target": "http://localhost:9000/api/",   // 后台接口
              "changeOrigin": true, // 改变代理
              "pathRewrite": {
                "^/api": "/"
              }
            }
        },
        
        4. less不生效问题 与 css modules 开启关闭问题（）
        安装了less和less-loader, 还需要修改webpack.config.dev.js和webpack.config.prod.js文件
        css modules的开启关闭只需要在 options中加上 modules: true
        修改rules规则
        {
            test: /\.(css|less)$/,
            use: [
              require.resolve('style-loader'),
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  javascriptEnabled: true,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              // less配置二选一
              // 1. 注意：less为2.x版本的配置
              {
                loader: require.resolve('less-loader') // compiles Less to CSS
              }
              // 2. 注意: less为3.x版本的配置
              {
                loader: require.resolve('less-loader'), // compiles Less to CSS
                options: { 
                  javascriptEnabled: true,
                }
              }
            ],
         },
         {
            // Exclude `js` files to keep "css" loader working as it injects
            // its runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [
              /\.(js|jsx|mjs)$/,
              /\.(css|less)$/,
              /\.html$/,
              /\.json$/,
              /\.bmp$/,
              /\.gif$/,
              /\.jpe?g$/,
              /\.png$/,
            ],
            loader: require.resolve('file-loader'),
            options: {
              name: 'static/media/[name].[hash:8].[ext]',
            },
        }
        
        5. less生效之后确报错(报错会提示你去官网的issues上查看)
        issues有明确的答案： 如果less超过3.0版本就会出问题, 所以将less版本降级为3.0以下
        less": "^2.7.3,    
        
        
#####  代码实现步骤
    1. 根节点
    /src/index.js
        import React from 'react';
        import ReactDOM from 'react-dom';
        import './index.less';
        import registerServiceWorker from './registerServiceWorker';
        
        ReactDOM.render(
            <div>根节点</div>,
            document.getElementById('root')
        )
        registerServiceWorker();
        
    启动项目:
        npm i
        npm start
    
    2. 按项目需求配置axios/fetch
    /src/fetch/request.js  // 代码省略
    
        axios请求使用方法详解：
    
        // 对象参数转换成拼接字符串   {pageNo:1, pageSize:20} ---> ?pageNo=1&pageSize=20
        export function objToStr(obj) {
            let str = '?';
            for (let i in obj) {
                if (obj[i]) {
                    str += `${i}=${obj[i]}&`;
                }
            }
            str = str.slice(0, str.length-1);
            return str; 
        }
        
        项目中三种常用数据处理:
            1. application/x-www-form-urlencoded 表单默认提交
                提交数据格式:
                    Form Data
                        username: admin
                        password: 123456
                        validCode: 0000
                        
                提交数据方式:
                    GET/POST:
                    request('/user/login', {
                        method: 'POST',
                        data: params,
                    	dataType: 'FormData',
                    });
            
            2. multipart/form-data 上传文件
                提交数据格式:
                    ------WebKitFormBoundaryKVTJKN2OA9sGhF8Q
                    Content-Disposition: form-data; name="username"
                    admin
                    
                    ------WebKitFormBoundaryKVTJKN2OA9sGhF8Q
                    Content-Disposition: form-data; name="password"
                    123456
                    
                    ------WebKitFormBoundaryKVTJKN2OA9sGhF8Q
                    Content-Disposition: form-data; name="validCode"
                    0000
                
                提交数据方式:
                    GET/POST:
                    request('/user/login', {
                        method: 'POST',
                        data: params,
                    	header: {
                    		'content-type': false,
                    	}
                    }); 
            
            3. application/json json格式
                提交数据格式:
                    Request Payload
                    {
                        username: admin
                        password: 123456
                        validCode: 0000
                    }
                
                提交数据方式:
                GET:
                request('/user/login' + objToStr(params), {
                    method: 'GET',
                });
                
                POST:
                request('/user/login', {
                    method: 'POST',
                    data: params,
                });
                
        ##### 注意：当使用application/x-www-form-urlencoded提交json格式数据的时候出现的问题

        提交数据的格式为：
            {"username":"admin","password":"123456","validCode":"0000"}:
            
        解决办法：
            改为1或者3的提交方式
    
    
    3. 配置路由
        /router/index.js    返回总路由    
        /router/route.js    配置Basic公共路由的所有组件
        
        index.js改造:
            import React from 'react';
            import ReactDOM from 'react-dom';
            import './index.less';
            import getRouter from './router/index';
            import registerServiceWorker from './registerServiceWorker';
            
            const Router = getRouter();
            
            ReactDOM.render(
                <div>{Router}</div>,
                document.getElementById('root')
            )
            registerServiceWorker();

    
    4. 配置redux 和 懒加载
        /redux/reducers/    整合reducer和action
        /redux/sagas/       部署rootSaga,  watch saga,  work saga
        /redux/reducers.js  使用combineReducers整合所有的reducers
        /redux/store.js     使用createStore(combineReducers, applyMiddleware(...middlewares))    生成并增强store
        
        index.js改造:
            import React from 'react';          // 导入react框架
            import ReactDOM from 'react-dom';   // 导入ReactDOM
            import Loadable from 'react-loadable'; // 导入懒加载模块
            import Loading from '@/components/Loading'; // 导入自定义Loading
            import { Provider } from 'react-redux'; // 用于给根节点传入store
            import store from '@/redux/store';      // store
            import registerServiceWorker from './registerServiceWorker';    // 缓存处理
            import './index.less';  // 公共less文件
            
            // 分开加载路由 和 Loading
            const LoadableComponent = Loadable({
                loader: () => import('./router'),
                loading: Loading
            });
            
            ReactDOM.render(
                <Provider store={store}>
                    <LoadableComponent />
                </Provider>,
                document.getElementById('root')
            )
            registerServiceWorker();

        
        redux + saga的思路
            redux控制状态管理
            saga用于增强状态管理(比如异步操作)
        
    
        
    
            
