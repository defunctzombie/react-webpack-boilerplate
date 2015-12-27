import book from 'book';

let log = book.default();

// you can enable various application error trackers
// var bugsnag = require('book-bugsnag');
// log.use(bugsnag(process.env.BUGSNAG_URL));
//
// also available is book-sentry
// and it is easy to write your own
//
// if you don't want to use either one, maybe book-email is for you
// at first you can just get emails with error reports

// make sure we handle uncaught exceptions to our logging stack
// also consider dumping to stderr for extra validation
// your bin files might also want to handle uncaughtException to gracefully die, etc
process.on('uncaughtException', function(err) {
  log.error(err);
});

module.exports = log;
