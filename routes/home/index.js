var express = require('express');
var router = express.Router();
var article = require('../../database/model/article');
var cats = require('../../database/model/cats')

/* GET home page. */
router.get('/', function(req, res, next) {
  article.find((err,articles) => {
    cats.find((error,cats) => {
        if(error){
            console.log(error)
        }
        res.render('home/index', {data: articles,data1: cats})
    })
  })
});

module.exports = router;
