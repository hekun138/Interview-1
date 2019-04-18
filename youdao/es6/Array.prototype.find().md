 https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find

##### Array.prototype.find()
    find() 方法返回数组中满足测试的第一个元素的值。否则返回 undefined。
    var arr = ['a', 'b', 1, 2, 3];
    arr.find(key => key>1); // 2

    
##### Array.prototype.findIndex()
    findIndex() 方法返回数组中满足测试的第一个元素的索引。否则返回 -1。
    var arr = ['a', 'b', 1, 2, 3];
    arr.findIndex(key => key>1); // 3