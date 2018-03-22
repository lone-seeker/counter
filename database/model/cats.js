var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const cat =  new Schema({
    title:String,
    sort:Number
  });
 module.exports = mongoose.model('cats',cat,'cats')
