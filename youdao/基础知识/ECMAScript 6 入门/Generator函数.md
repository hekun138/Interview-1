##### Generator 基本语法
    function* fn() {
        yield '1';
        yield '2';
        yield '3';
        return 'end';
    }
    
    const fn1 = fn();
    
    fn1.next(); // {value: '1', done: false}
    fn1.next(); // {value: '2', done: false}
    fn1.next(); // {value: '3', done: false}
    fn1.next(); // {value: 'end', done: true}
    fn1.next(); // {value: undefined, done: true}
    
    1. yeild 暂停
    
    2. next() 获取每一步的值
    
    3. return() 终结遍历Generator函数
    
    4. yeild* fn()  在一个Generator函数中调用另外一个Generator函数
    
    
##### 协程
    类似线程
    协程有点像函数，又有点像线程。它的运行流程大致如下。
    第一步，协程A开始执行。
    第二步，协程A执行到一半，进入暂停，执行权转移到协程B。
    第三步，（一段时间后）协程B交还执行权。
    第四步，协程A恢复执行。
    
##### thunk函数 
    传统意义上的thunk函数表示的是使用传名调用(比如c语言)，就是将参数放在一个临时函数中，
    再将这个临时函数传入函数体，这个临时函数就叫thunk函数，
    它的意义就是在函数体中使用到才计算，而不是计算完直接将值传入函数，可以节省性能
    
    javascript的thunk函数替换的不是表达式，而是多参数函数，将其替换成一个只接受回调函数作为参数的单参数函数。
    任何函数，只要参数有回调函数，就能写成 Thunk 函数的形式。
    它的意义就是在函数体中如果需要用到回调函数计算值并返回的情况下才使用thunk函数，而不需要使用的时候，就可以节省性能
    
##### Generator 和 Iterator对象
    https://www.cnblogs.com/wangfupeng1988/p/6532713.html
    
    Generator 和 Iterator对象都是类似链表的东西，
    Generator返回的也是 Iterator对象
    