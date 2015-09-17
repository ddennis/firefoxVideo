'use strict';

var config      = require('../config');
var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browserSync', function() {


  browserSync.init({
    server: {
      baseDir: "./public/"
    }
  });


/*
  browserSync({

  	ui: {
    	port: config.uiport
    },

    proxy: 'localhost:3000',
    // proxy express app
    port: 4000,
    browser: ['google chrome']

    /!*proxy: 'localhost:' + config.serverport,
    port: config.browserport,
    browser:['googe chrome']*!/

  });*/

});
