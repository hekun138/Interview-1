# 1. 浮动 和 定位
	浮动(float)
		浮动的框可以向左或向右移动, 脱离文档流
		float: left;
		float: right;
	清浮动(clear)
		clear属性规定元素的哪一侧不允许其他浮动元素
		clear: left;
		clear: right;
		clear: both;
		
		常用清浮动class:
			.clearfloat {
				zoom: 1;
			}

			.clearfloat {
				display: block;
				clear: both;
				content: "";
				visibility: hidden;
				height: 0;
			}
 
	定位(position) 
		relative: 相对定位, 没有脱离文档流 
		absolute: 绝对定位, 脱离文档流, 向外层查找父元素, 遇到的第一个position: relative;的元素为父元素, 以该父元素的原点为(0,0)定位 
		fixed: 固定定位, 脱离文档流 
		inherit: 继承父元素的position 
	
	

# 2. 居中

# 3. css3新特性

# 4. rem、em、px、vh、vw的区别
    rem: html根节点的font-size的大小 === 1rem 
    em: 父节点的font-size的大小 === 1em	
    px: 像素, 你的物理设备屏幕能显示的最小的点, 不同设备px的长宽不同, 所以会需要做移动端适配	
    vh: 屏幕可视高度 / 100	
    vw: 屏幕可视宽度 / 100	
	
# 5. src和href的区别
    src是引入, 用于替换当前元素, 在请求src资源时会将其指向的资源下载并应用到文档内
    href是引用, 用于在当前文档和引用资源之间确立联系 
	
# 6. link和@import的区别
    link是XHTML标签,除了加载CSS外,还可以定义RSS等其他事务;@import属于CSS范畴,只能加载CSS。
    link引用CSS时,在页面载入时同时加载;@import需要页面网页完全载入以后加载。
    link是XHTML标签,无兼容问题;@import是在CSS2.1提出的,低版本的浏览器不支持。
    link支持使用Javascript控制DOM去改变样式;而@import不支持。
