##### 步骤
    原理：将本地electron-vue的开发路径或者index.html替换成项目地址url

    1. 搭好electron-vue项目环境
    
    2. package.json中dependencies只留下 vue和vue-electron
    (这步操作是为了只留下electron-vue的打包功能，但是又避免其他依赖增大最终打包体积，实际打包之后为35M左右)
    
        "dependencies": {
            "vue": "^2.5.16",
            "vue-electron": "^1.0.6"
        },
        
    3. 找到项目 /src/main/index.js 将里面的 
    const winURL = process.env.NODE_ENV === 'development' ? `http://localhost:9080` : `file://${__dirname}/index.html`
    替换成
    const winURL = "http://web项目真实域名/"
    
    4. 找到项目 /src/renderer/
    里面只留下  main.js 和 App.vue
    main.js内容如下：
    import Vue from 'vue'
    import App from './App'
    
    new Vue({
        components: { App },
        template: '<App />',
    }).$mount('#app')
    
    App.vue 内容如下：
        <template>
            <div></div>
        </template>
        
        <script>
            export default {
                name: 'app'
            }
        </script>
        
        <style></style>
        
    5. 执行 npm run build 进行打包
    打包完成后，build/xxx.exe(应用程序名 Setup 版本号.exe) 为打包成功的 可执行exe安装程序
        
        
        