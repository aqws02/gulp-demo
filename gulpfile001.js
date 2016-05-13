var gulp = require('gulp');
var gutil = require('gulp-util');
//var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
//var sh = require('shelljs');
var uglify = require('gulp-uglify');
//var templateCache = require('gulp-angular-templatecache');

//合并js
gulp.task('libs',function(){
    gulp.src('./www/js/**/*.js')
        .pipe(concat("libs.js"))    //www/js下所有的js文件 合并到libs.js
        .pipe(gulp.dest("./www/lib/"))  //合并后文件放入目标文件夹
        .pipe(uglify())                   //混淆文件
        .pipe(rename("libs.min.js"))    //重命名
        .pipe(gulp.dest('./output/www/lib/'))       //将混淆后文件放入目标文件夹
})
//合并css  用scss注意所有css文件后缀为scss
gulp.task('sass', function(done) {
  gulp.src('./www/css/app.scss')    //定义css统一入口app.scss文件  里面导入其他css文件（导入方式见图3图4）。
    .pipe(sass())                       //合并
    .pipe(gulp.dest('./www/lib/'))   //合并后放入目标文件夹
    .pipe(minifyCss({                   //混淆
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))  //混淆后加后缀
    .pipe(gulp.dest('./output/www/lib/'))  //混淆文件放入目标文件夹
    .on('end', done);
});
