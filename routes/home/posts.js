var express = require('express');
var router = express.Router();
var article = require('../../database/model/article');

router.get('/', function(req, res, next) {
  //获取id
  var id = req.query.id;
  article.findOne({_id:id},(err,docs) =>{
      res.render('home/article',{data:docs});
    })
});

module.exports = router;
