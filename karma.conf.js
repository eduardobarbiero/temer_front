const path = require('path');
const srcRoot = path.resolve(__dirname, 'src');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ],
    singleRun: true,
    frameworks: [ 'mocha' ],
    files: [
      'tests.webpack.js'
    ],
    preprocessors: {
      'tests.webpack.js': [ 'webpack', 'sourcemap' ]
    },    
    reporters: [ 'dots' ],
    webpack: {
      devtool: 'inline-source-map',
      resolve: {
        extensions: [
            ".js", ".jsx"
        ],
        modules: [srcRoot, 'node_modules/']
      },
      module: {
        rules: [{
          test: /\.js$/,
          enforce: "pre",
          exclude: /node_modules/, 
          use: [{
            loader: "babel-loader"
          }]
        }]
      },
    },
    webpackServer: {
      noInfo: true
    }
  });
};