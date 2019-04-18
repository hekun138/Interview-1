##### 1. 请解释事件代理 (event delegation)。
    答案：https://www.cnblogs.com/liugang-vip/p/5616484.html
    事件代理(也叫事件代理), 利用事件冒泡的特性, 将事件委托给父元素(或外层元素);
    
    为什么要用事件委托：
        在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，因为需要不断的与dom节点进行交互，
        访问dom的次数越多，引起浏览器重绘与重排的次数也就越多，就会延长整个页面的交互就绪时间，
        这就是为什么性能优化的主要思想之一就是减少DOM操作的原因；如果要用事件委托，就会将所有的操作放到js程序里面，
        与dom的操作就只需要交互一次，这样就能大大的减少与dom的交互次数，提高性能；
    
    事件委托的原理：
        事件委托是利用事件的冒泡原理来实现的，何为事件冒泡呢？就是事件从最深的节点开始，然后逐步向上传播事件
        
    例子：
    <ul id="box">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
    </ul>
    
    var box = document.getElementById('box');
    // 事件委托(事件代理)
    box.onclick = function (e) {
        var e = e || window.event;
        var target = e.target || e.srcElement;
        if (target.nodeName.toLowerCase() == "li") {
            console.log(target.innerHTML);
        }
    }
    
    总结：
        那什么样的事件可以用事件委托，什么样的事件不可以用呢？

        适合用事件委托的事件：click，mousedown，mouseup，keydown，keyup，keypress。
        
        值得注意的是，mouseover和mouseout虽然也有事件冒泡，但是处理它们的时候需要特别的注意，因为需要经常计算它们的位置，处理起来不太容易。
        
        不适合的就有很多了，举个例子，mousemove，每次都要计算它的位置，非常不好把控，在不如说focus，blur之类的，本身就没用冒泡的特性，自然就不能用事件委托了。
        
    
    
##### 2. 请解释 JavaScript 中 this 是如何工作的。
    调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。除了声明时定义的形式参数，每个函数还接收两个附加的参数：this和arguments。
    在JavaScript中一个有4中调用模式：方法调用模式、函数调用模式、构造器调用模式和apply调用模式。这些模式在如何初始化关键参数this上存在差异。
    
    结论：
        方法调用模式(对象的方法), this绑定在该对象上
        函数调用模式, this绑定在window全局对象上
        构造函数调用模式, this绑定在该构造函数的实例化对象上
        call和apply,bind调用模式, this绑定在人为指定的对象上
    
    实例：
        // 1. 方法调用模式, 当对象的方法被调用时, this绑定到该对象上
        var obj = {
            a: function () {
                console.log(this); // obj
            }
        };
        // obj.a();
        /*
                方法可以使用this访问自己所属的对象，所以它能从对象中取值或对对象进行修改。
            this到对象的绑定发生在调用的时候。这个“超级”延迟绑定(very late binding)使得函数可以对this高度复用。
            通过this可以取得它们所属对象的上下文的方法称为公共方法(public method)。
        */

        // 2.函数调用模式   当函数被调用时, (此时为window全局对象的一个方法), this绑定在window上, 本质和第一种一样
        function aaa() {
            console.log(this);
        }
        // aaa();
        /* 
            当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用的：以此模式调用函数时，this被绑定到全局对象。
            上面写法可以翻译如下
            window = {
                ...otherMethod,
                aaa: function () {
                    console.log(this);
                }
            };
            window.aaa();
        */

        // 3. 构造器调用模式    使用new的方式调用, 此时this会绑定到该构造函数的一个新的实例化对象上
        function Abc() {
            this.a = function () {
                
            }
            console.log(this);  
            // 此时的this为构造函数Abc使用new实例化出来的一个新对象,这个新对象连接到了Abc的prototype对象上
            // 它复制了Abc的构造函数的所有属性方法, 也可以访问Abc.prototype上的所有属性方法
        }
        Abc.prototype = {
            b: function () {

            }
        }
        var abc = new Abc();

        // 4. call和apply以及bind调用模式   该模式由人为控制this的执行, this绑定在你选定的对象上
        //    call和apply的区别是, call传递参数为一个个参数, apply传递一个数组
        function a() {
           
        } 
        function b(n, m) {
            console.log(this);  // function a() {}
            console.log(n + m); // 3
        }
        b.call(a, 1, 2);
        b.apply(a, [1, 2]);




