'use strict';

var gulp = require('gulp');
var clean = require('gulp-clean');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var Server = require('karma').Server;


var globs = {
  srcJs: 'src/**/*.js',
  srcHtml: 'src/**/*.html',
  testJs: 'test/**/*.js'
};
var srcOption = {base: './'};
var dest = './dist';

gulp.task('clean', function () {
  return gulp.src(dest, {read: false})
    .pipe(clean());
});

gulp.task('copy_html', ['clean'], () =>
  gulp.src(globs.srcHtml, srcOption)
    .pipe(gulp.dest(dest))
);


function build(testBaseUrl = '') {
  return gulp.src([globs.srcJs, globs.testJs], srcOption)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015'],
      plugins: ['transform-es2015-modules-amd']
    }))
    .pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '/' + testBaseUrl}))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream());
}
gulp.task('build', ['copy_html'], () =>
  build()
);

gulp.task('build_test', ['copy_html'], () => {
  build('base/')
});

// Static server
gulp.task('browser-sync', ['build'], function () {
  browserSync.init({
    server: {
      baseDir: ['dist/src', 'node_modules'],
      routes: {
        // '/src': 'src'
      },
    }
  });

  gulp.watch(globs.srcHtml).on('change', browserSync.reload);
  gulp.watch(globs.srcJs, ['build']);
});
/**
 * Run test once and exit
 */
gulp.task('test:unit', ['build_test'], function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});
