const jwt = require('jsonwebtoken');
const Users =  require('../models/userM');
const rjcfg = require('../rjcfg.json');
const logger = require('./logger')
var argv = require('minimist')(process.argv.slice(2));

// controladores de autentificacion

var sendToken = function(req, res, next){

  var token = jwt.sign({
      user : req.body.username,
      role : req.body.role
    },
    rjcfg.env[argv.e].secret
  );

  res.setHeader('authorization',token)
  res.status(200).json({ success: true, token: token  });

}

var authenticate = function(req, res, next) {

  //console.log(req);

  if( !req.body.username || !req.body.password ){
    var err = new Error('username and password required');
    err.status = 400;
    return next(err);
  }


  Users.findOne({ username: req.body.username }, function (err, user) {
    if (err) return next(err);
    console.log(user);
    if (user && user.password === req.body.password){
      req.body.role = user.role;
      return sendToken(req, res, next);
    }
//TODO buscar la forma de identificar el origen de la peticion
    logger.warning(`login falied username: ${req.body.username} ${new Date()}`);
    res.status(200).json({ success: false  });
  })

}

module.exports = authenticate;