##### 3. 请解释原型继承 (prototypal inheritance) 的原理。
    什么是原型继承(prototypal inheritance)：
        当我们想从某个对象中读取一个property(属性方法), 但是该对象没有该property时,
        Javascript就会自动从该对象的prototype中读取该property, 这就叫原型继承。
    
    prototype的两个限制：
        1. 引用不能形成环状。
        2. proto的值要么是一个对象，要么是null。
        
    getters/setters方法：
        get:
        
        
        set:



##### 4. 你怎么看 AMD vs. CommonJS？
    AMD和CMD的区别：
        AMD的性能比CMD性能要好, 但是CMD依赖就近操作更方便, 随时随地引入依赖
    
        AMD的代表为requirejs
            思想：依赖前置
            define(['./a','./b'],function(a,b){
               a.doSomething()
               b.doSomething()
            })
        
        CMD的代表为seajs
            思想：依赖就近
            define(function(require, exports, module) {
              var a = require('./a')
              a.doSomething()
              var b = require('./b')
              b.doSomething()
            })

    硬依赖和软依赖：
        硬依赖为必须要的依赖，软依赖为需要判断条件之后才知道是否需要的依赖
        软依赖解决办法： 依赖前置+回调函数
        if(status){
          async(['a'],function(a){
            a.doSomething()
          })
        }

    AMD和CommonJS的区别：
        AMD为全部依赖前置
        CommonJS为硬依赖前置, 软依赖使用异步回调函数的形式


##### 5. 请解释为什么接下来这段代码不是 IIFE (立即调用的函数表达式)：function foo(){ }();.要做哪些改动使它变成 IIFE?

    

##### 6. 描述以下变量的区别：null，undefined 或 undeclared？该如何检测它们？





##### 7. 什么是闭包 (closure)，如何使用它，为什么要使用它？




##### 8. 请举出一个匿名函数的典型用例？





##### 9. 你是如何组织自己的代码？是使用模块模式，还是使用经典继承的方法？





##### 10. 请指出 JavaScript 宿主对象 (host objects) 和原生对象 (native objects) 的区别？





##### 11. 请指出以下代码的区别：function Person(){}、var person = Person()、var person = new Person()？





##### 12. .call 和 .apply 的区别是什么？
    call传参为一个个参数
    apply传参为一个数组




##### 13. 请解释 Function.prototype.bind？





##### 14. 在什么时候你会使用 document.write()？





##### 15. 请指出浏览器特性检测，特性推断和浏览器 UA 字符串嗅探的区别？





##### 16. 请尽可能详尽的解释 Ajax 的工作原理。





##### 17. 使用 Ajax 都有哪些优劣？





##### 18. 请解释 JSONP 的工作原理，以及它为什么不是真正的 Ajax。





##### 19. 你使用过 JavaScript 模板系统吗？如有使用过，请谈谈你都使用过哪些库？





##### 20. 请解释变量声明提升 (hoisting)。





##### 21. 请描述事件冒泡机制 (event bubbling)。





##### 22. "attribute" 和 "property" 的区别是什么？





##### 23. 为什么扩展 JavaScript 内置对象不是好的做法？





##### 24. 请指出 document load 和 document DOMContentLoaded 两个事件的区别。





##### 25. == 和 === 有什么不同？
    答案:
        == 数值相等
        === 全等 数值和类型相等
    
    
##### 26. 请解释 JavaScript 的同源策略 (same-origin policy)。





##### 27. 如何实现下列代码：
    [1,2,3,4,5].duplicator(); // [1,2,3,4,5,1,2,3,4,5]
    
    
    
    
    
##### 29. 什么是三元表达式 (Ternary expression)？“三元 (Ternary)” 表示什么意思？





##### 30. 什么是 "use strict"; ? 使用它的好处和坏处分别是什么？





##### 31.请实现一个遍历至 100 的 for loop 循环，在能被 3 整除时输出 "fizz"，在能被 5 整除时输出 "buzz"，在能同时被 3 和 5 整除时输出 "fizzbuzz"。





