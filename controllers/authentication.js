var config = require('../config.json');
var users = config.users;
var jwt = require('jsonwebtoken');

// controladores de autentificacion

var sendToken = function(req, res, next){

  var token = jwt.sign(
    {
      user : req.body.user
    }
    ,config.secret
  );

  res.setHeader('authorization',token)
  res.status(200).send();
}

var authenticate = function(req, res, next) {

  if( !req.body.user || !req.body.password ){
    var err = new Error('user and password required');
    err.status = 400;
    return next(err);
  }

  if (users[req.body.user] === req.body.password)
  return sendToken(req, res, next);

  var err = new Error('authentication failed');
  err.status = 401;
  next(err);

}

module.exports = authenticate;
