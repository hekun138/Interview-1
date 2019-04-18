### 1 将包发布到npm上

##### npm用户注册和登录
    npm adduser  (注册npm账号, 有账号了无需注册)
    npm login   (登录npm)

##### 新建包(注意: 包名不能有大写字母/空格/下滑线!)
    假设包名 <name>
    npm init(新建项目)
    index.js (暴露包模块的接口文件)
    README.md (Markdown说明文件)
    .gitignore (提交忽略)
    /lib目录   (填写包代码)

##### 发布包(注意: 不能发布npm上发布过的包)
    npm publish (将包发布或更新到npm上)
    
##### 维护更新(注意: 每次更新版本的时候必须先将git提交)
    本地更新版本: 1.0.0
        npm version patch -m "修改补丁, 更新至1.0.1版本" (1.0.1 补丁)
        npm version minor -m "小改, 更新至1.1.0版本" (1.1.0 小改)、
        npm version major -m "大改, 更新至2.0.0版本" (2.0.0 大改)
    
    远程更新
        npm publish


##### 撤销包(注意: 只能在24小时内撤销)
    npm --force unpublish <name>


### 2 将包放到github上存储
    新建一个github用于存储该包源码


### 3 第三方下载包使用
##### 下载使用
    下载全局包：
    npm install <name> -g
    
    下载生产环境依赖包：
    npm install <name> --save
    
    下载开发环境依赖包：
    npm install <name> --save-dev 
    

##### 使用更新
    更新全局包：
    npm update <name> -g
    
    更新生产环境依赖包：
    npm update <name> --save
    
    更新开发环境依赖包：
    npm update <name> --save-dev 
    
##### 卸载
    npm uninstall <name>
