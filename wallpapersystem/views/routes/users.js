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
//查找所有用户
router.post("/usermsg",function(req,res){
  var page = req.body.page;
  var pagesize = parseInt(req.body.pageSize);
  var bpage = (page*pagesize)-pagesize;
  var apage = page*pagesize;
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    var user = db.collection("user");
    user.find().toArray((err,result)=>{
      user.find().limit(pagesize).skip(bpage).toArray((err,result1)=>{
        if(err) throw err;
        res.send({rows:result1,total:result.length});
      });
    })
  })
});

//查找指定用户
router.post("/username",function(req,res){
  var uname = req.body.uname;
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    var user = db.collection("user");
    user.find({username:uname}).toArray((err,result)=>{
      if(err) throw err;
      res.send({rows:result,total:result.length});
    })
  })
});
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
  var wq = "http://localhost:7620/avatar/"+img_url;
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
  var comment = db.collection("comment");
  var shoucang = db.collection("shoucang");
  var hot = db.collection("hot");
  paper.deleteOne({cid:img_url},(err,result)=>{
    sql.deleteOne({cid:img_url},(err,result1)=>{
      comment.remove({"wq":wq},(err,result2)=>{
        shoucang.remove({"wq":wq},(err,result3)=>{
          hot.deleteOne({wq:wq},(err,result4)=>{
           recommend.deleteOne({cid:img_url},(err,result1)=>{
            res.send("1");
            db.close();
           })
         })
        })
      })
    })
   
  })
 })
})


router.post("/un_apl",function(req,res){
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    var comment = db.collection("comment");
    comment.find().toArray((err,result)=>{
      if(err) throw err;
      res.send(result);
    });
  })
})
//获取用户限制所有评论
router.post("/apl",function(req,res){
  var username = req.body.user;
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    var comment = db.collection("comment");
    comment.find({user:username}).toArray((err,result)=>{
      if(err) throw err;
      res.send(result);
    });
  })
})
//删除评论
router.post("/del_comment",function(req,res){
  var dtime = req.body.dtime;
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    var comment = db.collection("comment");
    comment.deleteOne({dtime:dtime},(err,result)=>{
      if(err) throw err;
      res.send("0");
    })
  })
})
//添加用户
router.post("/re_success",(req,res)=>{
  var username=req.body.username;
  var password=req.body.password;
  var insertData = function(db,callback){
    var conn = db.collection("user");
    async.waterfall([
      function(callback){
         conn.find({username:username}).toArray((err,result)=>{
           console.log(result);
             if(err) throw err;
             if(result.length>0){
               callback(null,true);   // true 表示已经注册
             }else{
               callback(null,false);
             }
         })
      },
      function(arg,callback){
        if(!arg){
          var date = new Date();
          conn.insert({username:username,password:password,time:date},(err,result)=>{
            if(err) throw err;
            console.log(result);
            callback(null,"0")
          })
        }else{
          callback(null,"1")
        }
      }
    ],function(err,result){
        if(err) throw err;
        callback(result);
    })
}
//连接数据库
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    insertData(db,function(result){
      if(result==0){
        res.send("0");
      }else{
        res.send("1");
      }
      db.close();
    })
  })
});
//通过_id查找user
router.post("/edit_user",function(req,res){
  var id = req.body.id;
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    var user = db.collection("user");
    user.find().toArray((err,result)=>{
      if(err) throw err;
      for(var i=0;i<result.length;i++){
        if(result[i]._id==id){
          res.send({username:result[i].username,password:result[i].password});
        }
      }
    });
  })
})
//删除用户
router.post("/delete_user",function(req,res){
  var username = req.body.username;
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    var user = db.collection("user");
    user.deleteOne({username:username},(err,result)=>{
      if(err) throw err;
      res.send("0");
    });
  })
})

//修改密码
router.post("/edit_up",function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    var user = db.collection("user"); 
    user.update({username:username},{
      $set:{
         password:password
        }
      },(err,result)=>{
        if(err) throw err;
        res.send("0");
      })
   db.close();
  })
 
})

//搜索壁纸
router.post("/swp",function(req,res){
  var wp = req.body.wp;
  var awp=[];
  MongoClient.connect(CONN_DB_STR,(err,db)=>{
    if(err) throw err;
    var paper = db.collection("paper");
    paper.find().toArray((err,result)=>{
      if(err) throw err;
      var len = result.length;
      for(var i=0;i<len;i++){
        var patt1=new RegExp(wp);
        if(patt1.test(result[i].tags)){
          awp[i]=result[i];
        }
      }
      res.send(awp);
    })
  })
})
module.exports = router;
