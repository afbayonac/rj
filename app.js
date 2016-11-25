var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// uthentication
var expressJWT = require('express-jwt');
var router = require('./routes/router');
var rjcfg = require('./rjcfg.json')

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Implementacion del manejador de authetificacion
//Only can send requests in POST:login
app.use(expressJWT({secret: rjcfg.secret}).unless(
  {
    path:[
      { url: "/login" , methods: ['POST']}
    ]
  })
);


app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ||
                     req.app.get('env') === 'local' ? err : {};
  // send error
  res.status(err.status || 500);
  res.send();
});

module.exports = app;
