### 思维线: 普通函数 ---> 闭包 ---> return && new ---> 构造函数 && 原型 ---> 原型链 ---> 继承   
### 1. 闭包
    作用: 
        a. 作为函数和外部沟通的桥梁, 使得外部可以访问到函数内部的局部变量和方法
        b. 可以保护闭包内的变量不被javascript的垃圾回收机制回收
    例子:
        如该例子, bibao函数内的局部变量num和方法add, 在外部可以访问到, 而num在add中不会被销毁。
        function bibao() {
              var num = 1;
              function add() {
                    return num++;
              }
              // 桥梁 接口
              return add;
        }
        // 保护闭包内部变量不被销毁
        var a = bibao();
        a(); // 1
        a(); // 2
        a(); // 3
    理解:
        可以把闭包看成一个光碟对象, 这个对象通过return暴露出一些接口, 我们可以通过这个接口去访问这个光碟内部的电影, 
        并且你在看光碟内的电影的时候可以保存, 等你下次再访问的时候会从上一次停止播放的地方继续观看。

### 2. new 构造函数 和 return 普通函数
	new fn();
	new后面跟的都是函数
	最终都返回一个对象
	
	函数执行前加new对函数的影响:
		1. 函数内部会产生一个对象, this指向这个对象, 注意: 不是指向这个函数。(普通函数内部this指向null或者window)
		2. 函数默认返回这个对象 (所以不需要return)
		
		普通函数: 使用return返回函数中已有对象
		function fn1() {
			console.log(this); // window
			var obj = {};
			return obj;
		}
		fn1();
		
		构造函数: 首字母大写, 使用new生成并返回一个新对象
		function Fn2() {
			// 注意, this不会指向fn2这个函数, 而是指向fn2内部产生的一个对象, 而obj通过=引用了该对象, 所以this指向了obj
			console.log(this); // obj	
		}
		var obj = new fn2();
			
### 3. 构造函数 和 原型
		构造函数: 
			构造函数内部的方法为每个new出来的新对象的 "私有属性"
		原型:
			prototype上的方法为所有对象的 "公共属性"
		实例对象:
			通过new关键字生成的对象
			
		function Factory(data) {
			// 实例对象的私有属性, 判断是否是私有属性 obj.hasOwnProperty(attr)
			this.data = data;
			console.log(this); // this执行实例化对象
		}
		
		// 构造函数的私有属性, 只能函数自己访问
		Factory.selfFn = function () {};
		
		// 公共属性
		Factory.prototype = {
			fn : function () {
				console.log(this); // this执行实例化对象
			}
		};
		
		var f1 = new Factory();
		var f2 = new Factory();
		
		所以,创建一个类的时候
			不同的部分, 每个实例对象都不一样的部分, 放在构造函数里面
			相同的部分, 每个实例对象都可以访问的部分, 放在原型里面
			
		注: 在构造函数中或者原型中, this指向的都是该实例化对象本身
			
