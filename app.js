var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var assignmentsRouter = require('./routes/assignments');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Serve the compiled Bootstrap stylesheets installed through npm.
app.use('/bootstrap/dist/css', express.static(
  path.join(__dirname, 'node_modules', 'bootstrap', 'dist', 'css')
));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/assignments', assignmentsRouter);

// Send unmatched requests to the error handler.
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  var status = err.status || 500;

  res.status(status).render('error', {
    title: status === 404 ? 'Page Not Found' : 'Request Error',
    message: status >= 500 ? 'Please try again in a moment.' : err.message
  });
});

module.exports = app;