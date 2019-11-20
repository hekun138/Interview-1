### webpack+es6项目导入createjs.md
```
  1. 安装相关工具
    npm install --save createjs
    npm install --save-dev imports-loader exports-loader
  2. webpack配置
    resolve: {
      alias: {
        createjs: path.resolve(__dirname, './node_modules/createjs/builds/1.0.0/createjs.min.js'),
      }
    },
  3. 加载
    import createjs from 'imports-loader?this=>window!exports-loader?window.createjs!createjs'
    console.log(createjs)
  4. 使用
    <canvas id="canvas"></canvas>
    var canvas = document.querySelector('#canvas');
    //创建舞台
    var stage = new createjs.Stage(canvas);
    console.log(stage);
    // //创建一个Shape对象，此处也可以创建文字Text,创建图片Bitmap
    var rect = new createjs.Shape();
    // //用画笔设置颜色，调用方法画矩形，矩形参数：x,y,w,h
    rect.graphics.beginFill("#f00").drawRect(0, 0, 100, 100);
    // //添加到舞台  
    stage.addChild(rect);
    // //刷新舞台
    stage.update();
    
```
