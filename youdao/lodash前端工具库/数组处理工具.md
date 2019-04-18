##### 1. 均匀分割数组 (lodash.chunk)
    import lodash from 'lodash';
    let arr = [1, 2, 3, 4, 5, 6, 7, 8];
    // 将数组arr 以3个元素为一组均分，多余的放到最后一组
    lodash.chunk(arr, 3); // [[1,2,3], [4,5,6], [7,8]]
    
##### 2. 删除数组中所有的 false、null、0、''、undefined、NaN (lodash.compact)
    import lodash from 'lodash';
    lodash.compact([0, 1, false, 2, '', 3]); // [1,2,3]
    
##### 3. 将任意值组成新的数组 (lodash.concat)
    import lodash from 'lodash';
    lodash.concat([1, 2], 0, [[4]], {a: 1, b: 2}); // [1, 2, 0, [4], {a: 1, b: 2}]
    
##### 4. 去重第一个数组 (lodash.difference)
    import lodash from 'lodash';
    lodash.difference([2, 1, 3, 6], [2, 3, 4, 5]) // [1, 6]
    
##### 5. 规则去重 (lodash.differenceBy)

##### 6. 规则去重 (lodash.differenceWith)

##### 7. 从前截取数组 (lodash.drop)
    // 从0位开始，删除指定个数元素(默认删除首位一个元素)，返回剩下的
    import lodash from 'lodash';

    lodash.drop([1, 2, 3]);
    // => [2, 3]
     
    lodash.drop([1, 2, 3], 2);
    // => [3]
     
    lodash.drop([1, 2, 3], 5);
    // => []
     
    lodash.drop([1, 2, 3], 0);
    // => [1, 2, 3]

##### 8. 从后截取数组 (lodash.dropRight)
    // 从末位开始，删除指定个数元素(默认删除末位一个元素)，返回剩下的
    import lodash from 'lodash';
    
    lodash.dropRight([1, 2, 3]);
    // => [1, 2]
     
    lodash.dropRight([1, 2, 3], 2);
    // => [1]
     
    lodash.dropRight([1, 2, 3], 5);
    // => []
     
    lodash.dropRight([1, 2, 3], 0);
    // => [1, 2, 3]
    
##### 9. 删除数组中指定对象 (lodash.dropRightWhile)
    import lodash from 'lodash';
    
    let users = [
        { 'user': 'barney',  'active': true },
        { 'user': 'fred',    'active': false },
        { 'user': 'pebbles', 'active': false }
    ];
    
    // 删除数组中 active == false 的对象
    lodash.dropRightWhile(users, function(o) { return !o.active; });
    // => [{ 'user': 'barney',  'active': true }]
     
    // 删除数组中 user === 'pebbles' && active == false 的对象
    lodash.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
    // => objects for ['barney', 'fred']
     
    // 删除active == false 的对象
    lodash.dropRightWhile(users, ['active', false]);
    // => objects for ['barney']

##### 10.  (lodash.dropWhile)

##### 11. 替换数组中的元素 (lodash.fill)

##### 12. 查找指定元素的位置 (lodash.findIndex)

##### 13. 查找指定元素的位置 (lodash.findLastIndex)

##### 14. 获取第一个元素 (lodash.head)

##### 15. 递归展开二维数组(lodash.flatten)

##### 16. 递归展开所有维度的数组(lodash.flattenDeep)

##### 17. 递归展开指定维度的数组(lodash.flattenDepth)

##### 18. 将二维数组中只有两个元素的数组转换成对象(lodash.fromPairs)

##### 19. 查找数组中第几位指定元素出现的位置(lodash.indexOf)
    import lodash from 'lodash.indexOf';
    
    // 查找数组中第一个2出现的位置
    lodash.indexOf([1, 2, 1, 2], 2);
    // => 1
     
    // 查找数组中第二个2出现的位置
    lodash.indexOf([1, 2, 1, 2], 2, 2);
    // => 3
    
##### 20. 删除数组中最后一个元素(lodash.initial)

##### 21. 去除多个数组中重复的元素(lodash.intersection)

##### 22. 获取数组中最后一个元素(lodash.last)

##### 23. 删除数组中指定位置的元素(lodash.pullAt)

##### 24. 删除数组中指定元素