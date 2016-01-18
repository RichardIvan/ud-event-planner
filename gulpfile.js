/*eslint-env node */

var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var eslint = require('gulp-eslint');
var jasmine = require('gulp-jasmine-phantom');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require("gulp-babel");
var sourcemaps = require("gulp-sourcemaps");
var imagemin = require('gulp-imagemin');
var pngquant = require("imagemin-pngquant");
var imageOptim = require('gulp-imageoptim');
var zopfli = require("gulp-zopfli");
var ngrok     = require('ngrok');
var psi       = require('psi');
var sequence  = require('run-sequence');
var site      = 'localhost';
var portVal   = 3000;

gulp.task('default', ['copy-html', 'copy-images', 'styles', 'lint', 'scripts'], function() {
	gulp.watch('./sass/**/*.scss', ['styles']);
	gulp.watch('./js/**/*.js', ['lint', 'scripts']);
	gulp.watch('./index.html', ['copy-html']);
	gulp.watch('./dist/index.html').on('change', browserSync.reload);

	browserSync.init({
		server: './dist'
	});
});

gulp.task('ngrok-url', function(cb) {
  return ngrok.connect(3000, function (err, url) {
    site = url;
    console.log('serving your tunnel from: ' + site);
    cb();
  });
});

gulp.task('psi-desktop', function (cb) {
  psi(site, {
    nokey: 'AIzaSyALFynU7Zgx5RVuzQ0kTZ-0HV_5d5a-8-Y',
    strategy: 'desktop'
  }, cb);
});

gulp.task('psi-mobile', function (cb) {
  psi(site, {
    nokey: 'AIzaSyALFynU7Zgx5RVuzQ0kTZ-0HV_5d5a-8-Y',
    strategy: 'mobile'
  }, cb);
});

// this is where your server task goes. I'm using browser sync
gulp.task('browser-sync-psi', function() {
  browserSync.init({
    port: portVal,
    open: false,
    server: {
      baseDir: './dist'
    }
  });
});

// psi sequence with 'browser-sync-psi' instead
gulp.task('psi-seq', [], function (cb) {
  return sequence(
    'browser-sync-psi',
    'ngrok-url',
    'psi-desktop',
    'psi-mobile',
    cb
  );
});

// psi task runs and exits
gulp.task('psi', ['psi-seq'], function() {
  console.log('Woohoo! Check out your page speed scores!')
  process.exit();
})

gulp.task('dist', [
	'copy-html',
	'optimize-images',
	'styles',
	'lint',
	'scripts-dist'
]);

gulp.task('scripts', function() {
	gulp.src(['./js/**/*.js', '!/js/lib/'])
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('scripts-dist', function() {
	gulp.src('./js/**/*.js')
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(zopfli())
		.pipe(gulp.dest('./dist/js'));
});

gulp.task('copy-html', function() {
	gulp.src('./index.html')
		.pipe(gulp.dest('./dist'));
});

gulp.task('copy-images', function() {
	gulp.src('./img/*')
		.pipe(gulp.dest('./dist/img'));
});

gulp.task('optimize-images', function() {
    return gulp.src('./img/*')
		.pipe(imageOptim.optimize())
        .pipe(imagemin({
            progressive: true,
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./dist/imgages'));
});

gulp.task('styles', function() {
	gulp.src('./sass/**/*.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}).on('error', sass.logError))
		.pipe(autoprefixer({
			browsers: ['last 2 versions']
		}))
		.pipe(gulp.dest('./dist/css'))
		.pipe(browserSync.stream());
});

gulp.task('lint', function () {
	return gulp.src(['js/**/*.js'])
		// eslint() attaches the lint output to the eslint property
		// of the file object so it can be used by other modules.
		.pipe(eslint())
		// eslint.format() outputs the lint results to the console.
		// Alternatively use eslint.formatEach() (see Docs).
		.pipe(eslint.format())
		// To have the process exit with an error code (1) on
		// lint error, return the stream and pipe to failOnError last.
		.pipe(eslint.failOnError());
});

gulp.task('tests', function () {
	gulp.src('./tests/spec/extraSpec.js')
		.pipe(jasmine({
			integration: true,
			vendor: './js/**/*.js'
		}));
});