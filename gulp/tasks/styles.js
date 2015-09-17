'use strict';

var config       = require('../config');
var gulp         = require('gulp');
/*var sass         = require('gulp-sass');*/
var gulpif       = require('gulp-if');
var handleErrors = require('../util/handleErrors');
var browserSync  = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');

var less = require('gulp-less');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');


gulp.task('styles', function () {

  /*return gulp.src(config.styles.src)*/
    /*.pipe(sass({
      sourceComments: global.isProd ? 'none' : 'map',
      sourceMap: 'sass',
      outputStyle: global.isProd ? 'compressed' : 'nested'
    }))*/

    return gulp.src(config.styles.src)
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            gutil.beep();
            this.emit('end');
        }))
        .pipe(less())



    .pipe(autoprefixer("last 2 versions", "> 1%", "ie 9"))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true })));

});

/*

gulp.task('less', function() {
  return gulp.src('./client/less/styles.less')
      .pipe(plumber(function(error) {
        gutil.log(gutil.colors.red(error.message));
        gutil.beep();
        this.emit('end');
      }))
      .pipe(less())
      .pipe(prefixer('last 2 versions', 'ie 9'))
      .pipe(gulp.dest('./public'));
});
*/


