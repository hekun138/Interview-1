##### promise和事件不同之处
    事件需要及时监听, 如果错过了, 再去监听, 等不到结果
    promise如果从pending变为fulfilled或者rejected, 此时成为resolved(已定型), 那么随时都可以从它的回调函数中获取结果
    
##### 执行的顺序
    let promise = new Promise((resolve, reject) => {
        console.log(1);
        resolve();
    });
    
    promise.then(() => {
        console.log(3);
    });
    
    console.log(2);
    
    promise被new创建的时候就会立即执行, 接着执行完当前脚本内所有的同步任务, 最后才执行resolve
    
##### 创建一个promise   resolve(成功) reject(失败) catch finally
    function promise(url) {
        return new Promise((resolve, reject) => {
            var img = new Image();

            img.onload = function () {
                resolve(img);
            }

            img.onerror = function () {
                reject(new Error('xxxx' + url));
            }

            img.src = url;
        });
    }
    
    promise('C:/Users/Administrator/Desktop/saga.png').then(res => {
        console.log(res);   // <img src="C:/Users/Administrator/Desktop/saga.png">
    }, err => {
        console.log(err);   // ...
    }).catch(error => {
        console.log(error); // ...
    }).finally(() => {
        console.log('finally')  // finally
    });
    
##### Promise.all()  和 Promise.race()
    Promise.all([p1, p2, p3]);      //  全部promise请求处理完之后
    Promise.race([p1, p2, p3]);     //  只要有一个promise请求返回结果就