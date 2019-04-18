##### gulp项目搭建流程
    1. npm init
        初始化项目
        
    2. 全局安装gulp(这样才能使用gulp命令)
        npm i -g gulp
        
    3. 安装gulp到项目开发依赖(devDependencies)
        npm i gulp --save-dev
        
    4. 在项目根目录创建gulpfile.js文件(gulp命令会找到该文件执行)
        gulpfile.js文件内容
        
        // 引入gulp
        var gulp = require('gulp');
        
        gulp.task('任务名', funciton () {
            // 要执行的任务
        });
        
    5. 执行gulp