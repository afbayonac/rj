var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Remate = new Schema({
  location: String
  ,fuente : String
  ,dateCreated : { type: Date, default: Date.now }
  ,base : Number
  ,raw : String
});
