##### 知识点
    setTimeout(callback, time)	延时器
    clearTimeout()	清除延时器
    
    setInterval(callback, time)	循环器
    clearInterval()	清除循环器
    
    requestAnimationFrame(callback)	
    cancelAnimationFrame()
    
    知识点:
    	1. 如何给requestAnimationFrame的回调函数传参
    	2. 如何清除requestAnimationFrame
    	3. 兼容性处理
    	
##### 代码实例
    // 1. 传参
    var param = "给requestAnimationFrame的回调函数传参";
    var animation;
    // 这才是requestAnimationFrame真正的回调函数
    function callback(param) {
        console.log(param);
        window.requestAnimationFrame(F(param));
    }
    // 创建一个中间函数，用于返回一个无参数函数, 里面是带有参数的回调函数
    function F(param) {
        return function () {
            callback(param);
        }
    }
    animation = window.requestAnimationFrame(F(param));
    // window.setInterval(F(param), 3000);
    
    // 2. 清除requestAnimationFrame
    window.cancelAnimationFrame(animation);
    
    // 3. requestAnimationFrame 和 cancelAnimationFrame 兼容性处理
    (function () {
        var lastTime = 0;
        var vendors = ['webkit', 'moz'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
            window.cancelAnimationFrame =
                window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
        }
        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function (callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                    timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };
        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function (id) {
                clearTimeout(id);
            };
    }());