// Karma configuration
// Generated on Sat Oct 20 2018 17:18:05 GMT-0500 (Peru Standard Time)
const path = require('path')
const ENV = process.argv.find(arg => arg.includes('production'))
  ? 'production'
  : 'development'

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'test/**/*.js',
      {
        pattern: 'node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
        watched: false
      },
      {
        pattern: 'node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js',
        watched: false
      },
      {
        pattern: 'node_modules/feather-icons/dist/feather.js',
        watched: false
      }
    ],


    // list of files / patterns to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // add webpack as preprocessor
      'test/**/*.js': [ 'webpack', 'sourcemap' ]
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox'],
    // browsers: ['FirefoxHeadless', 'ChromeHeadless'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    webpack: {
      devtool: 'inline-source-map',
      mode: 'development',
      module: {
        rules: [
          {
            test: /\.css$/,
            use: ['css-to-string-loader', 'css-loader', 
              { loader: 'postcss-loader', options: {
                  ident: 'postcss',
                  plugins: () => [
                    postcssPresetEnv()
                  ]
                } 
              }
            ]
          },
          {
              test: /\.styl$/,
              use: [
                  'css-to-string-loader',
                  'css-loader',
                  'stylus-loader'
              ]
          },
          {
              test: /\.js$/,
              // exclude: /(node_modules|bower_components)/,
              use: [
                {
                  loader: 'babel-loader',
                  options: {
                    babelrc: true,
                    extends: path.join(__dirname + '/.babelrc'),
                    cacheDirectory: true,
                    envName: ENV
                  }
                }
              ]
          },
          // {
          //   test: /\.js$/,
          //   loader: 'babel-loader',
          //   exclude: /node_modules\/(?!(@webcomponents\/shadycss|lit-html|@polymer|@vaadin|@lit)\/).*/,
          //   options: {
          //     cacheDirectory: true
          //   }
          // },
          {
            test: /\.js$/,
            loader: 'istanbul-instrumenter-loader',
            enforce: 'post',
            include: path.resolve('./src/components'),
            exclude: /node_modules|\.spec\.js$/,
            options: {
              esModules: true
            }
          }
        ]
      }
    },

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    }
  })
}
