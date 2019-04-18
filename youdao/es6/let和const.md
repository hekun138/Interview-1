##### let 
    let用于生命一个块级变量, 并且不能重复声明
    for (let i = 0; i < 10; i++) {
        setTimeout(function () {
            console.log(i)
        }, 30);
    }
    
##### const
    const声明一个只读常量, 常量的内存地址不能改变
    
##### 全局常量和线程安全
    在let和const之间，建议优先使用const，尤其是在全局环境，不应该设置变量，只应设置常量。
    
##### 单行定义的对象，最后一个成员不以逗号结尾。多行定义的对象，最后一个成员以逗号结尾。
    // good
    const a = { k1: v1, k2: v2 };
    const b = {
      k1: v1,
      k2: v2,
    };
