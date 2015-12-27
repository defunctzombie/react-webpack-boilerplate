import express from 'express';
import hbs from 'hbs';
import path from 'path';
import log from 'bookrc';

import getAssetFilename from './lib/get_asset_filename';
import notFound from './middleware/not_found';

import api from './routes/api';

let app = express();
const appEnv = app.get('env');

app.set('view engine', 'hbs');
hbs.registerHelper('asset_path', getAssetFilename);

app.use('/api', api);

if (appEnv === 'development') {
  // es6 import doesn't allow for conditional require
  // even try/catch around imports does not work
  // we need conditional require because in production we don't install these modules
  let webpack = require('webpack'); // eslint-disable-line no-undef
  let webpackDevMiddleware = require('webpack-dev-middleware'); // eslint-disable-line no-undef
  let webpackConfig = require('./webpack.config.js'); // eslint-disable-line no-undef

  let compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: true,
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}
else {
  const dist = path.join(__dirname, './dist');
  app.use(express.static(dist));
}

app.get('/', function(req, res) {
  res.render('index');
});

app.use(notFound);

app.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
  const status = err.status || err.statusCode;

  let errorMessage = err.message;
  if (status >= 500) {
    // all 5xx errors are logged which means our logging stack will handle them
    log.error(err, req);

    // usually you want to hide 5xx error messages in production
    if (appEnv === 'production') {
      errorMessage = 'Internal Server Error';
    }
  }

  res.locals.error = errorMessage;
  // render generic error page, or consider status specific ones
  res.status(status).render('error');
});

export default app;
