##### 步骤
    原理：将本地electron的开发路径或者index.html替换成项目地址url
    https://www.jianshu.com/p/691ce3dd521a
    
    1. 搭好electron项目环境
    
    2. 运行命令 
    git clone https://github.com/szwacz/electron-boilerplate.git
    cd electron-boilerplate
    npm install
    
    3. 移除app和src目录下所有文件
    
    4. 在src目录下新增index.js文件
        /src/index.js 内容如下：
        
        const {app, BrowserWindow} = require('electron');

        const path = require('path');
        const url =require('url');
        
        let win;
        
        const createWindow = () => {
            win = new BrowserWindow({
                width: 800,
                height: 600
            });
        
            win.loadURL('http://web项目真实域名/');
        
            win.on('close',()=>{
                win = null;
            });
        }
        
        app.on('ready', createWindow);
        
        app.on('window-all-close', ()=>{
            if( process.platform != 'darwin') {
                app.quit();
            }
        });
        
        app.on('activate', ()=>{
            if(win === null ) {
                createWindow();
            }
        })
        
        
    
    5. 修改配置文件 ./build/webpack.app.config.js
    const path = require("path");
    const merge = require("webpack-merge");
    const base = require("./webpack.base.config");
    
    module.exports = env => {
      return merge(base(env), {
        entry: {
          background: "./src/index.js",
        },
        output: {
          filename: "[name].js",
          path: path.resolve(__dirname, "../app")
        }
      });
    };
    
    
    6. 替换package.json中打包命令
    "scripts": {
        "postinstall": "electron-builder install-app-deps",
        "preunit": "webpack --config=build/webpack.unit.config.js --env=test --display=none",
        "unit": "electron-mocha temp/specs.js --renderer --require source-map-support/register",
        "pree2e": "webpack --config=build/webpack.app.config.js --env=test --display=none && webpack --config=build/webpack.e2e.config.js --env=test --display=none",
        "e2e": "mocha temp/e2e.js --require source-map-support/register",
        "test": "npm run unit && npm run e2e",
        "start": "node build/start.js",
        "release": "webpack --config=build/webpack.app.config.js --env=production && electron-builder"
   }
   
   7.   修改app的名字 在package.json中 productName: '程序的名字' <br>
        修改app版本号 在package.json中 version: '1.0.0' <br>
        修改程序图标：/resources/icon.ico   必须是256*256的 icon.ico图标
        修改程序头部小图标  /resources/icons/512*512.png  必须是512*512的png图片
   
   7. 运行npm run release 打包
   
   8. 打好的exe包在 /dist/ 目录下的 xxx.exe 
   

    
    
    
    
    
    @测试 请开启apoc_client 圣耀h5 修复新手宝藏状态错误，推广注册未初始化
    
    
    
    
    
    
    
     