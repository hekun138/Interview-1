#####	cordova打包debug包https正常 release包无法使用https请求 
    问题描述：

	1、debug模式下正常；

	2、打包release后异常；

	3、部分手机异常（怀疑是Android 版本过低）
	
	解决方式：
		1. 先安装http插件(不使用也安装，否则有可能http无法使用)
			cordova plugin add cordova-plugin-advanced-http
			npm install --save @ionic-native/http
		
		2. 修改SystemWebViewClient.java文件
			文件地址：
				org.apache.cordova.engine.SystemWebViewClient.java
				或
				项目/platforms/android/CordovaLib/src/org/apache/cordova/engine/SystemWebViewClient.java
			
			@Override
			public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError error) {
				// 删除里面其他判断代码
				handler.proceed();
			}
			
##### cordova更新代码和配置文件之后，更新无效
	在项目主目录下执行命令：
		cordova build
		cordova platform update android
		
#### 打包之后出现白屏
	脚本引用路径不支持 "/xxx.js", 将 "/xxx.js" 改为 "xxx.js" 或者 "./xxx.js"
	一般出现的地方：
		index.html中引用ico,css脚本,js脚本等
		使用require动态加载图片时，引用的时候，编译后的值是 /static/media/xxx
		引用icon编译后，在css文件中生成的路径是 /static/media/xxx
	
#### 不支持react的预加载 Loadable
	在react项目的中
	如果使用了 
	import Loadable from 'react-loadable'
	import Loading from '@/component/Loading'
	const LoadableComponent = Loadable({
		loader: () => import('./route'),
		loading: Loading,
	})
	ReactDOM.render(
		<Provider {...stores}>
			<LoadableComponent />
		</Provider>, 
		document.getElementById('root')
	)
	
	则会出现一个loading一直转，应该改为
	import GetRouter from './route'
	ReactDOM.render(
		<Provider {...stores}>
			<GetRouter />
		</Provider>, 
		document.getElementById('root')
	)

#### 加载图片失败
	使用动态加载图片
	config.js
		export const staticImage = {
			logo: require('@/assets/images/logo.png'),
		};
		
	login.jsx
	import config, { staticImage } from '@/config'
	alert(staticImage.logo); 
	// 此时打印出来的值为  /static/media/logo.xxx.png
	// 因为不支持路径 / 所以 要把 / 改为 ./
	
	// 使用方法
	第一种情况，图片没有被webpack压缩成base64格式，此时要将 / 改为 ./
		style={{ backgroundImage: `url(.${staticImage.logo})` }}   
		或者
		src={`.${staticImage.logo}`}
		
	第二种情况，图片被webpack压缩成base64格式，此时正常引用就好
		style={{ backgroundImage: `url(${staticImage.logo})` }}   
		或者
		src={staticImage.logo}
     
    
#### 加载icon失败
	引用icon编译后，在css文件中生成的路径是 /static/media/xxx.xxx.eot等
	将编译后的css文件中的路径的 /static/media 改成 指定的路径 (一般是改成../media)
    
#### http请求失败
```
	原因和解决方法：http://www.ionic.wang/article-index-id-177.html
	4种解决方法  https://cloud.tencent.com/developer/article/1414675
	
	原因：
		Android 9.0(SDK 28) 及以上默认使用加密链接，也就无法使用http
		
	解决方法:
		1. 将http请求改成https
		2. targetSdkVersion 降到27及以下
		3. 开启明文传输 
		
	
	第二种方法的步骤：
		1. 找到targetSdkVersion，将值改成27
			修改 /platforms/android/app/src/main/AndroidManifest.xml
			<uses-sdk android:minSdkVersion="19" android:targetSdkVersion="27" />
	
		2. 新建一个xml文件，写入允许开启http请求的脚本
			新建 /platforms/android/app/src/main/res/network_security_config.xml
			<?xml version="1.0" encoding="utf-8"?>
			<network-security-config>
				<base-config cleartextTrafficPermitted="true" />
			</network-security-config>
		
		3.  在AndroidManifest.xml文件中的application标签增加属性，引入http配置文件
    
			修改 /platforms/android/app/src/main/AndroidManifest.xml
			<application
			...
			 android:networkSecurityConfig="@xml/network_security_config"
			...
			/>
	第三种方法：	
	修改 /platforms/android/app/src/main/AndroidManifest.xml
	<application
	...
	 android:usesCleartextTraffic="true"
	...
```
    
    
    
    
    
    
    
    
    
    
    
    
        
            
        
