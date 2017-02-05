var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');

gulp.task('nodemon', function(cb){

	var started = false;

	nodemon({
		script: 'index.js',
		watch: ['index.js', 'sourceApp.js'],
		env: {'NODE_ENV': 'development'}
	})
	.on('start', function(){
		if(!started){

			cb();
			started = true;
		}
		gutil.log('started');
	})
});


gulp.task('bs-reload', function(){
	browserSync.reload();
})

gulp.task('default', ['browser-sync'], function(){
	gutil.log("Running default");
	gulp.watch('app/*.js', ['browserify', 'bs-reload']);
  	gulp.watch('public/**/*.css',  ['css']);
  	gulp.watch('public/**/*.html', ['bs-reload']);
});


gulp.task('browserify', function(){
	gutil.log("Browserify!")
	return gulp.src('./app/app.js')
	.pipe(browserify({
		insertGlobals: true
	}))
	.pipe(rename('bundle.js'))
	.pipe(gulp.dest('js'))
});

gulp.task('browser-sync', ['browserify', 'nodemon'], function(){
	gutil.log("Browser Sync")
	browserSync.init({
		proxy: "http://localhost:3000",
		browser: "google chrome",
		files: ['app/*.*', './*.*'],
		port: 7000
	});
});