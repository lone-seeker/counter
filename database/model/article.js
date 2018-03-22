var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const article =  new Schema({
    cat:String,
    title:String,
    summary:String,
    content:String,
    time:Date
  });
  
  module.exports = mongoose.model('posts',article)