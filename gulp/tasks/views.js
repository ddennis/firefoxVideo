'use strict';

var config          = require('../config');
var gulp            = require('gulp');
//var templateCache = require('gulp-angular-templatecache');
var browserSync     = require('browser-sync');
var gulpif          = require('gulp-if');
var ejs             = require("gulp-ejs");

// Views task
gulp.task('views', function() {

  // Put our index.html in the dist folder
  gulp.src('app/index.ejs')
      .pipe(ejs({
          version: "Hello Gulp!"
      }))
    .pipe(gulp.dest(config.dist.root));

  return gulp.src(config.views.src)
        .pipe(gulp.dest(config.views.dest))
        .pipe(gulpif(browserSync.active, browserSync.reload({ stream: true, once: true })));


    // Process any other view files from app/views
  /*return gulp.src(config.views.src)
    .pipe(templateCache({
      standalone: true
    }))
    .pipe(gulp.dest(config.views.dest));*/

});