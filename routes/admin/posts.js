var express = require('express');
var router = express.Router();
var article = require('../../database/model/article');
var cats = require('../../database/model/cats')

//显示文章列表
router.get('/', function (req, res, next) {
  article.find((err, data) => {
    res.render('admin/article_list', { data: data });
  })
});

//添加文章列表
router.get('/add', function (req, res, next) {
  cats.find((err,data) => {
    res.render('admin/article_add',{data:data});
})
  // }) 
});

//完成具体的添加文章功能
router.post('/add', function (req, res) {
  //获取表单提交数据
  var cat = req.body.cat;
  var title = req.body.title;
  var summary = req.body.summary;
  var content = req.body.content;

  //发布文章的时间
  var time = new Date();

  var post = {
    "cat": cat,
    "title": title,
    "summary": summary,
    "content": content,
    "time": time
  }
  article.create(post, (err, result) => {
    if (err) {
      res.send(err)
      return;
    }
    res.send("添加文章成功<a href='/admin/posts'>查看文章列表</a>");
    return;
  })
});

//显示编辑分类
router.get('/edit', function (req, res, next) {
  var id = req.query.id;
  article.findOne({ _id: id },function (err, docs) {
    if (err) {
      res.send(err);
      return;
    } else {
      res.render("admin/article_edit", { data: docs });
    }
  })
});

//完成编辑分类的具体功能
router.post('/edit', function (req, res, next) {
  //获取表单中的数据
  var title = req.body.title;
  var summary = req.body.summary;
  var time = req.body.time;
  var content = req.body.content;
  var id = req.body.id;
  article.update({ _id: id }, { $set: { "title": title, "summary": summary, "content": content, "time": time } }, (err, result) => {
    if (err) {
      res.send(err)
      return;
    } else {
      res.send("更新成功<a href='/admin/posts'>返回文章列表</a>")
      return;
    }
  })
})

//删除文章
router.get("/delete", function (req, res) {
  //获取id
  var id = req.query.id;
  article.remove({ _id: id }, (err, result) => {
    if (err) {
      res.send(err)
      return;
    }
    res.redirect('/admin/posts');
  })
})

module.exports = router;
