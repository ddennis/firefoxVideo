'use strict';

module.exports = {

  'browserport'  : 4000,
  'uiport'       : 4001,
  'serverport'   : 3000,

  'styles': {
    'files' : 'app/css/**/*.less',
    'src' : 'app/css/styles.less',
    'dest': 'public/css'
  },

  'scripts': {
    'src' : 'app/src/main.js',
    'dest': './public'
  },

  'images': {
    'src' : 'app/images/**/*',
    'dest': 'public/images'
  },

  'fonts': {
    'src' : ['app/fonts/**/*'],
    'dest': 'public/fonts'
  },

  'views': {
    'watch': [
      'app/*.ejs'
    ],
    'src': 'app/index.ejs',
    /*'dest': 'app/src/views'*/
    'dest': 'public/views'
  },

  'gzip': {
    'src': 'public/**/*.{html,xml,json,css,js,js.map}',
    'dest': 'public/',
    'options': {}
  },

  'dist': {
    'root'  : 'public'
  },

  'browserify': {
    'entries'   : ['./app/src/main.js'],
    'bundleName': 'main.js',
    'sourcemap' : true
  },

  'test': {
    'karma': 'test/karma.conf.js',
    'protractor': 'test/protractor.conf.js'
  }

};