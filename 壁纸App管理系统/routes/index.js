var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '壁纸App管理系统' });
});
router.get('/register', function(req, res, next) {
  res.render('register', { title: '壁纸App管理系统' });
});
router.get('/main', function(req, res, next) {
  res.render('main', { title: '壁纸App管理系统'});
});
router.get('/magmain',function(req,res){
  res.render('magmain',{path:"wallpaper"});
})
router.get('/usermassage',function(req,res){
  res.render('magmain',{path:"usermassage"});
})
router.get('/wallpaper',function(req,res){
  res.render('magmain',{path:"wallpaper"});
})
module.exports = router;
