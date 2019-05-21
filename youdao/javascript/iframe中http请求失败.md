##### 在子页面iframe中，http请求无效
	原因：
		主页面的域名为https,发起的请求都是https请求，在iframe中发起http请求的情况下，为跨域(协议不同)
	
	解决办法：
		在页面头部添加meta
			upgrade-insecure-requests;表示将所有请求强制处理为https请求
			<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests;">
		
		或(下面的meta为处理安全性以及解决以上问题)
			<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' 'unsafe-eval' *; style-src  'self' 'unsafe-inline' *;upgrade-insecure-requests;">