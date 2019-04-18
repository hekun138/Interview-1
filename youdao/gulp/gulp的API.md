#####  gulp.src()  指定要操作的文件
    gulp.src(glob, [options])
    gulp.src(globs, [options])
    
    glob: 要操作的文件
    option: 要传给glob的参数
    
#####  gulp.dest() 输出文件
    gulp.dest(path, [option])
    
    path: 输出路径
    
#####  gulp.task()   定义一个gulp任务
    gulp.task(name, [dev], fn)
    
    name 当前gulp任务的名字
    dev  依赖, 一个包含任务列表的数组, 这些任务会在当前gulp任务运行之前完成
    fn   任务具体操作
    
    gulp.task('default') 默认执行任务default 
    
##### gulp.watch()  监听文件改变
    var watcher = gulp.watch(glob, [option, callback], tasks)
    watcher.on('change', function(e) {
         
    });
    
    glob: 要监听的文件
    option:     参数
    callback:  回调
    tasks: 文件改变要触发的任务
    
    
##### .pipe()
    管道符： 将文件或者执行结果传到后面继续执行
    gulp.src().pipe().pipe().pipe()