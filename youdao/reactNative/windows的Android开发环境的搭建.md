##### 环境依赖
    node(>8.3)
    python2.x
    JDK1.8
    Andriod Studio
    React Native命令行工具

##### 安装node (v8.9.3) http://nodejs.cn/download/
    输入命令行 node -v 查看是否安装成功
    
    设置淘宝镜像
        npm config set registry https://registry.npm.taobao.org --global
        npm config set disturl https://npm.taobao.org/dist --global
        
##### 安装python2.x (v2.7.13) https://www.python.org/downloads/windows/
    添加python安装目录到环境变量
    输入命令行 python 查看是否安装成功
    
##### 安装JDK1.8 http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
    配置环境变量
    输入命令行 java -version 查看是否安装成功
    
##### 安装Yarn, React Native的命令行工具 (react-native-cli)
    npm i -g yarn react-native-cli
    
    设置淘宝镜像
        yarn config set registry https://registry.npm.taobao.org --global
        yarn config set disturl https://npm.taobao.org/dist --global
        
##### 安装安卓开发环境 https://developer.android.com/studio/
    安装Android Studio 和 Android sdk
    配置Android sdk的环境变量
    查看Android Studio ---> Preferences ---> Appearance & Behavior ---> System Settings ---> Android SDK 中的SDK安装路径和环境变量配置的是否一致 

##### 创建一个新项目测试
    新建目录 AwesomeProject
    初始化项目
        react-native init AwesomeProject （自动使用最新版本rn）
        （react-native init AwesomeProject --version x.xx （使用指定版本rn））
    选择使用真机或者虚拟设备AVD开发
    
    一、使用虚拟设备AVD开发
        1. 创建一个虚拟设备AVD
            Android Studio ---> Tools ---> AVD Manager ---> Create Virtual Device ---> 在Select Hardware中选择自己需要的硬件设备(如需要自定义设备, 点击New Hardware Profile进行自定义配置) ---> System Image 选择一个下载好的系统镜像 ---> Android Virtual Device(AVD)
            
        2. Android Virtual Device 参数验证
            AVD name  安装虚拟设备名称
            Startup orientation 启动方向
            Emulated Performance 仿真性能 
            Graphics 绘图
            automatic 自动
            Device Frame 设备框架
            Enable Device Frame 启用设备框架
            Show Advanced Settings 显示高级设置
            (高级设置)
            camera  照相机
            network 网络
            boot option 引导选项
            memory and storage  内存与存储
            keyboard 键盘
            
        3. 启动AVD
            Tools ---> AVD Manager ---> Your Virtual Devices ---> 选择要启动的AVD ---> Actions的绿色启动图标
            
        4. 启动AVD失败解决
            4.1 修改AVD配置
                Tools ---> AVD Manager ---> Your Virtual Devices ---> 选择对应AVD ---> 编辑 ---> Graphics ---> Software - GLES 2.0 ---> Finish ---> 重启AVD
            
            4.2 查看Android Studio的右下角Event Log的报错信息
                错误信息提示：
                    15:45	Emulator: emulator: ERROR: x86_64 emulation currently requires hardware acceleration!
                    15:45	Emulator: Process finished with exit code 1
                
                该错误信息表示：仿真器发生错误，X86_64 模拟当前需要硬件加速
                                仿真器退出
                                
                解决方案：
                    安装一个硬件加速 HAXM（Intel 虚拟硬件加速驱动）
            
            4.3 查看是否安装了 HAXM
                Tools ---> SDK Manager ---> Appearance & Behavior ---> System Settings ---> Android SDK ---> SDK Tools 发现 Intel x86 Emulator Accelerator (MAXM installer) 的状态为已安装(Installed)
                
                还是报了和4.2同样的错误
                
                思路：
                    第一个是HAXM安装有问题
                    第二个是HAXM只支持intel的cpu
                    
                查了一下cpu, 没问题, 那就是第一个问题了
                
                解决方案：
                    重新安装HAXM, 找到sdk中的intelhaxm-android.exe （默认路径为C:\Users\Administrator\AppData\Local\Android\Sdk\extras\intel\Hardware_Accelerated_Execution_Manager）
                    先点击intelhaxm-android.exe进行remove移除，再点击重新安装
                    如果当前电脑没有启动BIOS界面中的Intel Virtual Technology [Enabled] （即允许虚拟机技术），则会报错
                    
            5. 重复步骤3启动AVD成功
            
    二、使用真机开发
        1. 使用USB连接手机和电脑
        
        2. 启动USB调试模式
        
        （启动项目方式和AVD一样）

##### 在终端或者vscode等工具中运行项目
    启动项目命令
        react-native run-android
                    
    查看AVD变化之后, 修改代码中的文字, 选中AVD屏幕按两下R键, 刷新屏幕, 查看修改代码是否成功
                    
##### 在Android Studio中启动项目
    1. File ---> Open ---> 在弹出的Open File or Project界面中选择要添加的ReactNative应用 (注意这里选中的是项目中的Android)
    
    遇到问题：
        加载项目的时候一直卡在 Building  android  gradle project info 不动, 
        两个原因：
            第一个：网络卡
            
            第二个：
                主要是因为项目所需的Gradle文件不存在，android Studio在后台下载Gradle文件的服务器不能正常访问或者下载很慢，
                所以导致Android Studio卡在Building 'xxx' Gradle project info。
        
    解决办法： 
        网络卡的解决办法：
            过一段时间就会自动完成
    
        第二原因的解决方法：
        https://www.cnblogs.com/AP0904225/p/7076517.html?utm_source=itdadao&utm_medium=referral
        
        1. 打开工程的gradle-wrapper.properties文件, 查看所需的gradle版本，比如
            distributionUrl=https\://services.gradle.org/distributions/gradle-4.4-all.zip 
            所需gradle-4.4-all.zip
        
        2. 下载对应的gradle版本 
            https://gradle.org/releases/
        
        3. 拷贝对应版本的gradle到Android Studio设置的gradle路径中对应的文件夹中
            
    
    2. 项目加载完成之后，点击运行按钮，提示Please select Android SDK
    解决方法：File ---> Project Structure ---> app ---> 中将Build tools version修改为react-native需要的版本（当前为26.x.x）
    
    3. 点击运行
    运行成功, 红屏, 报错信息：unable to load script from assets 'index.android.bundle' Make sure your bundle is packaged correctly or you are running a packager server
    
    解决办法：
        https://blog.csdn.net/Wbiokr/article/details/78887790

     
##### android的app基本配置
    1. app的桌面名字修改
        项目/android/app/src/main/res/values/strings.xml
        修改 <string name="app_name">安卓app的桌面名字</string>
        
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    