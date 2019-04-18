##### import 静态加载(编译时加载) 

    1. 传统的commonjs模块开发的 动态加载
        let { propA, propB }  = require('moduleA');
        原理: 先整体加载整个moduleA模块, 再查找它的属性propA 和 propB
        
    2. es6静态加载
        import { propA, propB } from 'moduleA';
        原理: 不加载moduleA模块, 只加载module中的propA和 propB方法
        
    3. 重命名
        import { propA as newPorpA } from 'moduleA';
        
    4. import里面的接口是只读的, 不能修改, 但是可以修改它内部的属性
    
    5. 由于import是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构。
    
    6. 整体加载
        export { moduleA, moduleB, moduleC};
        import * as Module from 'module'; 
        
    7. 加载默认模块
        export default module;
        import Module from 'module';
    
##### export 对外输出方法
    1. 输出单个方法
        export const a = 1;
        export const b = (data) => data;
    
    2. 输出多个方法
        export { a, b, c };
    
    3. 输出默认的方法
        export default c = 3;
    
    4. 重命名输出的方法
        function a () {}
    
        export {
            a as methdA
        }
        
##### module的加载
    1. defer  async (异步加载)
    在script标签中加山 defer 或者 async, 脚本就会异步加载, 渲染引擎不会等待它的下载和引擎, 边下载, 边执行后面的代码
        <script src="path/to/myModule.js" defer></script>
        <script src="path/to/myModule.js" async></script>
        
    区别:
        defer 渲染完整个DOM再执行, 
              有defer属性的脚本会按顺序执行
              
        async 下载完该脚本就立即执行
              有async的脚本不会按照顺序执行
              
    2. 加载es5 和 es6 模块
        es5:
            <script src="./foo.js"></script>
            
        es6:
            <script type="module" src="./foo.js"></script>
            
##### ES6 模块与 CommonJS 模块的差异
    1. CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
    
    2. CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。