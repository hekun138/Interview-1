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

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
        
            
        