##### 打包依赖和流程
    依赖环境：
	系统：macOS Mojave 版本10.14.1
	工具：Xcode 10.1
	项目：HBuild官网的5+sdk 包

    项目导入前配置：
    	1. 本机生成csr文件(机构颁发的文件，用于创建证书时使用)
    		启动台(mac底部火箭图标) > 其他 > 钥匙串访问 > 左上角 “钥匙串访问” 选项 > 证书助理 > 从证书颁发机构请求证书 > 
    				    > 填写证书信息(用户电子邮件地址，选择存储到磁盘) > 继续 > 将生成的 csr文件 (CertificateSigningRequest.certSigningRequest) 保存到指定地址
    	2. 登入个人开发者账号/公司开发者账号
    	3. 进入 Certificates, IDs & Profiles
    	4. 创建证书 
    		Certificates > All > + > 勾选 IOS App Development(个人测试证书) || 勾选  App Store and Ad Hoc(发布证书) > Continue > Choose File(选择csr文件) > Continue
    	5. 生成App IDs
    		Identifiers > App IDs > + > (填写App ID Description > Name) (随意) > (填写 App ID Suffix > Explicit App ID > Bundle ID)(通常使用com.domain.xxx的格式) > continue
    
    	6. 保存指定设备的UDID(在测试包没有经过企业账号签名之前，如果不加入UDID,  设备无法安装该应用)
    		Devices > ALL > + > 填写苹果手机的 Name(随意) 和 UDID(40位字符串) > continue
    
    
    ios修改app相关参数：
    	
    	1. 修改app名称：HBuild-Hello >  Supporting Files > InfoPlist.strings
    		有中英文两个版本，修改里面的字段 CFBundleDisplayName="app的桌面名称"
    
    	2. 修改app桌面图标：
    		使用xcode打开项目，点击项目主目录，弹出配置项
    		TARGETS > General > App Icons and Launch Images > App Icons Source > 点击右侧的小箭头 > AppIcon
    			> 右键icon图标背景 > show in Finder > AppIcon.appiconset > 让ui做一套一样大小的图片，名字不变，替换
    	
    	3. 修改app初始化背景图：
    	    
    	    3.1 第一种：合成背景图，需要两步：
    		1.修改背景图的logo
    			TARGETS > General > App Icons and Launch Images > App Icons Source > 点击右侧的小箭头 > app
    				> 右键icon图标背景 > show in Finder > app.imageset > 让ui做一套一样大小的图片，名字不变，替换
    
    		2.修改背景图的文字
    			HBuild-Hello >  Supporting Files > LaunchScreen.storyboard > View Controller > View > 双击 L 文件 修改文字
    		
    
    	    3.2 第二种：直接使用ui做好的背景图，需要两步，禁用第一种背景图，替换默认ui背景图：
    		1. 禁用第一种背景图
    			使用xcode打开项目，点击项目主目录，弹出配置项
    			TARGETS > General > App Icons and Launch Images > Launch Images Sourc > 选择 Don't use asset catalogs
    			TARGETS > General > App Icons and Launch Images > Launch Screen File 设置为空
    		
    		2. 替换默认ui背景图
    			HBuilder-Hello > splash > 右键 > show in Finder > splash > 让ui做一套一样大小的图片，名字不变，替换
    
    打包流程：
    	1. 将开发者账号绑定到xcode 
    		在xcode中打开项目 > 右上角 "Xcode" 选项 > Preferences > Accounts > 左下角 + > Apple ID > 输入个人开发者账号密码 或者 企业开发者账号密码 > Manage Certificates(管理证书，最新版本Xcode会自动帮你管理)
    	2. 本地运行
    		头部有个选择机型的框 > 选中需要的调试的机型 > 点击开始按钮
    	3. 使用数据线连接移动设备运行
    		头部有个选择机型的框 > 选中接入设备的名称 > 点击开始按钮
    	4. 打包成ipa
    		头部有个选择机型的框 > 选中Generic iOS Devices > 最顶部的配置项Product > Archive(输入密码进行签名) 
    			         > 验证钥匙串密码 > Distribute App > Ad Hoc > next(不做其他操作) > next(不做其他操作) 
    			         > 验证钥匙串密码 > Export > 选择输出文件路径和名称
    		