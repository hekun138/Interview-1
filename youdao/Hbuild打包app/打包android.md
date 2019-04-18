##### 原理
    地址: https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/104
    
    作用：使用HTML5 + SDK实现本地打包
    Android离线打包(https://ask.dcloud.net.cn/docs/#//ask.dcloud.net.cn/article/13141)
    
    

##### 依赖
    

##### 步骤
    




##### 5 + sdk + Hbuild-Hello + AndroidStudio 打包注意事项相关参数
    1. 修改app的名字
        /项目/app/src/main/res/values/strings.xml   
        <resources>
            <string name="app_name">app的名字</string>
        </resources>
        
    2. 修改app的图标
        /项目/app/src/main/res/drawable/icon.png   
        
    3. 打开app初始化过渡背景图片
        /项目/app/src/main/res/drawable/splash.png
        
    4. 加载h5主页 index.html
        /项目/app/src/main/assets/apps/HelloH5/www/mainfest.json
        修改 launch_path 字段值
    
    5. 修改SDK路径
        /Gradle Scripts/local.properties
            修改sdk.dir变量
    
    6.  修改minSdkVersion和targetSdkVersion
        /Gradle Scripts/build.gradle
        
    7.  由于Android为沙盒环境(与浏览器不同)，不支持window对象，
        或者window对象为file://格式，不同于浏览器的http://或者https://协议格式，
        所以请求域名不能使用window.location等方式动态生成，只能写死，如直接写 https://www.xxx.com/，wss://xxx.com/
        同样也不支持例如angular的$location对象
        所以请求url必须写死
        
    8.  另外跳转页面问题，如果项目跳转到了其他网址，在其他网址的"返回按钮"使用window.location.href = '本网址页面'; 
        是无法找到页面的，因为这时候的window对象找到的地址为file://格式
        这个可以使用iframe嵌套其他网址的方式解决，"返回按钮"放置在本项目中。
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        
            
        