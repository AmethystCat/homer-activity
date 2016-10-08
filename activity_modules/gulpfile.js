var gulp = require('gulp'),
	less = require('gulp-less'),
	sourcemap = require('gulp-sourcemaps'),
	plumber = require('gulp-plumber'),
	bs = require('browser-sync').create();

var paths = {
		less: 'src/less/*.less',
		css: 'build/css/*.css',
		scripts: 'build/js/*.js',
		html: 'build/*.html'
	};

gulp.task('bs', function() {
	bs.init({
		server: {
			baseDir: './build'
		}
	});

	gulp.watch(paths.less, ['less']);
	gulp.watch(paths.css).on('change', function(e) {
		console.log(e);
		bs.reload(e.path);
	});
	gulp.watch(paths.scripts).on('change', bs.reload);
	gulp.watch(paths.html).on('change', bs.reload);
});
gulp.task('less', function() {
	return gulp.src(paths.less)
		.pipe(plumber())
		.pipe(sourcemap.init())
		.pipe(less())
		.pipe(sourcemap.write())
		.pipe(gulp.dest('build/css'));
});

gulp.task('imgmin', function() {});

gulp.task('build', function() {});

gulp.task('default', ['less', 'bs']);
