##### 什么是npm?
    世界上最大的软件注册表
    由三个部分组成: 
        网站 (npm网站，用来给开发者查找包，设置参数，管理npm)
        注册表 （registry，一个巨大的数据库，保存了每个包的信息）
        命令行工具 （CLI）
   
##### 什么是package.json?
    npm init 项目初始化会生成一个自定义package.json
    npm init --yes 项目初始化会生成一个默认的package.json
    
    package.json里面存放着项目相关的信息
    
    常见的区别：
        dependencies  项目生产环境依赖包 (npm i xxx --save)
        devDependencies  项目开发和测试依赖包 (npm i xxx --save-dev)
        命令行工具包  (npm i xxx -g)
    
##### 管理项目依赖包
    1. 安装
        1.1 安装package.json中所有包
            npm install 
            
        1.2 安装指定包 （使用npm install 安装单个包时默认添加参数 --save）
            npm install 包名
            
        1.3 安装指定版本的包
            npm install 包名@版本号
        
    2. 卸载
        npm uninstall 包名
    
    3. 更新
        3.1 更新单个包到最新版本
            npm update 包名
            
        3.2 更新所有包到最新版本
            npm update
  
##### 管理命令行工具包(全局包)
    需要全局安装的包，为命令行工具
    1. 安装
        npm install 包名 -g
        
    2. 更新
        npm update 包名 -g
        
    3. 卸载
        npm uninstall 包名 -g
        
##### 清除缓存
    npm cache clean --force
    
##### 安装淘宝镜像
        npm config set registry https://registry.npm.taobao.org --global
        npm config set disturl https://npm.taobao.org/dist --global
        
##### 常见问题和解决方法
    1. npm i 安装报错 npm ERR! cb() never called! ...
    解决方法：使用管理员身份运行cmd重新安装
    
    
    
    