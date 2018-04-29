'use strict';

var replace = require('gulp-replace');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var openURL = require('open');
var lazypipe = require('lazypipe');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var revReplace = require('gulp-rev-replace');

var config = {
  app: 'app',
  dist: 'dist'
};

var paths = {
  fonts: ["node_modules/open-iconic/font/fonts/**/*", "node_modules/font-awesome/fonts/**/*"],
  scripts: [config.app + '/scripts/**/*.js'],
  styles: [config.app + '/styles/**/*.scss'],
  views: {
    main: config.app + '/index.html',
    files: [config.app + '/views/**/*.html'],
    templates: [config.app + '/templates/**/*.html']
  }
};

////////////////////////
// Reusable pipelines //
////////////////////////
var lintScripts = lazypipe()
  .pipe($.jshint, '.jshintrc')
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
    name: "AngularJsStarter",
    host: '0.0.0.0',
    fallback: 'app/index.html',
    root: [config.app, '.tmp'],
    livereload: true,
    port: 9000,
    middleware: function (connect) {
      return [
        ['/node_modules', connect["static"]('./node_modules')]
      ];
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

  $.watch(paths.views.templates)
    .pipe($.plumber())
    .pipe($.connect.reload());

  $.watch(paths.views.main)
    .pipe($.plumber())
    .pipe($.connect.reload());

  $.watch(paths.scripts)
    .pipe($.plumber())
    .pipe(lintScripts())
    .pipe($.connect.reload());
});

gulp.task('serve', function (cb) {
  runSequence('clean:tmp', ['jslint'], ['start:client'], 'watch', cb);
});

gulp.task('serve:prod', function () {
  $.connect.server({
    root: [config.dist],
    livereload: true,
    port: 9000,
    middleware: function (connect) {
      return [
        ['/node_modules', connect["static"]('./node_modules')]
      ];
    }
  });
});

///////////
// Build //
///////////
gulp.task('clean:dist', function (cb) {
  rimraf('./' + config.dist, cb);
});

gulp.task('client:build', ['html', 'sass'], function () {
  var jsFilter = $.filter('**/*.js', {
    restore: true
  });

  var cssFilter = $.filter('**/*.css', {
    restore: true
  });

  var indexFilter = $.filter(['**/*', '!**/index.html'], {
    restore: true
  });

  var cssCleanOptions = {
    cache: true,
    compatibility: 'ie8'
  };

  var today = new Date();
  return gulp.src(paths.views.main)
    .pipe(replace('XX-XXXXXXXXXXX-X', 'XX-XXXXXXXXXXX-X'))
    .pipe(replace('LAST-MODIFIED-DATE', today.toUTCString()))
    .pipe($.useref({
      searchPath: [config.app, '.tmp']
    }))
    .pipe(jsFilter)
    .pipe(replace(/http:\/\/localhost:\d+\/api/g, 'https://someurl.com/api'))
    .pipe($.ngAnnotate())
    .pipe($.uglify())
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe($.cleanCss(cssCleanOptions))
    .pipe(cssFilter.restore())
    .pipe(indexFilter)
    .pipe($.rev())
    .pipe(indexFilter.restore())
    .pipe(revReplace())
    .pipe(gulp.dest(config.dist));
});

gulp.task('html', function () {
  return gulp.src(config.app + '/views/**/*')
    .pipe(gulp.dest(config.dist + '/views'));
});

gulp.task('sass', function () {
  return gulp.src(paths.styles)
    .pipe(styles());
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
  gulp.src(config.app + '/.well-known/**/*')
    .pipe(gulp.dest(config.dist + '/.well-known'));
});

gulp.task('copy:templates', function () {
  gulp.src(config.app + '/templates/**/*')
    .pipe(gulp.dest(config.dist + '/templates'));
});

gulp.task('copy:fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(config.dist + '/fonts'));
});

gulp.task('build', ['clean:dist'], function () {
  runSequence(['jslint', 'copy:extras', 'copy:fonts', 'copy:icons', 'images', 'client:build']);
});

gulp.task('default', ['build']);