/* eslint-env node */
'use strict';

let path = require('path');
let assert = require('assert');
let webpack = require('webpack');
let AssetsPlugin = require('assets-webpack-plugin');

// your env needs might be different
assert(['development', 'production'].indexOf(process.env.NODE_ENV) >= 0, 'NODE_ENV must be one of development or production');

const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

module.exports = {
  debug: false,
  devtool: IS_DEVELOPMENT ? '#inline-source-map' : undefined,
  // where the client files live, paths relative to here
  context: path.join(__dirname, 'client'),
  entry: {
    // change 'app' to whatever you want to call the final JS bundle
    app: ['./index.jsx'],
    // if you want to have multiple 'apps' (pages) that have their own js
    // this is useful if you have some JS on many pages but no single 'app'
    // app2: ['./app2.js'],
    // along with files specified here, webpack will automatically figure out
    // common code across the other bundles (pages) and put it into this file
    vendor: [
      // remove true to see HMR logs
      // https://www.npmjs.com/package/webpack-hot-middleware#config
      devOnly('webpack-hot-middleware/client?quiet=true'),
      'react',
      'react-dom',
    ].filter(Boolean),
  },

  output: {
    path: path.join(__dirname, 'dist', 'assets'),
    filename: IS_DEVELOPMENT ? '[name].dev.js' : '[name].[hash].js',
    chunkFilename: '[id].[hash].js',
    pathinfo: IS_DEVELOPMENT,
    publicPath: '/assets/',
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor' }),
    // allows some React codepaths to be removed by the minifier in production
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    devOnly(new webpack.HotModuleReplacementPlugin()),
    devOnly(new webpack.NoErrorsPlugin()),
    prodOnly(new webpack.optimize.OccurenceOrderPlugin()),
    prodOnly(new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })),
    // generates a json manifest of the hashed filepaths
    prodOnly(new AssetsPlugin({ path: path.join(__dirname, 'dist', 'assets') })),
  ].filter(Boolean),

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel',
        query: {
          'presets': ['es2015', 'react'],
          'plugins': devOnly([
            ['react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module'],
              }, {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react'],
              }],
            }],
          ]),
        },
      },
    ],
  },
};

function prodOnly(fn) {
  return IS_DEVELOPMENT ? undefined : fn;
}

function devOnly(fn) {
  return IS_DEVELOPMENT ? fn : undefined;
}
