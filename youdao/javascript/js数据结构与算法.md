##### 目录
    1. javascript特性
    2. 数组 
    3. 列表 
    4. 栈   
    5. 队列 
    6. 链表
    7. 字典
    8. 散列表和散列算法
    9. 集合
    10. 二叉树和二叉查找树
    11. 图和图的算法
    12. 转向算法
    13. 查找算法
    14. 高级算法-动态规划和贪心算法
    
##### js shell安装
    http://ftp.mozilla.org/pub/firefox/nightly/latest-oak/
    
##### 1. javascript特性
    判断 
        1. 自定义判断  可全等===  可数值相等==
        if () {
            
        } else {
            
        }
        
        2. 全等判断
        switch () {
            case xxx:
                break;
            default: xxx:
                xxx;
        }
        
    循环
        1. 希望按执行次数执行一组语句
        for () {
            
        }
        
        2. 希望条件为真时执行一组语句
        while () {  
            
        }
        
    函数
        1. 有返回值 ---> 为了得到返回值
        function x() {
            return xxx;
        }
        var a = x();
        
        2. 无返回值 ---> 为了执行函数中的操作
        function x() {
            
        }
        x();
        
        js中, 函数的参数传递都是按值传递, 没有按引用传递的参数
        但是有保存引用的对象, 如数组
        
    作用域
        // 变量声明的作用域才是变量的真实作用域
        var a = function () {
            
        };
        
        function b() {
            a();    // 调用变量的作用域并不是变量的真实作用域
        }
        
    递归
        // 自己调用自己
        function a(num) {
            if (num == 1) {
                retunr num;
            } else {
                return num * a(num - 1); 
            }
        }
        a(5);
        
        注意: 递归深度超出了js的处理能力, 就需要改写成迭代式的程序来解决问题
        
##### 2. 数组
    定义: 一个存储元素的线性集合
    javascript中的数组和其他语言不一样, 是一种特殊的对象, 效率不如其他语言的数组高.
    js的数组的索引在内部被转化成字符串类型, 也就是key, 因为js中对象的属性名必须是字符串.
    
    1. 数组赋值给数组
        1.1 浅复制(引用, 互相影响)
            由于js中的数组为一个特殊的对象, 所以数组的赋值为引用赋值, 如果修改了原始数组, 会影响被赋值的数组.
        例子:
            var arr = [];
            for (var i = 0; i < 10; i++) {
                arr[i] = i + 1;
            }
            var arr2 = arr;
            arr[0] = 400;
            console.log(arr2[0]);   // 400
            
        1.2 深复制(只复制值, 互不影响)
            可以解决浅复制的问题
            function copy(arr1, arr2) {
                for (var i = 0; i < 10; i++) {
                    arr2[i] = arr1[i];
                }
            }
            
            var arr = [];
            for (var i = 0; i < 10; i++) {
                arr[i] = i + 1;
            }
            var arr2 = [];
            copy(arr, arr2);
            arr[0] = 400;
            console.log(arr2[0]);   // 1
            
        1.3 深复制的特殊方法(可以代替1.2)
            JSON.parse(JSON.stringify(obj))
        
            
    2. 操作数组
        2.1 concat()    
            合并多个数组创建一个新数组

            var arr1 = [1, 2, 3];
            var arr2 = [4, 5, 6];
            var arr3 = [7, 8, 9];
            var arr = arr1.concat(arr2, arr3);
            console.log(arr)    // [1, 2, 3, 4, 5, 6, 7, 8, 9]

        2.2 splice()
            截取一个数组的子集创建一个新数组, 可增, 可截取, 可删
            注意: 会改变原数组
            
            增
                var arr1 = [1, 2, 3, 4, 5];
                arr1.splice(1, 0, 6, 7, 8);       
                console.log(arr1);   // [1, 6, 7, 8, 2, 3, 4, 5] 从索引1开始, 删除0个元素, 插入6,7,8    
            
            截取
                var arr1 = [1, 2, 3, 4, 5];
                var arr2 = arr1.splice(1, 2);    
                console.log(arr2);   // [2, 3]     从索引1开始截取2位
                console.log(arr1);   // [1, 4, 5]  改变原数组
            
            删
                var arr1 = [1, 2, 3, 4, 5];
                arr1.splice(1, 2,);       
                console.log(arr1);   // [1, 4, 5]  从索引1开始删除2位
                
        2.3 为数组添加元素
            从后加
                arr.push()
                
            从前加
                arr.unshift()
        
        2.4 从数组中删除元素
            从后删
                arr.pop()
            
            从前删
                arr.shift()
                
        2.5 数组顺序翻转
            arr.reverse()

        2.6 数组排序
            // 按字典顺序对元素进行排序
            arr.sort()  
            
            var arr = [3, 1, 2, 108, 4, 200];
            arr.sort();
            console.log(arr);    // [1, 108, 2, 200, 3, 4]
            
            // 按数字大小进行排序
            function compare(num1, num2) {
               return num1 - num2;
            }
    
            var arr = [3, 1, 2, 108, 4, 200];
            arr.sort(compare);
            console.log(arr);    // [1, 2, 3, 4, 108, 200]    
            
        2.7 迭代器方法(对数组进行循环操作)
            迭代器方法对数组中的每个元素应用一个函数, 可以返回一个值, 一组值, 或者一个新数组
            
            不产生新数组的迭代器    forEach
            返回一个布尔值          every, some
            返回一个值              reduce
            返回一个新数组          map, filter
                
            
        
            
        






































            
                