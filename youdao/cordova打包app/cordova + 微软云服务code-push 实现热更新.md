#### cordova + 微软云服务code-push 实现热更新
```
app-center地址： https://appcenter.ms/
```
#### 1. 环境准备(链接本地和微软云服务)
```
1-1. 全局安装code-push-cli
作用：code-push-cli是连接热更新服务端的工具,我们把要更新的代码上传至服务端,客户端(我们的app)安装cordova-plugin-code-push插件来从服务端下载代码.
npm install -g code-push-cli

1-2. 登录code-push 服务端
code-push login 
1) 使用code-push login命令会打开浏览器窗口让我们登录code-push服务端,可用Github账号登录，登录成功会返回一个权限token
2) 复制token粘帖到命令行工具中,回车则会登录成功

1-3. 使用code-push-cli在服务端创建应用test_android
code-push app add test_android android cordova (具体命令行看code-push-cli命令行详解)
```		
#### 2. 环境准备(cordova打包环境)
```	
进入cordova项目目录下安装插件和依赖
2-1. 安装热更新插件
作用：给客户端app拉取更新
cordova plugin add cordova-plugin-code-push

在config.xml中添加配置 Staging Deployment Key 或 Production Deployment Key 
<platform name="android">
	<preference name="CodePushDeploymentKey" value="开发DeploymentKey或生产DeploymentKey" />
</platform>
<platform name="ios">
	<preference name="CodePushDeploymentKey" value="开发DeploymentKey或生产DeploymentKey" />
</platform>

注意：
1) 客户端和服务端通过 Deployment Key 来确认通信是否可以通信
2) Staging 为开发环境，Production 为生成环境，客户端app通过对应环境的DeploymentKey来拉取对应的更新
3) 不需要配置版本号，每次code-push更新的时候，会自动生成新的版本号
4) 更新解析
	Name环境名字
	Deployment Key 链接对应环境使用的密钥
	Staging 开发环境
	Production 生产环境
	Update Metadata 更新信息
		Label: code-push自带的更新版本号
		App Version: app版本
		Mandatory: 该版本是否强制更新
		Release Time：打包时间
		Description：更新信息
	Install Metrics 安装信息
		

│ Name       │ Deployment Key                         │ Update Metadata              │ Install Metrics       │
├────────────┼────────────────────────────────────────┼──────────────────────────────┼───────────────────────┤
│ Production │ V5qbICOLQr9ZM9JFpg1QURkoi4DPB09fQtSYQ2 │ Label: v1                    │ No installs recorded  │
│            │                                        │ App Version: 1.0.0           │                       │
│            │                                        │ Mandatory: Yes               │                       │
│            │                                        │ Release Time: a day ago      │                       │
│            │                                        │ Released By:                 │                       │
│            │                                        │ Description: v1              │                       │
├────────────┼────────────────────────────────────────┼──────────────────────────────┼───────────────────────┤
│ Staging    │ 9ZHUmYoyCnPBw07fSl61aIwlS8YbDhFBUTY55  │ Label: v24                   │ Active: 100% (1 of 1) │
│            │                                        │ App Version: 1.0.0           │ Total: 1              │
│            │                                        │ Mandatory: No                │                       │
│            │                                        │ Release Time: 30 minutes ago │                       │
│            │                                        │ Released By:                 │                       │
│            │                                        │ Description: v4              │
					
	
2-2. 安装白名单插件
作用：让客户端app允许codepush服务器和后台服务器通信
cordova plugin add cordova-plugin-whitelist

在config.xml中配置
<access origin="*" />

2-3. 安装http插件
作用：让客户端的http和https请求生效，若不配置，https和http请求发送失败, 导致更新报错
cordova plugin add cordova-plugin-advanced-http
npm install --save @ionic-native/http

修改SystemWebViewClient.java文件(取消环境的判断，强行让所有请求生效)
文件地址：
	org.apache.cordova.engine.SystemWebViewClient.java
	或
	项目/platforms/android/CordovaLib/src/org/apache/cordova/engine/SystemWebViewClient.java

@Override
public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
	// 删除里面其他判断代码
	handler.proceed();
}
```
#### 3.  代码准备
```
3-1. 在index.html中添加标签
<meta 
http-equiv="Content-Security-Policy"
content="default-src 'self' https://codepush.appcenter.ms/
data: gap: https://ssl.gstatic.com 
'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *">
注意：https://codepush.appcenter.ms/ 这个是微软云服务器的地址，如果微软有更新，需要跟着更新

3-2. 在项目脚本入口前加入更新判断
在https://github.com/microsoft/cordova-plugin-code-push/blob/master/samples/basic/www/js/index.js下找到更新示例代码
在https://github.com/microsoft/cordova-plugin-code-push/blob/master/samples/advanced/www/js/index.js下找到更新示例代码
		
简单版例子：
var app = {
	initialize: function () {
		this.bindEvents();
	},
	bindEvents: function () {
		document.addEventListener('deviceready', this.onDeviceReady, false);
	},
	onDeviceReady: function () {
		window.codePush.sync(
			function (syncStatus) {
				alert(syncStatus);
				switch (syncStatus) {
					case SyncStatus.UPDATE_INSTALLED:
						// 已安装了一个可用的更新，它将在回调函数返回后立即运行，或在下次应用恢复/重新启动时运行
						app.displayMessage("The update was installed successfully. For InstallMode.ON_NEXT_RESTART, the changes will be visible after application restart. ");
						break;
					case SyncStatus.UP_TO_DATE:
						// 该应用程序已完全配置了最新的部署
						app.displayMessage("The application is up to date.");
						break;
					case SyncStatus.UPDATE_IGNORED:
						// 该应用程序具有可选更新，最终用户选择忽略该更新。
						app.displayMessage("The user decided not to install the optional update.");
						break;
					case SyncStatus.ERROR:
						// 2. sync操作期间发生错误。与服务器通信，下载或解压缩更新时，这可能是错误。控制台日志应包含有关所发生情况的更多信息。在这种情况下，没有应用更新。
						app.displayMessage("An error occured while checking for updates");
						break;

					// Intermediate (non final) statuses
					case SyncStatus.CHECKING_FOR_UPDATE:
						// 1. 正在查询CodePush服务器以进行更新。
						console.log("Checking for update.");
						break;
					case SyncStatus.AWAITING_USER_ACTION:
						// 有可用的更新，并且向最终用户显示了一个确认对话框。
						console.log("Alerting user.");
						break;
					case SyncStatus.DOWNLOADING_PACKAGE:
						// 正在从CodePush服务器下载可用更新。
						console.log("Downloading package.");
						break;
					case SyncStatus.INSTALLING_UPDATE:
						// 已下载一个可用的更新，并且即将安装。
						console.log("Installing update");
						break;
				}
			},
			{
				installMode: InstallMode.ON_NEXT_RESTART, 
				updateDialog: true
			},
			function (downloadProgress) {
				console.log("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress.totalBytes + " bytes.");
			});
		app.receivedEvent('deviceready');
	},
	// Update DOM on a Received Event
	receivedEvent: function (id) {
		var parentElement = document.getElementById(id);
		var listeningElement = parentElement.querySelector('.listening');
		var receivedElement = parentElement.querySelector('.received');
		listeningElement.setAttribute('style', 'display:none;');
		receivedElement.setAttribute('style', 'display:block;');
	},
	// Displays an alert dialog containing a message.
	displayMessage: function (message) {
		navigator.notification.alert(
			message,
			null,
			'CodePush',
			'OK');
	}
};

app.initialize();
```
