##### 在没有网络的机器上搭建
    环境要求：python, node, electron
    1. 需要在别的机器上下载python, node, electron安装包到目标机器上安装
    
    2. 将可以正常启动以及打包的 electron项目 整体拷贝到目标机器上
    
    3. 将 C:\Users\某某某\AppData\Roaming 目录下的 npm目录(里面是各种npm全局安装的工具, yarn, vue-cli等)打包 拷贝到目标机器上对应路径下
    
    4. 将 C:\Users\某某某\AppData\Local\electron\Cache 目录打包 拷贝到 目标机器上对应路径下
    
    5. 将 C:\Users\某某某\AppData\Local\electron-builder\Cache 目录 拷贝到目标机器上对应路径下
    
    6. 此时vscode不支持.vue文件，下载一个让vscode支持vue的插件，在C:\Users\某某某\.vscode\extensions 目录 拷贝该插件 到目标机器上对应路径下
    
##### 打包
    npm run build
    打包后生成的build/win-unpacked 目录为测试用的
    
    build/应用程序名 Setup 版本号.exe 为打包成功的 安装程序

##### 修改名称和程序图标
    在package.json中配置
    "build": {
        "productName": "程序名称",
        "directories": {
          "output": "build" // 打包的文件名
        },
        "files": [
          "dist/electron/**/*" // 忽略打包
        ],
        "mac": {
          "icon": "src/renderer/favicon.icns"
        },
        "win": {
          "icon": "src/renderer/favicon.ico" // windows下打包指定ico图标的路径，图标必须为ico格式，大小必须是 256 x 256
        },
        "linux": {
          "icon": "src/renderer"
        }
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    