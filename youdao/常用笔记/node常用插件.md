--save-dev  开发依赖    devDependencies
--save      项目依赖    dependencies

##### babel-polyfill    解析es6插件
    安装: 
        npm install --save babel-polyfill
    引入: 
        一般在脚本最顶部中引入, 再引入其他模块
        import 'babel-polyfill' 或 require('babel-polyfill')
    使用:
        自动生效
    作用: 
        Babel默认只转换新的JavaScript句法(syntax), 而不转换新的API,
        如果想让这些API运行, 必须使用babel-polyfill
        
##### nprogress 进度条插件
    安装:
        npm install --save nprogress
    引入: 
        引入nprogress.js和nprogress.css到项目中
        import NProgress from 'nprogress'
        import 'nprogress/nprogress.css'
    使用: 
        NProgress.start()   开始
        NProgress.done()    停止
        
##### lib-flexible  px2rem-loader   移动端自适应
    安装:
        npm install --save lib-flexible
    安装依赖:
        npm install --save px2rem-loader
    引入: 
        import 'lib-flexible/flexible.js'
    使用:
        1. 在项目根目录index.html头部加入
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        2. 配置px2rem-loader
        在build/untils.js中的 exports.cssLoaders 中添加配置
            const px2remLoader = {
                loader: 'px2rem-loader',
                options: { remUnit: 37.5 }
            }
            // generate loader string to be used with extract text plugin
            function generateLoaders (loader, loaderOptions) {
                const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader,px2remLoader]
    作用: 
        lib-flexible 移动端自适配
        px2rem-loader px自动转换成rem
        在组件中写单位直接写px  然后在浏览器中的检查就可以看到  单位是rem
            
##### js-cookie  cookie操作
    https://www.npmjs.com/package/js-cookie
    <script src="https://cdn.jsdelivr.net/npm/js-cookie@2/src/js.cookie.min.js"></script>
    
    
    

    
    