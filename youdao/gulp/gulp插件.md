##### gulp-babel    解析es6
    npm i --save-dev gulp-babel
    <!-- 依赖 -->
    npm i --save-dev babel-core
    npm i --save-dev babel-preset-env
    
    var babel = require('gulp-babel');
    
    gulp.src('/').pipe(babel({
        presets: ['env']
    })).pipe()
    
##### gulp-uglify    js压缩
    npm i --save-dev gulp-uglify
    
    var uglify = require('gulp-uglify');
    
    gulp.src('/').pipe(babel({
        presets: ['env']
    })).pipe(uglify())
    
##### gulp-minify-css   css压缩
    npm i --save-dev gulp-minify-css
    
    var minify = require('gulp-minify-css'); 
    
    gulp.src('/').pipe(minify())
    
##### gulp-htmlmin  html压缩
    npm i --save-dev gulp-htmlmin
    
    var htmlmin = require('gulp-htmlmin');
    
    gulp.src('/').pipe(htmlmin())
    
##### gulp-concat 合并js文件
    
##### gulp-rename 修改文件名
    
##### gulp-replace 生成新文件

##### gulp-header   添加版本号

##### del   删除文件
    
    