var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const user =  new Schema({
    username:String,
    pwd:String, 
  });
module.exports = mongoose.model('users',user)