require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Set up mongoose connection - add connection string
//https://cloud.mongodb.com/v2/5ef11950c9de941d0dae9d68#security/database/users
mongoose.connect(process.env.DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});
//promise library - bluebird
mongoose.Promise = global.Promise;
//check errors, on-EventListener and callback 
mongoose.connection.on('error', (error) => console.error(error.message));

//middleware
// create local variable 
app.use((req, res, next) => {
  // console.log('current request is: ' + req.path);
  // url is local variable used inside hotel_detail.pug
  res.locals.url = req.path;
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;