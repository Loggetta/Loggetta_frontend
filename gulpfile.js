const gulp = require('gulp');

const nunjucks = require('gulp-nunjucks');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');

var nunjucksRender = require('gulp-nunjucks-render');
var reload = browserSync.reload;
var concat = require('gulp-concat');

/*********************************************/
/************ JavaScripts ********************/
/*********************************************/
gulp.task('external-scripts', function() {
	return gulp.src('./src/js/external/*.js')
		.pipe(concat('external.js'))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('internal-scripts', function() {
	return gulp.src('./src/js/*.js')
		.pipe(gulp.dest('./public/js'));
});
 
gulp.task('scripts', gulp.parallel('internal-scripts', 'external-scripts'));
 
/*********************************************/
/************ Nunjucks ***********************/
/*********************************************/

gulp.task('nunjucks', function () {
    return gulp.src('src/templates/*.html')
        .pipe(nunjucksRender({
            path: ['src/templates/templates/'] // String or Array
        }))
        .pipe(gulp.dest('public'));

    //return gulp.src('templates/*.html')
     //   .pipe(gulp.dest('public'))
});

/*********************************************/
/************ SASS / CSS *********************/
/*********************************************/

gulp.task('sass', function () {
    return gulp.src('./src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

/*********************************************/
/************ Browsersync ********************/
/*********************************************/
gulp.task('browser-sync', function () {
	var files = [
		'src/sass/*.scss',
		'public/*.html',
		'src/templates/*.html',
		'src/templates/templates/**/*.njk'
	];
	browserSync.init(files, {
		server: {
			baseDir: './public',
		},
		port: 8000,
		cors: true
	});
});

// Watch Files For Changes
gulp.task('watch', function() {
	require('./app/init.js')();

    // scss
    gulp.watch('src/sass/*.scss', gulp.series('sass'));
	gulp.watch('src/sass/**/*.scss', gulp.series('sass'));
	
    // nunjucks
	gulp.watch('src/templates/templates/**/*.njk', gulp.series('nunjucks'));
	gulp.watch('src/templates/**/*.html', gulp.series('nunjucks'));
	
	gulp.watch('src/js/*.js', gulp.series('scripts'));
	//gulp.watch('pages/*.html', gulp.series('nunjucks'));
	//gulp.watch('public/*.html', gulp.series('nunjucks'));
});


// Default Task
//gulp.task('default', ['nunjucks', 'sass', 'watch', 'browser-sync']);  //, 'minify-css'
//gulp.task('default', gulp.parallel('nunjucks', 'sass', 'watch', 'browser-sync', 'express'));

gulp.task('default', gulp.parallel('nunjucks', 'scripts', 'sass', 'watch', 'browser-sync'));