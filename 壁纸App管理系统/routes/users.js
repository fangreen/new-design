var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var async = require("async");
var mongodb = require("mongodb");
var MongoClient = mongodb.MongoClient;
var CONN_DB_STR = "mongodb://39.108.136.59:27017/react";
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/pmsg",function(req,res){
  console.log(req.cookies);
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
          if(err) throw err;
          console.log("数据库连接成功");
          var student = db.collection("student");
          var data = {userid:req.cookies.id};
          
          student.find(data,{_id:0,username:1,password:1,college:1,clas:1,phone:1,ide:1,address:1,object:1,math:1,English:1,sport:1,sidemath:1,network:1,java:1,php:1,think:1}).toArray((err,result)=>{
              if(err) throw err;
              res.send({userid:req.cookies.id,username:result[0].username,college:result[0].college,clas:result[0].clas,phone:result[0].phone,ide:result[0].ide,address:result[0].address,object:result[0].object,math:result[0].math,English:result[0].English,java:result[0].java,sport:result[0].sport,php:result[0].php,network:result[0].network,think:result[0].think,sidemath:result[0].sidemath,password:result[0].password,title: '学生信息管理系统'});
              db.close();
            })
      })
    
})
router.post("/remsg",function(req,res){
  var userid=req.body.userid;
  var password=req.body.password;
  var username=req.body.username;
  var college=req.body.college;
  var clas=req.body.clas;
  var phone=req.body.phone;
  var ide=req.body.ide;
  var address=req.body.address;
  var object=req.body.object;
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    console.log("数据库连接成功");
    var student = db.collection("student");
    student.update({userid:userid},{
      $set:{
         password:password,
         username:username,
         college:college,
         clas:clas,
         phone:phone,
         ide:ide,
         address:address,
         object:object
        }
      },(err,result)=>{
        if(err) throw err;
        res.render('main', { title: '学生信息管理系统' });
      })
      db.close();
  })
});
router.post("/magmsg",function(req,res){
  var userid=req.body.userid;
  var password=req.body.password;
  var username=req.body.username;
  var college=req.body.college;
  var clas=req.body.clas;
  var phone=req.body.phone;
  var ide=req.body.ide;
  var address=req.body.address;
  var object=req.body.object;
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    console.log("数据库连接成功");
    var student = db.collection("student");
    student.update({userid:userid},{
      $set:{
         username:username,
         college:college,
         clas:clas,
         phone:phone,
         ide:ide,
         address:address,
         object:object
        }
      },(err,result)=>{
        if(err) throw err;
        res.render('magmain', { title: '学生信息管理系统' });
      })
      db.close();
  })
});
//管理员登录
router.post("/maglogin",function(req,res){
  var postData = req.body;
  console.log(postData);
  var findData = function(db,callback){
    var mag = db.collection("mag");
    var data = {userid:postData.userid,password:postData.password};
    mag.find(data).toArray((err,result)=>{
      if(err) throw err;
      callback(result);
    }) 
  }
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err){
      res.send("数据库错误");
      console.log(err);
    }else{
      console.log("数据库连接成功");
      findData(db,(result)=>{
        console.log("查询成功");
        console.log(result);
        if(result.length>0&&postData.userid=="admin"){
            res.cookie('magid',postData.userid, { expires: new Date(Date.now() + 90000000000)});
            res.redirect("/magmain"); 
        }else{
          res.send(`<script>alert('用户名或密码错误');location.href='/'</script>`);
          db.close();
        }
      })
    }
  })
});
router.get("/smsg",function(req,res){
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    var student = db.collection("student");
    student.find({},{_id:0}).toArray((err,result)=>{
      if(err) throw err;
      res.send(result);
    });
  })
});
router.get("/demsg",function(req,res){
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    var student = db.collection("student");
    console.log(req.query);
    student.deleteOne({userid:req.query.dataid},(err,result)=>{
      console.log("删除成功");
      res.send("1");
      db.close();
    })
  })
});
router.post("/mgrade",function(req,res){
  var userid=req.body.userid;
  var math=req.body.math;
  var English=req.body.English;
  var java=req.body.java;
  var sport=req.body.sport;
  var php=req.body.php;
  var network=req.body.network;
  var think=req.body.think;
  var sidemath=req.body.sidemath;
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    console.log("数据库连接成功");
    var student = db.collection("student");
    student.update({userid:userid},{
      $set:{
         math:math,
         English:English,
         java:java,
         sport:sport,
         php:php,
         network:network,
         think:think,
         sidemath:sidemath
        }
      },(err,result)=>{
        if(err) throw err;
        res.render('magmain', { title: '学生信息管理系统' });
      })
      db.close();
  })
})

