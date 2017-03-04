var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
  username : { type: String, unique: true }
  ,Email : String
  ,password: String
  ,dateCreated : { type: Date, default: Date.now }
  ,role : { type : String, default : 'cliente' }
});

module.exports = mongoose.model('user', User);
