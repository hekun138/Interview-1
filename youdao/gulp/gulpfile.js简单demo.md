##### gulpfile.js
    var gulp = require('gulp');
    var babel = require('gulp-babel');
    var uglify = require('gulp-uglify');
    var minify = require('gulp-minify-css');
    var htmlmin = require('gulp-htmlmin');
    var del = require('del');
    
    
    var distDir = './dist';
    
    // 打包任务
    var task = {
        // 压缩js
        minjs: function () {
            var path = ['./src/**/*.js'];
            return gulp.src(path)
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(uglify().on('err', function (err) {
                console.log('压缩js, 抛出异常: ' + err);
            }))
            .pipe(gulp.dest(distDir));
        },
    
        // 压缩css
        mincss: function () {
            var path = ['./src/**/*.css'];
            return gulp.src(path)
            .pipe(minify({ compatibility: 'ie7' })).on('err', function (err) {
                console.log('压缩css, 抛出异常: ' + err);
            })
            .pipe(gulp.dest(distDir));
        },
    
        // 压缩html
        minhtml: function () {
            var path = ['./src/**/*.html'];
            return gulp.src(path)
            .pipe(htmlmin({ collapseWhitespace: true })).on('err', function (err) {
                console.log('压缩html, 抛出异常: ' + err);
            })
            .pipe(gulp.dest(distDir));
        }
    };
    
    // 清理
    gulp.task('clear', function (cb) {
        return del(['./dist/*'], cb);
    });
    
    // 打包
    gulp.task('default', ['clear'], function () {
        for (var i in task) {
            task[i]();
        }
    });