//上传图片
router.post("/upload",function(req,res){
  var tags = req.body.tags;
  var ename = req.body.ename;
  var wq = req.body.wq;
  var avatarName = req.body.avatarName;
  var re = req.body.re;
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
      var paper = db.collection("paper");
      var recommend = db.collection("recommend");
      var fenlei = db.collection(ename);
      paper.insert({"wq":wq,"img":wq,"cid":avatarName,"ename":ename,"tags":tags},(err,result)=>{
        fenlei.insert({"wq":wq,"img":wq,"cid":avatarName,"ename":ename,"tags":tags},(err,result)=>{
          if(re=="推荐"){
            recommend.insert({"wq":wq,"img":wq,"cid":avatarName,"ename":ename,"tags":tags},(err,result)=>{
              res.send("成功");
              db.close();
            })
          }else{
            res.send("成功");
            db.close();
          }
        })
      })
     
  })
});

//查找所有图片
router.post("/pic_all",function(req,res){
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    var paper = db.collection("paper");
    paper.find().toArray((err,result)=>{
      if(err) throw err;
      res.send(result);
    });
  })
})


//上传图片

        var formidable = require('formidable'),
        fs = require('fs'),
        TITLE = 'formidable上传示例',
        AVATAR_UPLOAD_FOLDER = '/avatar/',
        domain = "http://localhost:7620";
        var images = require("images");
    
    /* 图片上传路由 */
    router.post('/uploader', function(req, res) {
      var form = new formidable.IncomingForm();   //创建上传表单
      form.encoding = 'utf-8';        //设置编辑
      form.uploadDir = '../public' + AVATAR_UPLOAD_FOLDER;     //设置上传目录
      form.keepExtensions = true;     //保留后缀
      form.maxFieldsSize = 20 *1024*1024;   //文件大小
      form.maxFilesSize = 20 * 1024 * 1024;
      form.parse(req, function(err, fields, files) {
        if (err) {
          res.locals.error = err;
          res.render('index', { title: TITLE });
          return;
        }
        var extName = '';  //后缀名
        switch (files.fulAvatar.type) {
          case 'image/pjpeg':
            extName = 'jpg';
            break;
          case 'image/jpeg':
            extName = 'jpg';
            break;
          case 'image/png':
            extName = 'png';
            break;
          case 'image/x-png':
            extName = 'png';
            break;
        }
        if(extName.length == 0){
          res.locals.error = '只支持png和jpg格式图片';
          res.render('index', { title: TITLE });
          return;
        }
        var avatarName = Math.random() + '.' + extName;
        //图片写入地址；
        var newPath = form.uploadDir + avatarName;
        //显示地址；
        var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
        fs.renameSync(files.fulAvatar.path, newPath);  //重命名
        res.json({
          "newPath":showUrl,
          "avatarName":avatarName
        });

    });
  });


//删除图片
var fs = require("fs");
var path = require("path");
router.post('/deloader', function(req, res) {
  var img_url = req.body.url;
  var ename = req.body.ename;
  var url = "../public/avatar/"+img_url;
deleteFolderRecursive = function(url) {
  var files = [];
  //判断给定的路径是否存在
  if(fs.existsSync(url)) {
      var curPath = url;
      fs.unlinkSync(curPath);
  }else{
    console.log("给定的路径不存在，请给出正确的路径");
  }
};
deleteFolderRecursive(url);

MongoClient.connect(CONN_DB_STR,(err,db)=>{
  if(err) throw err;
  var paper = db.collection("paper");
  var sql = db.collection(ename);
  var recommend = db.collection("recommend");
  paper.deleteOne({cid:img_url},(err,result)=>{
    sql.deleteOne({cid:img_url},(err,result1)=>{
      recommend.deleteOne({cid:img_url},(err,result1)=>{
        res.send("1");
        db.close();
      })
    })
   
  })
 })
})
module.exports = router;
