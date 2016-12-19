var jwt = require('jsonwebtoken');
var Users =  require('../models/userM');
var rjcfg = require('../rjcfg.json');
var users = rjcfg.users;
var argv = require('minimist')(process.argv.slice(2));

// controladores de autentificacion

var sendToken = function(req, res, next){

  var token = jwt.sign(
    {
      user : req.body.user
    }
    ,rjcfg.env[argv.e].secret
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


  Users.findOne({ 'name': 'root' }, function (err, user) {
    if (err) return next(err);

    if (user && user.password === req.body.password)
    return sendToken(req, res, next);

    var err = new Error('authentication failed');
    err.status = 401;
    next(err);
  })

}

module.exports = authenticate;
