'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var wiredep = require('wiredep').stream;
var runSequence = require('run-sequence');

var config = {
  app: 'app',
  dist: 'dist'
};

var paths = {
  scripts: [config.app + '/scripts/**/*.js'],
  styles: [config.app + '/styles/**/*.scss'],
  views: {
    main: config.app + '/index.html',
    files: [config.app + '/views/**/*.html']
  }
};

////////////////////////
// Reusable pipelines //
////////////////////////

var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
  .pipe($.jshint.reporter, 'jshint-teamcity')
  .pipe($.jshint.reporter, 'jshint-stylish');

var styles = lazypipe()
  .pipe($.sass, {
    outputStyle: 'expanded',
    precision: 10
  })
  .pipe($.autoprefixer, 'last 1 version')
  .pipe(gulp.dest, '.tmp/styles');

///////////
// Tasks //
///////////
gulp.task('sass', function () {
  return gulp.src(paths.styles)
    .pipe(styles());
});

gulp.task('jslint', function () {
  return gulp.src(paths.scripts)
    .pipe(lintScripts());
});

gulp.task('clean:tmp', function (cb) {
  rimraf('./.tmp', cb);
});

gulp.task('start:client', ['start:server', 'sass'], function () {
  openURL('http://localhost:9000');
});

gulp.task('start:server', function () {
  $.connect.server({
    root: [config.app, '.tmp'],
    livereload: true,
    // Change this to '0.0.0.0' to access the server from outside.
    port: 9000,
    middleware: function (connect, opt) {
      return [['/node_modules', connect["static"]('./node_modules')]
      ]
    }
  });
});

gulp.task('watch', function () {
  $.watch(paths.styles)
    .pipe($.plumber())
    .pipe(styles())
    .pipe($.connect.reload());

  $.watch(paths.views.files)
    .pipe($.plumber())
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts())
    .pipe($.connect.reload());
});

gulp.task('serve', function (cb) {
  runSequence('clean:tmp', ['node:modules'], ['jslint'], ['start:client'], 'watch', cb);
});

gulp.task('serve:prod', function () {
  $.connect.server({
    root: [config.dist],
    livereload: true,
    port: 9000,
    middleware: function (connect, opt) {
      return [
        ['/node_modules', connect["static"]('./node_modules')]
      ]
    }
  });
});

// inject node components
gulp.task('node:modules', function () {
  return gulp.src(paths.views.main)
    .pipe(wiredep({
      directory: 'node_modules',
      ignorePath: '..'
    }))
    .pipe(gulp.dest(config.app));
});

///////////
// Build //
///////////

gulp.task('clean:dist', function (cb) {
  rimraf('./' + config.dist, cb);
});

gulp.task('client:build', ['html', 'sass'], function () {
  var jsFilter = $.filter('**/*.js');
  var cssFilter = $.filter('**/*.css');

  return gulp.src(paths.views.main)
    .pipe($.useref({
      searchPath: [config.app, '.tmp']
    }))
    .pipe(jsFilter)
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.cleanCss({
      cache: true,
      compatibility: 'ie8'
    }))
    .pipe(cssFilter.restore())
    .pipe($.rev())
    .pipe($.revReplace())
    .pipe(gulp.dest(config.dist));
});

gulp.task('html', function () {
  return gulp.src(config.app + '/views/**/*')
    .pipe(gulp.dest(config.dist + '/views'));
});

gulp.task('images', function () {
  return gulp.src(config.app + '/images/**/*')
    .pipe($.imagemin({
      optimizationLevel: 5,
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(config.dist + '/images'));
});

gulp.task('copy:icons', function () {
  return gulp.src(config.app + '/icons/**/*')
    .pipe(gulp.dest(config.dist + '/icons'));
});

gulp.task('copy:extras', ['copy:templates'], function () {
  gulp.src([config.app + '/*.*', '!' + paths.views.main])
    .pipe(gulp.dest(config.dist));
});

gulp.task('copy:templates', function () {
  gulp.src(config.app + '/templates/**/*')
    .pipe(gulp.dest(config.dist + '/templates'));
});

gulp.task('copy:fonts', function () {
  return gulp.src(config.app + '/fonts/**/*')
    .pipe(gulp.dest(config.dist + '/fonts'));
});

gulp.task('build', ['clean:dist'], function () {
  runSequence(['jslint', 'copy:extras', 'copy:fonts', 'copy:icons', 'images', 'client:build']);
});

gulp.task('default', ['build']);
