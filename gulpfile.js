// var gulp = require('gulp');
// var webserver = require('gulp-webserver');
 
// gulp.task('webserver', function() {
//   gulp.src('app')
//     .pipe(webserver({
//       livereload: true,
//       directoryListing: true,
//       open: true,
//       path: 'app/'
//     }));
// });

//引入插件
var gulp = require('gulp'),
	contentIncluder = require('gulp-content-includer'),
	connect = require('gulp-connect'),
	rename = require('gulp-rename'),
	imagemin = require('gulp-imagemin'),       //图片压缩
	less = require('gulp-less'),
	LessPluginAutoPrefix = require('less-plugin-autoprefix');
	autoprefix = new LessPluginAutoPrefix({
	    browsers: ["last 5 versions"],
	    cascade: true
	});
	clean = require('gulp-clean');
var	inport = './app/', 
	getport = './www/';
var gulpArr = ['html', 'images', 'less'];
//创建watch任务去检测html文件,其定义了当html改动之后，去调用一个Gulp的Task
gulp.task('watch', function () {
  	gulp.watch(['./app/**.html','./app/less/**.less'], gulpArr);
});

//使用connect启动一个Web服务器
gulp.task('connect', function () {
  connect.server({
    root: getport,
    port: 18001,
    directoryListing: true,
    livereload: true
  });
});
// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(getport, {read: false})
        .pipe(clean());
});
gulp.task('concat',function() {
    gulp.src("./app/*.html")
        .pipe(contentIncluder({
            //includerReg:/<!\-\-\s*include\s+"([^"]+)"\-\->/g
        }))
        .pipe(rename('index.html'))
        .pipe(gulp.dest('./www/'));
});
gulp.task('html', function () {
	
	//gulp.start('clean');
	console.log("html-log")
  	gulp.src('./app/*.html')
  	.pipe(contentIncluder({
        includerReg:/<!\-\-include\s*"([^"]+)"\-\->/g
    }))
    //.pipe(rename('index1.html'))
    .pipe(gulp.dest(getport))
	.pipe(connect.reload());
});
// 图片处理
gulp.task('images', function(){
    var imgSrc = inport + 'images/**/*',
        imgDst = getport + 'images';
    gulp.src(imgSrc)
        //.pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});
// less
gulp.task('less', function() {
	gulp.src(inport + 'less/*.less')
	.pipe(less({
        plugins: [autoprefix]
    }))
	.pipe(gulp.dest(getport + 'style/'))
});
//运行Gulp时，默认的Task
gulp.task('default', ['connect', 'watch'].concat(gulpArr));