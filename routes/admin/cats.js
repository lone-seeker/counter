var express = require('express');
var router = express.Router();
var cats = require('../../database/model/cats')
//显示分类列表
router.get('/', function(req, res, next) {
    cats.find((err,docs)=>{
        res.render("admin/category_list",{data:docs});
    })
});

//添加分类
router.get('/add', function(req, res, next) {
    res.render('admin/category_add');
  });
//添加分类的具体实现
router.post('/add', function(req, res, next) {
  //第一步：获取表单提交过来的数据
  var title = req.body.title;
  var sort = req.body.sort;
  //第二步：验证提交过来的数据，略
  //第三步：将传过来的数据存入数据库中，并完成提示和跳转
    cats.create({title,sort},(err)=>{
      if(err){
        res.send(err)
        return;
      }else{
        res.send("添加分类成功<a href='/admin/cats'>查看分类列表</a>")
        return;
      }
    })
});

//显示编辑分类
router.get('/edit', function(req, res, next) {
  var id = req.query.id;
    cats.findOne({_id:id},(err,docs)=>{
        //数据和视图一起进行渲染
        res.render("admin/category_edit",{data:docs});
    })
});

//完成编辑分类的具体功能
router.post('/edit', function(req, res, next){
  //获取表单中的数据
  var title = req.body.title;
  var sort = req.body.sort;
  var id = req.body.id;
    cats.update({_id:id},{$set:{title,sort}},(err)=>{
      if(err){
        res.send(err)
        return;
      }else{
        res.send("更新成功<a href='/admin/cats'>返回分类列表</a>")
        return;
      }
    })
})

//删除分类
router.get("/delete",function(req,res){
  //获取id
  var id = req.query.id;
    cats.remove({_id:id},err=>{
      res.redirect('/admin/cats');
    })
})

module.exports = router;
