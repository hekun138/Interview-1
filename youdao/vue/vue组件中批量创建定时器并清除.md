#### 适用于在遍历生成的组件中使用多个定时器数组
```
  export default {
      data() {
        return {
          timers1: [],  // 保存批量定时器1
          timers2: [], // 保存批量定时器2
        }
      },
      methods: {
        // 1. 批量创建定时器
        createFn(code) {
          let arr = [1,2,3,4,5,6,7,8,9,10];
          let timesArr = [];
          let delay = 0;
          let timer;
          arr.forEach(item => {
            delay += 1000;
            timer = setTimeout(() => {
              // ...
            }, delay);
            // 保存所有循环生成的定时器
            timesArr.push(timer);
          });
          // 不在循环里直接使用 this.timers(timer); 来保存定时器，防止vue报错，无限重新触发组件渲染
          if (code == 1) {
            this.timers1 = timesArr;
          }
          if (code == 2) {
            this.timers2 = timesArr;
          }
        }
      },
      // 2. 批量清空定时器
      clearFn(code) {
        if (code == 1) {
          this.timers1.forEach(item => {
            clearTimeout(item);
          });
        }
        if (code == 2) {
          this.timers2.forEach(item => {
            clearTimeout(item);
          });
        }

      }
  }
  
  
```
