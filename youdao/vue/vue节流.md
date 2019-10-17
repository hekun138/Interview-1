#### 节流
```
    window.throttle = function (fn, delay) {
      var lastTime;
      var timer;
      var delay = delay || 1000;
      return function() {
          var args = arguments;
          // 记录当前函数触发的时间
          var nowTime = Date.now();
          if (lastTime && nowTime - lastTime < delay) {
              clearTimeout(timer);
              timer = setTimeout(function () {
                  // 记录上一次函数触发的时间
                  lastTime = nowTime;
                  // 修正this指向问题
                  fn.apply(this, args);
              }, delay);
          } else {
              lastTime = nowTime;
              fn.apply(this, args);
          }
      }
  }
  
  methods: {
    fn: throttle(function (params) {
      // ...
    }, delay)
  }


```
