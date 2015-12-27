import express from 'express';
import log from 'bookrc';

import notFound from '../middleware/not_found';

let router = express.Router();

router.use(notFound);

router.use(function(err, req, res, next) { // eslint-disable-line no-unused-vars
  let status = err.status || err.statusCode || 500;

  // don't leak random error messages
  let message = err.message || err.name;
  if (status === 500) {
    message = 'internal server error';
    log.error(err, req);
  }

  res.status(status).json({
    message: message,
  });
});

export default router;
