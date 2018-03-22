var express = require('express');
var router = express.Router();
var user = require('../../database/model/user')
//载入登录页面
router.get('/', function(req, res, next) {
  res.render('admin/login');
});

//用户登录处理
router.post('/signin',(req,res) => {
  //获取用户名和密码
  var username = req.body.username;
  var pwd = req.body.pwd;
    user.findOne({username: username},(err,data) => {
      console.log(data)
      if(data.pwd == pwd){
          req.session.username = username;
          res.redirect('/admin/index')
      }
      else{
          res.send('<h1>用户名密码错误</h1>')
          return;
      }
  })
});

//用户注销操作
router.get('/logout',(req,res) => {
  //清楚session，然后跳转
  req.session.username = null;
  res.redirect('/admin/users')
});

function checkNotLogin(req,res,next){
	if(req.session.isLogin){
		// 表示已经登录了，跳转到原先页面
		res.redirect('back');
	}
	next();
}

module.exports = router;
