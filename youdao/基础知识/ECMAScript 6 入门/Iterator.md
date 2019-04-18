##### Iterator 迭代器
    iterator接口是一个类似链表结构的接口，为了让数据可以使用for...of循环遍历
    一个数据结构只要部署了Symbol.iterator属性，就被视为具有 iterator 接口，就可以用for...of循环遍历它的成员。
    也就是说，for...of循环内部调用的是数据结构的Symbol.iterator方法。
    
    xxx: {
        Symbol: {
            iterator: function () {}
        }
    }
    
    作用：
        默认拥有iterator函数的数据，可以使用 var x = xxx[Symbol.iterator]()来调用迭代器方法，
        然后使用 x.next() 来改变x的指针
    
    es6默认有Symbol.iterator属性的数据结构，都是部署了遍历器接口函数，都可以使用for...of遍历
    es6原生具备iterator接口的数据：
        Array
        Map
        Set
        String
        TypeArray
        函数的arguments对象
        NodeList对象
        
    数组iterator例子
        let arr = ['a', 'b', 'c'];
        // 获取数组的遍历器函数并且调用
        let iter = arr[Symbol.interator]()
        // 使用遍历器的链表指针功能
        iter.next() // { value: 'a', done: false }
        iter.next() // { value: 'b', done: false }
        iter.next() // { value: 'c', done: false }
        iter.next() // { value: undefined, done: true }
        
##### 为什么对象没有提供遍历器接口
    因为对象是非线性数据结构，元素没有先后之分，而遍历器处理的数据结构为线性数据结构，元素有前后之分
    
    对象（Object）之所以没有默认部署 Iterator 接口，是因为对象的哪个属性先遍历，
    哪个属性后遍历是不确定的，需要开发者手动指定。
    本质上，遍历器是一种线性处理，对于任何非线性的数据结构，
    部署遍历器接口，就等于部署一种线性转换。不过，严格地说，对象部署遍历器接口并不是很必要，因为这时对象实际上被当作 Map 结构使用，ES5 没有 Map 结构，而 ES6 原生提供了。
    
    一个对象如果要具备可被for...of循环调用的 Iterator 接口，
    就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。
    
##### 调用iterator的场合
    1. for...of
    
    2. 解构赋值
        let [x, y] = set;
        或 let [first, ...rest] = set;
        
    3. 扩展运算符
        [...str]
        [...arr]
        
    4. yield*
        yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
        let generator = function* () {
            yield 1;
            yield* [2,3,4];
            yield 5;
        };
        
        var iterator = generator();
        
        iterator.next() // { value: 1, done: false }
        iterator.next() // { value: 2, done: false }
        iterator.next() // { value: 3, done: false }
        iterator.next() // { value: 4, done: false }
        iterator.next() // { value: 5, done: false }
        iterator.next() // { value: undefined, done: true }
        
##### Iterator 和 Generator函数
    Iterator的最简单实现方式是用Generator函数, 因为Generator函数默认返回了一个链表数据结构
    
    第一种写法
        let obj = {
            [Symbol.iterator]: function* () {
                yield: 1;
                yield: 2;
                yield: 3;
            }
        };
        [...obj]    // [1, 2, 3]
    
    第二种写法
        let obj = {
          * [Symbol.iterator]() {
            yield 'hello';
            yield 'world';
          }
        };
        
        for (let x of obj) {
          console.log(x);
        }
    
##### 案例解析
    // 注意，不是所有Node节点都有iterator接口
    // 只有 Node.childNodes 和 document.querySelectorAll() 返回的NodeList实例对象，才有iterator接口，它们都是类数组对象
    var ul = document.getElementById('ul'); // ul无iterator接口, ul.childNodes 和 document.querySelectorAll('ul') 有iterator接口
    var arr = [];           // 有
    var set = new Set();    // 有
    var map = new Map();    // 有
    var str = new String(); // 有
    var obj = {};           // 无
    var num = new Number(); // 无
    var fn = new Function();// 无
    
    // Symbol.iterator方法，指向对象的默认遍历器方法(也就是该原生js对象自带的遍历方法)
    var MAYBE_ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
    // 不存在Symbol.iterator方法的时候备用
    var FAUX_ITERATOR_SYMBOL = '@@iterator';

    // 获取遍历器函数
    function getIteratorFn(maybeIterable) {
        // 传入的对象如果是 null 或者不是一个 对象类型，不处理
        if (maybeIterable === null || typeof maybeIterable !== 'object') {
            return null;
        }
        // 如果传入对象有默认遍历器方法，否则使用 '@@iterator'
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === 'function') {
            return maybeIterator;
        }
        return null;
    }
    
    // 1. 判断一个对象是否有iterator接口
    console.log('NodeList: ', getIteratorFn(ul.childNodes));    // 有
    console.log('array: ', getIteratorFn(arr));         // 有
    console.log('set: ', getIteratorFn(set));           // 有
    console.log('map: ', getIteratorFn(map));           // 有
    console.log('string: ', getIteratorFn(str));        // 有
    console.log('object: ', getIteratorFn(obj));        // 无
    console.log('number: ', getIteratorFn(num));        // 无
    console.log('function: ', getIteratorFn(fn));       // 无

    // 2. 拥有iterator接口的对象可以使用的方法
    // 2.1  for...of
    for (var i in ul.childNodes) {
        console.log(i)
    }

    // 2.2  解构赋值
    let { keys } = ul.childNodes;
    console.log(keys);

    // 2.3  扩展运算符
    console.log([...ul.childNodes])

    // 2.4  yeild*
    // yield* 后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。
    let generator = function* () {
        yield 1;
        yield* [2,3,4];
        yield 5;
    };
    
    var iterator = generator();
    
    console.log(iterator.next()) // { value: 1, done: false }
    console.log(iterator.next()) // { value: 2, done: false }
    console.log(iterator.next()) // { value: 3, done: false }
    console.log(iterator.next()) // { value: 4, done: false }
    console.log(iterator.next()) // { value: 5, done: false }
    console.log(iterator.next()) // { value: undefined, done: true }

    
    
    
    
    
    
    
    
    
    
    
    
    























  