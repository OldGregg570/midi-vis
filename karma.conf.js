// Karma configuration
// Generated on Sun Jan 08 2017 23:16:14 GMT-0800 (Pacific Standard Time)

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'https://code.jquery.com/jquery-3.1.1.js',
      'https://code.jquery.com/ui/1.12.0/jquery-ui.js',
      'https://cdn.jsdelivr.net/velocity/1.4.0/velocity.min.js',
      './node_modules/angular/angular.js',                             // angular
      './node_modules/angular-ui-router/release/angular-ui-router.js', // ui-router
      './node_modules/angular-mocks/angular-mocks.js',                 // loads our modules for tests
      './public/main.js',
      './public/midi.js',
      './public/vis/vis.js',
      './test/*.spec.js'
    ],
    exclude: [ ],
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'public/**/*.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    },
    reporters: ['progress', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity
  })
}