### 4. 原型链 
![原型图解](https://github.com/l511407563/Interview/blob/master/javascript/image/proto.jpg)<br>
	访问某对象的方法
		function Factory() {}
		var f = new Factory();
		f.fn();
		
		原型链:
			先在实例化对象f自身查找fn
			然后到f的构造函数的原型中找fn
			然后到Object.prototype中找fn
			都找不到返回undefine
		
		一个对象在访问某属性时会先从自身查找, 找不到再去上一层的prototype找, 直到Object.prototype
	
### 5. prototype 和 __proto__
	每一个对象的__proto__就是该对象的构造函数的prototype
	
	function Father() {}
	
	Father.prototype = {};
	
	var son = new Father();
	
	son.__proto__ === Father.prototype;
	
	son.__proto__.__proto__ === Object.prototype;
	
### 6. instanceof 和 typeof
	instanceof 
		a instanceof b 相当于 在a的__proto__上可以找到b.prototype
		
	typeof 
		数据类型判断
		
### 7. 原型继承的几种方式
在理解继承之前, 你需要理解 new prototype 构造函数和实例化对象的区别与联系 原型链 

	先创建一个父类
		function Father(param) {
			this.param = param;
		}
		
		function Mother(param) {
			this.param = param;
		}
		
		Father.prototype = {};
		Mother.prototype = {};

	7-1 原型继承(对象继承)
		function Son() {};
		
		// 这里不能直接使用 Son.prototype = Father.prototype, 否则修改Son.prototype上的方法会改变Father.prototype上的
		Son.prototype = new Father();
	
		首先, 原型是一个对象, 它是不能传参的, 所以原型继承不能传参
		第二, new所产生的Father的实例化对象中, 都含有Father构造函数中的方法, 也有Father.prototype上的方法
		第三, 由于每一次new都会产生一个新的实例化对象, 互不影响, 所以原型继承的方法是可以复用的
		第四, 只能实现单继承, 继承Father或者Mother的实例
		
		总结: 原型继承, 不能传参, 父类构造函数(其实是从父类实例化对象上继承的,而不是直接从父类构造函数上继承的)和prototype中的方法都继承到了, 可以复用, 无法实现多继承
		
	7-2 构造函数继承(函数继承)
		function Son(param) {
			Father.call(this);
			Mother.call(this);
		}
		
		var son1 = new Son();
		var son2 = new Son();
		
		首先, 构造函数是一个函数, 是可以传参的, 所以构造函数可以传参
		第二, 无法继承父类prototype属性方法
		第三, 无法复用, 每个子类都生成一个父类实例, 消耗性能
		
		总结: 构造函数继承, 可以传参, 不能继承原型, 无法复用, 可以实现多继承
		
	7-3 组合继承
		function Son(param) {
			Father.call(this);
			Mother.call(this);
		}
		
		Son.prototype = new Father(); // 原型继承会导致子类构造函数指向父类实例
		
		Son.prototype.constructor = Son; // 修复子类构造函数的指向
		
		首页, 可以传参
		第二, 可以继承函数和原型中的方法
		第三, 可以实现多继承
		第四, 结合7-1和7-2可以发现, 继承了两次构造函数(实际上是从实例化对象上继承的)中的方法, 一次原型中的方法, 消耗资源
		第五, 原型继承会导致子类构造函数指向父类实例, 需要修复子类构造函数的指向
		
		总结: 组合继承可以传参, 可以继承所有方法, 可以多继承, 但是构造函数中的方法继承了两次
		
	7-4 寄生组合继承
		function Son(param) {
			Father.call(this);
			Mother.call(this);
		}
		
		// 中介
		function F() {}
		F.prototype = Father.prototype;
		
		Son.prototype = new F();
		
		中介的作用: 通过中介只继承父类的prototype, 减少了多余的构造函数中的方法, 因为call已经继承了一次
		总结: 拥有以上三个继承所有的优点, 并且解决了构造函数方法继承了两次的问题

### 8. 判断的5种实现方法
[demo链接](https://github.com/l511407563/Interview/blob/master/javascript/判断的5种实现方式.html)

	if else
	switch case
	三目运算 ? :
	与或非 && ||
	对象 {}[]
##### if判断 <br>
![](https://github.com/l511407563/Interview/blob/master/javascript/image/判断1.png)	<br>
##### switch判断 <br>
![](https://github.com/l511407563/Interview/blob/master/javascript/image/判断2.png)	<br>
##### 三目运算 <br>
![](https://github.com/l511407563/Interview/blob/master/javascript/image/判断3.png)	<br>
##### 与或非 <br>
![](https://github.com/l511407563/Interview/blob/master/javascript/image/判断4.png)	<br>
##### 对象  <br>
![](https://github.com/l511407563/Interview/blob/master/javascript/image/判断5.png)	<br>

### 9. 缓存
[demo链接](https://github.com/l511407563/Interview/blob/master/javascript/缓存的5种实现方式.html)
各种缓存以及各自对数据的存、取、清除等方法

	1. sessionStorage
		优点: 临时存储神器, 关闭页面标签自动回收, 不可以跨页面交互
		缺点: 临时, 不能存储持久化数据
		兼容性: 标准浏览器和高版本IE
		存:
			sessionStorage.setItem("key", "value");
		取:
			sessionStorage.getItem("key");
			sessionStorage.key;
		清除:
			sessionStorage.clear();
	
	2. localStorage	
		优点: 兼容性中等, 操作简单, key-value形式
		缺点: 存在大小限制以及兼容性问题
		兼容性: IE10及其以下不兼容
		存:
			localStorage.setItem("key", "value");
		取:
			localStorage.getItem("key");
			localStorage.key;
		清除:
			localStorage.clear();
			
	3. userData
		缺点: 
			信任站点与不信任站点大小限制不一样
			信任站点: 存储限制太小, 单个文件限制128KB, 一个域名下总共可以保存1024KB的文件
			受限站点: 单个文件限制64KB, 一个域名下总共可以保存640KB的文件
		兼容性: IE专用缓存
			
	4. Cookie
		优点: 
		缺点: 大小有限制, 每次发送请求, 都会加在请求头里发给服务器, 如果cookie大了, 那么就会非常耗费性能
		
		兼容性: 兼容性最好的本地存储, 几乎所有的浏览器都支持

	5. openDatabase(IndexDB)
		优点: 相当于一个完整的数据库, 功能最强大, 没有什么它做不了的事情
		缺点: 对于前端学习成本高
		兼容性: 标准浏览器
##### sessionStorage
![](https://github.com/l511407563/Interview/blob/master/javascript/image/sessionStorage.png)	<br>
##### localStorage
![](https://github.com/l511407563/Interview/blob/master/javascript/image/localStorage.png)	<br>
##### IndexDB
![](https://github.com/l511407563/Interview/blob/master/javascript/image/IndexDB.png)	<br>
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	




		


	


























	

