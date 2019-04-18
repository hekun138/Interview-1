    // fn为domReady完成之后的回调函数
    function domReady(fn) { 
        // 标准浏览器
        if (document.addEventListener) {
            document.addEventListener("DOMContentLoaded", fn, false);
        } else {
            // IE
            IEContentLoaded(fn);
        }
        // IE
        function IEContentLoaded(fn) {
            var document = window.document;
            var done = false;
            // 只执行一次用户的回调函数init()
            var init = function () {
                if (!done) {
                    done = true;
                    fn();
                }
            };
            (function () {
                try {
                    //  DOM树未创建完之前调用doScroll会抛出错误
                    document.documentElement.doScroll('left');
                } catch(e) {
                    // 延迟再调用一次
                    // 在匿名递归函数中使用 arguments.callee, 递归函数必须能够引用它本身。很典型的，函数通过自己的名字调用自己
                    // 然而，匿名函数没有名称。因此如果没有可访问的变量指向该函数，唯一能引用它的方式就是通过 arguments.callee
                    setTimeout(arguments.callee, 50);
                    // 使用return实现递归
                    return;
                }
                init();
            })();
            // 监听document的加载状态
            document.onreadystatechange = function () {
                // 如果用户在domReady之后绑定的函数, 就立马执行
                if (document.readyState == 'complete') {
                    document.onreadystatechange = null;
                    init();
                }
            }
        }
    }