var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/myblog")
db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open',function() {
    console.log('mongoose 连接成功')
  });