##### 32. 为何通常会认为保留网站现有的全局作用域 (global scope) 不去改变它，是较好的选择？





##### 33. 为何你会使用 load 之类的事件 (event)？此事件有缺点吗？你是否知道其他替代品，以及为何使用它们？





##### 34. 请解释什么是单页应用 (single page app), 以及如何使其对搜索引擎友好 (SEO-friendly)。





##### 35. 你使用过 Promises 及其 polyfills 吗? 请写出 Promise 的基本用法（ES6）。





##### 36. 使用 Promises 而非回调 (callbacks) 优缺点是什么？





##### 37. 使用一种可以编译成 JavaScript 的语言来写 JavaScript 代码有哪些优缺点？





##### 38. 你使用哪些工具和技术来调试 JavaScript 代码？





##### 39. 你会使用怎样的语言结构来遍历对象属性 (object properties) 和数组内容？





##### 40. 请解释可变 (mutable) 和不变 (immutable) 对象的区别。
    请举出 JavaScript 中一个不变性对象 (immutable object) 的例子？
    
    
    不变性 (immutability) 有哪些优缺点？
    
    
    如何用你自己的代码来实现不变性 (immutability)？
    
    
##### 41. 请解释同步 (synchronous) 和异步 (asynchronous) 函数的区别。





##### 42. 什么是事件循环 (event loop)？请问调用栈 (call stack) 和任务队列 (task queue) 的区别是什么？





##### 43. 解释 function foo() {} 与 var foo = function() {} 用法的区别





##### 44. 问题：foo的值是什么？
    var foo = 10 + '20';
    答案：  1020, 数字和字符串相加, + 变成连接符, 等号两边先转换成字符串, 其他运算符功能不变, 等号两边先隐式转换为数字, 然后进行运算
    var foo = 10 + '20';  //  1020
    var foo = 10 - '20';  //  -10
    var foo = 10 * '20';  //  200
    var foo = 10 / '20';  //  0.5
    var foo = 10 % '20';  //  10
    

##### 45. 问题：如何实现以下函数？
    add(2, 5); // 7
    add(2)(5); // 7
    答案：
    function add(x, y) {
        var sum = x;
        if (y) {
            return (sum + y);
        } else {
            var add2 = function (z) {
                return (sum + z);
            }
            return add2;
        }
    }
    
##### 46. 问题：下面的语句的返回值是什么？
    "i'm a lasagna hog".split("").reverse().join("");
    答案："goh angasal a m'i"
    作用： 字符串反序排列

##### 47. 问题：window.foo的值是什么？
    ( window.foo || ( window.foo = "bar" ) );
    答案："bar"
    运算符优先级:  () > ||
    

##### 48. 问题：下面两个 console 的结果是什么？
    var foo = "Hello";
    (function() {
      var bar = " World";
      console.log(foo + bar);   // "Hello World"
    })();
    console.log(foo + bar);     // bar is not defined
    
    var foo = "Hello";
    var bar;
    (function() {
      var bar = " World";
      console.log(foo + bar);   // "Hello World"
    })();
    console.log(foo + bar);     // "Helloundefined"
    
##### 49. 问题：foo.length的值是什么？
    var foo = [];
    foo.push(1);
    foo.push(2);
    答案： 2
    
##### 50. 问题：foo.x的值是什么？
    var foo = {n: 1};
    var bar = foo;
    foo.x = foo = {n: 2};
    // 1. 先执行 bar.x = foo.x
    // 2. 然后执行 foo = {n: 2}  这时候foo覆盖了原来的foo
    // 3. 最后执行bar.x = foo    原来的foo被覆盖了, 所以没有foo.x了 
    
##### 51. 问题：下面代码的输出是什么？
    console.log('one');
    setTimeout(function() {
      console.log('two');
    }, 0);
    console.log('three');
    
    答案：
    'one'
    'three'
    'two'
    原因： setTimeout 总在js队列空闲时执行(js普通队列完成 => setTimeout队列)
    浏览器中javascript是单线程(普通队列)的, 另外它还有一个setTimeout队列, 未执行的setTimeout队列就会按顺序放到setTimeout队列, 等待普通队列中的任务执行完才开始按顺序执行积累在setTimeout中的任务
    