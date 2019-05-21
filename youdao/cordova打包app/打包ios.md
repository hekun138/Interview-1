##### cordova将h5打包成ipa, iframe内嵌网页不显示
	在config.xml中添加
	<access origin="*" />
	<allow-navigation href="*" />
	
##### cordova更新代码和配置文件之后，更新无效
	在项目主目录下执行命令：
		cordova build
		cordova platform update ios