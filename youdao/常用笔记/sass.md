##### node下安装sass
    sass-loader 依赖 node-sass
    npm i --save-dev node-sass      
    npm i --save-dev sass-loader
    
##### 在ruby命令行中安装sass
    安装sass:   gem i sass
    安装beta版本的sass: gem i sass -pre
    升级sass版本:   gem update sass
    查看sass版本:   sass -v
    查看你需要的sass命令:   sass -h
    卸载sass:   gem uninstall sass
    
##### 安装compass
    gem i compass
    (Compass 是一个成熟的、基于 Sass 开发的一个框架，这里面集成了很多写好的 mixins 和 Sass 函数。)
    
##### sass和scss
    .sass是老语法对应的扩展名
    .scss是新语法对应的扩展名
    
##### sass编译
    1. 单文件编译
      一次性编译
        sass <要编译的Sass文件路径>/style.scss:<要输出CSS文件路径>/style.css
      监听编译
        sass --watch <要编译的Sass文件路径>/style.scss:<要输出CSS文件路径>/style.css
    	
    2. 多文件编译
        sass --watch sass/:css/
    
##### sass不用样式风格的输出方法
    1. 嵌套输出方式(默认) nested.css 
    sass --watch sass/demo.scss:css/nested.css --style nested 
    
    2. 展开输出方式 expanded.css
    sass --watch sass/demo.scss:css/expanded.css --style expanded 
    
    3. 紧凑输出方式 compact.css 
    sass --watch sass/demo.scss:css/compact.css --style compact 
    
    4. 压缩输出方式 compressed.css 
    sass --watch sass/demo.scss:css/compressed.css --style compressed
    
##### sass常用语法
    1. 变量
        普通变量: $width: 100px;
        默认变量: $width: 100px !default;
        全局变量与局部变量和js一样
        
    2. 嵌套
        a.选择器嵌套
            &代表&所在的嵌套结构  
            这里header & = header nav a
            nav{
                a {
                    color: pink;
                    header & {
                        color: #000;
                    }
                }
                
            }
            
            
        b.属性嵌套
            注意属性嵌套和选择器嵌套的区别 
            属性嵌套有冒号: font-size写成  font: {size}  
            选择器嵌套无冒号: header {div}
            div {
                border: {
                    top: 5px solid #000;
                    bottom: 5px solid #fff;
                }
            }
            
        c. 伪类嵌套
            写法同属性嵌套类似: 有冒号
            div {
                width: 100px;
                &:hover {
                    background: #fff;
                }
            }
            
    3.  混合宏
        @mixin 是用来声明混合宏的关键词
        @include 是用来调用混合宏的关键词
        
        不带参数混合宏
        @mixin border-radius{}
        
        带参数混合宏
        @mixin border-radius($radius:5px){}
        
        复杂的混合宏
        @mixin border-radius($radius...){判断语句}
        
    4.  扩展/继承
        @extend
        
    5.  占位符
        %placeholder
        优点: 
        	%clear{
        	    clear: both;
        	}
        	如果没有被@extend, 它是不会在.css文件中产生代码块的。
        	
        	.clear{
        	    clear: both;
        	}
        	不管有没有被调用, 它都会在.css文件中产生代码块, 造成代码冗余。
    6.  加减乘除
        sass的加减乘除符号两边要加上空格, 否则会被当成字符串。
        不同单位的变量不能直接运算。
        $width1: 800px;
        $width2: 200px;
        .box {
        	width: (($width1 + $width2) - 10 * 2) / 2;
        }
    
    7.  px转换成rem
        // iphone6基准值
        @function pxToRem($px) {
        	$rem : 37.5px;
        	@return ($px / $rem) + rem; 
        }
        
        .box {
        	width: 	pxToRem(100px);
        	height: pxToRem(100px);
        }
        
    8. 字体宏定义
    @mixin font-dpr($font-size){
        font-size: $font-size;
     
        [data-dpr="2"] & {
            font-size: $font-size * 2;
        }
     
        [data-dpr="3"] & {
            font-size: $font-size * 3;
        }
    }
    
    使用：
        @include font-dpr(16px);