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

### 2. 原型
![原型链](https://github.com/l511407563/Interview/blob/master/javascript/image/proto.jpg)
