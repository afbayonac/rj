const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('./controllers/logger')

// uthentication
var expressJWT = require('express-jwt');
var router = require('./routes/router');
var rjcfg = require('./rjcfg.json');
var app = express();

/**
 * optener argumentos.
 */
var argv = require('minimist')(process.argv.slice(2));

// configire MongoDB
let db = rjcfg.db
mongoose.connect(`mongodb://${db.host}:${db.port}/${db.name}`);
//mongoose.connect(`mongodb://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}`);

var rjdb = mongoose.connection;

rjdb.on('error', (err) => logger.error(`connection error : ${err}`));
rjdb.once('open', () =>  logger.notice(`conection mongodb://${db.host}:${db.port}/${db.name} ok` ));

// run cron tasks
var c = require('./cron/cronStart')

app.use(require('morgan')('dev', { stream: logger.stream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//Implementacion del manejador de authetificacion
//Only can send requests in POST:login
app.use(expressJWT({secret: rjcfg.env[argv.e].secret}).unless(
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