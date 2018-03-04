# 步骤: 安装ruby环境  --->  在ruby环境环境中安装sass  --->  安装sass的框架compass

## 1. 安装ruby
[安装ruby](https://rubyinstaller.org/downloads/ "ruby官网")
	在安装的时候，请勾选Add Ruby executables to your PATH这个选项，添加环境变量，不然以后使用编译软件的时候会提示找不到ruby环境
	检测是否安装成功: ruby -v

## 2. 打开ruby命令行界面
	安装完ruby之后，在开始菜单中，搜索ruby，打开Start Command Prompt with Ruby

## 3. 安装sass(scss)
	在ruby命令行界面中:
	安装sass:	gem i sass
	如果要安装beta版本的sass:	gem i sass --pre
	升级sass版本:  gem update sass
	查看sass版本: sass -v
	查看你需要的sass命令: sass -h
	卸载sass: gem uninstall sass

## 4. 安装compass
	gem i conpass
	(Compass 是一个成熟的、基于 Sass 开发的一个框架，这里面集成了很多写好的 mixins 和 Sass 函数。)

## 5. sass和scss
	.sass是老语法对应的扩展名
	.scss是新语法对应的扩展名
现在都使用.scss

## 6. sass编译
	单文件编译
		一次性编译
			sass <要编译的Sass文件路径>/style.scss:<要输出CSS文件路径>/style.css
		监听编译
		sass --watch <要编译的Sass文件路径>/style.scss:<要输出CSS文件路径>/style.css
		
	多文件编译
		sass --watch sass/:css/
		
## 7. sass不用样式风格的输出方法
	[demo.css](https://github.com/l511407563/Interview/blob/master/sass/sass/demo.scss) <br>
	![](https://github.com/l511407563/Interview/blob/master/sass/image/demo.png)
	
	嵌套输出方式 [nested.css](https://github.com/l511407563/Interview/blob/master/sass/css/nested.css) <br>
		sass --watch sass/demo.scss:css/nested.css --style nested
	![](https://github.com/l511407563/Interview/blob/master/sass/image/nested.png)
		
	展开输出方式 [expanded.css](https://github.com/l511407563/Interview/blob/master/sass/css/expanded.css) <br>  
		sass --watch sass/demo.scss:css/expanded.css --style expanded
	![](https://github.com/l511407563/Interview/blob/master/sass/image/expanded.png)
		
	紧凑输出方式 [compact.css](https://github.com/l511407563/Interview/blob/master/sass/css/compact.css) <br>  
		sass --watch sass/demo.scss:css/compact.css --style compact
	![](https://github.com/l511407563/Interview/blob/master/sass/image/compact.png)
		
	压缩输出方式 [compressed.css](https://github.com/l511407563/Interview/blob/master/sass/css/compressed.css) <br>  
		sass --watch sass/demo.scss:css/compressed.css --style compressed
	![](https://github.com/l511407563/Interview/blob/master/sass/image/compressed.png)
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	