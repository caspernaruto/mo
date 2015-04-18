var gulp = require('gulp'),
	minify = require('gulp-minify-css'),
	notify = require('gulp-notify'),
	rename = require('gulp-rename'),
	stylus = require('gulp-stylus'),
	uglify = require('gulp-uglify'),
	coffee = require('gulp-coffeeify');

/*
|--------------------------------------------------------------------------
| Main Task
|--------------------------------------------------------------------------
| Includes all tasks.
*/

var sDest = 'resources/assets/stylus';

var cDest = 'resources/assets/coffee';

gulp.task('default', ['stylus', 'coffee'], function(){
	gulp.watch(sDest + '/**/*', ['stylus']);

	gulp.watch(cDest + '/**/*', ['coffee']);
});

function showError(e) {
	console.log(e.toString());

	this.emit('end');
}

/*
|--------------------------------------------------------------------------
| Stylus Task
|--------------------------------------------------------------------------
*/

gulp.task('stylus', function(){
	return gulp.src(sDest + '/main.styl')
				.pipe(stylus())
				.on('error', showError)
				.pipe(notify('Compiled : Stylus'))
				.pipe(minify())
				.pipe(rename('style.css'))
				.pipe(gulp.dest('public/css'));
});
/*
|--------------------------------------------------------------------------
| Coffee Task
|--------------------------------------------------------------------------
*/

gulp.task('coffee', function(){
	return gulp.src(cDest + '/index.coffee')
				.pipe(coffee())
				.on('error', showError)
				.pipe(notify('Compiled : Coffee'))
				.pipe(uglify())
				.pipe(rename('script.js'))
				.pipe(gulp.dest('public/js'));
});

/*
|--------------------------------------------------------------------------
| Watch Task
|--------------------------------------------------------------------------
*/