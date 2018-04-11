var express=require("express");
var app=express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var host="172.18.98.228";
var host="localhost";
var port="7000";
var server = require("http").createServer(app);
var db = require("./db");
var mongodb = require("mongodb");
var async=require("async");
var MongoClient = mongodb.MongoClient;
var CONN_DB_STR = "mongodb://39.108.136.59:27017/react";
server.listen(port,host,()=>{
    console.log(`server is running at http://${host}:${port}`);
})
// 处理跨域方法 jsonp
app.all('*',function(req,res,next){
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    next()
  });
  
app.post("/register",(req,res)=>{
    var userid=req.body;
    console.log(req.body.userid);
    db.getDb((err,db)=>{
        var student = db.collection("student");
    })
})
app.get("/login",(req,res)=>{
    res.send('sadasdasdasdasd');

});
app.get("/book",(req,res)=>{
    db.getDb((err,db)=>{
        var book = db.collection("book");
        book.find({"ret_result.ret_code":1}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    })

});
app.get("/de_book",(req,res)=>{
    db.getDb((err,db)=>{
        var id = JSON.parse(req.query.id);
        var book = db.collection("book");
        book.find({"list.item.id":id.id}).toArray((err,result)=>{
            if(err) throw err;
            console.log(result);
            res.send(result);
        })
    })

})
// app.get("/book_list",(req,res)=>{
//     db.getDb((err,db)=>{
//         var id = JSON.parse(req.query.id);
//         var book = db.collection("book");
//         var booklist = db.collection("booklist");
//         book.find({"list.item.id":id.id}).toArray((err,result)=>{
//             if(err) throw err;
//             booklist.find({"list.item.id":id.id}).toArray((err,result)=>{
//                 if(err) throw err;
//                 if(result.length>0){
//                     res.send("0");
//                 }else{
//                     booklist.insert(result,(err,result)=>{
//                         if(err) throw err;
//                         res.send("1");
//                     })
//                 }
//               })
//         })

//     })
// })
app.get("/list",(req,res)=>{
    db.getDb((err,db)=>{
        var list = db.collection("list");
        list.find({"name":"dog"}).toArray((err,result)=>{
            if(err) throw err;
            console.log(result)
            res.send(result);
        })
    })
});
app.get("/new",(req,res)=>{
    db.getDb((err,db)=>{
        var newpaper = db.collection("paper");
        newpaper.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    })
})
app.get("/recommend",(req,res)=>{
    db.getDb((err,db)=>{
        var recommend = db.collection("recommend");
        recommend.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    })
})
app.get("/hot",(req,res)=>{
    db.getDb((err,db)=>{
        var hot = db.collection("hot");
        hot.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    })
})
app.get("/classify",(req,res)=>{
    db.getDb((err,db)=>{
        var classify = db.collection("classify");
        classify.find({"type":1}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    })
})
app.get("/detail_re",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var detail = db.collection("recommend");
       detail.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/detail_new",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var new_paper = db.collection("paper");
       new_paper.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/detail_hot",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var hot = db.collection("hot");
        hot.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/girl",(req,res)=>{
    db.getDb((err,db)=>{
        var girl = db.collection("girl");
        girl.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/girl1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var girl1 = db.collection("girl");
        girl1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/animation",(req,res)=>{
    db.getDb((err,db)=>{
        var animation = db.collection("animation");
        animation.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/animation1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var animation1 = db.collection("animation");
        animation1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/landscape",(req,res)=>{
    db.getDb((err,db)=>{
        var landscape = db.collection("landscape");
        landscape.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/landscape1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var landscape1 = db.collection("landscape");
        landscape1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/game",(req,res)=>{
    db.getDb((err,db)=>{
        var game = db.collection("game");
        game.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/game1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var game1 = db.collection("game");
        game1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/text",(req,res)=>{
    db.getDb((err,db)=>{
        var text = db.collection("text");
        text.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/text1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var text1 = db.collection("text");
        text1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/vision",(req,res)=>{
    db.getDb((err,db)=>{
        var vision = db.collection("vision");
        vision.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/vision1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var vision1 = db.collection("vision");
        vision1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/emotion",(req,res)=>{
    db.getDb((err,db)=>{
        var emotion = db.collection("emotion");
        emotion.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/emotion1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var emotion1 = db.collection("emotion");
        emotion1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/creative",(req,res)=>{
    db.getDb((err,db)=>{
        var creative = db.collection("creative");
        creative.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/creative1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var creative1 = db.collection("creative");
        creative1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/celebrity",(req,res)=>{
    db.getDb((err,db)=>{
        var celebrity = db.collection("celebrity");
        celebrity.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/celebrity1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var celebrity1 = db.collection("celebrity");
        celebrity1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/stuff",(req,res)=>{
    db.getDb((err,db)=>{
        var stuff = db.collection("stuff");
        stuff.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/stuff1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var stuff1 = db.collection("stuff");
        stuff1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/art",(req,res)=>{
    db.getDb((err,db)=>{
        var art = db.collection("art");
        art.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/art1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var art1 = db.collection("art");
        art1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/man",(req,res)=>{
    db.getDb((err,db)=>{
        var man = db.collection("man");
        man.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/man1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var man1 = db.collection("man");
        man1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/cartoon",(req,res)=>{
    db.getDb((err,db)=>{
        var cartoon = db.collection("cartoon");
        cartoon.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/cartoon1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var cartoon1 = db.collection("cartoon");
        cartoon1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/machine",(req,res)=>{
    db.getDb((err,db)=>{
        var machine = db.collection("machine");
        machine.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/machine1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var machine1 = db.collection("machine");
        machine1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/cityscape",(req,res)=>{
    db.getDb((err,db)=>{
        var cityscape = db.collection("cityscape");
        cityscape.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/cityscape1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var cityscape1 = db.collection("cityscape");
        cityscape1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/animal",(req,res)=>{
    db.getDb((err,db)=>{
        var animal = db.collection("animal");
        animal.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/animal1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var animal1 = db.collection("animal");
        animal1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/sport",(req,res)=>{
    db.getDb((err,db)=>{
        var sport = db.collection("sport");
        sport.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/sport1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var sport1 = db.collection("sport");
        sport1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/movie",(req,res)=>{
    db.getDb((err,db)=>{
        var movie = db.collection("movie");
        movie.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/movie1",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var movie1 = db.collection("movie");
        movie1.find({"img":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
// app.get("/shou_add",(req,res)=>{
//     var img = req.query.img;
//     var sql = req.query.sql;
//     db.getDb((err,db)=>{
//         var shou_add = db.collection(sql);
//         var shoucang = db.collection("shoucang");
//         shou_add.find({"img":img}).toArray((err,result)=>{
//             if(err) throw err;
//            shoucang.insert(result,(err,result1)=>{
//                if(err) throw err;
//                res.send(result1);
//                db.close();
//            })
//         })
//     })
// })
app.get("/sc",(req,res)=>{
    var img = req.query.img;
    var users = req.query.user;
    db.getDb((err,db)=>{
        var sc = db.collection("shoucang");
         sc.find({"img":img,"user":users}).toArray((err,result)=>{
            if(err) throw err;
            if(result!=""){
                res.send("1");
            }else{
                res.send("0");
            }
           
            db.close();
        })
    })
})
app.get("/shouc",(req,res)=>{
    var user = req.query.user;
    db.getDb((err,db)=>{
        var shouc = db.collection("shoucang");
        shouc.find({"user":user}).toArray((err,result)=>{
            if(err) throw err;
            if(result!=""){
                res.send("1");
            }else{
                res.send("0");
            }
           
            db.close();
        })
    })
})
app.get("/paper",(req,res)=>{
    var user = req.query.user;
    db.getDb((err,db)=>{
        var paper = db.collection("shoucang");
        paper.find({"user":user}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/user",(req,res)=>{
    var user = req.query.user;
    var img = req.query.img;
    var sql = req.query.sql;
    var ph = req.query.ph;
    db.getDb((err,db)=>{
        var shoucang = db.collection("shoucang");
        var hot = db.collection("hot");
        // shoucang.find({"user":user}).toArray((err,result)=>{
        //     if(err) throw err;
            // if(result==""){
                shoucang.insert({"user":user,"img":img,"sql":sql,"ph":ph,"wq":img},(err,result1)=>{
                    hot.find({"img":img}).toArray((err,result)=>{
                        if(err) throw err;
                        if(result==""){
                            hot.insert({"user":user,"img":img,"sql":sql,"ph":ph,"wq":img},(err,result2)=>{
                                if(err) throw err;
                                res.send(result2);
                                db.close();
                            })
                        }else{
                            res.send(result1);
                            db.close();
                        }
                    })
                   
                })
        //     }else{
        //         res.send("已经插入");
        //     }
        // })
           
        })
})
// app.get("/shou_add",(req,res)=>{
//     console.log("dddd");
//     var img = req.query.img;
//     var sql = req.query.sql;
//     var user =  req.query.user;
//     console.log("dddd");
//     db.getDb((err,db)=>{
//         var shou_add = db.collection(sql);
//         var show_sql = db.collection("shoucang");
//         shou_add.find({"img":img}).toArray((err,result)=>{
//           if(err) throw err;
//         show_sql.update( {"user":user}, { $set: {"shoucang": result} },(err,result1)=>{
//             if(err) throw err;
//             console.log("插入成功")
//             res.send(user);
//             db.close();
//         })
        
//     })
//   })
// })
app.get("/shou_pop",(req,res)=>{
    var img = req.query.img;
    var sql = req.query.sql;
    var user =  req.query.user;
    db.getDb((err,db)=>{
        var shoucang = db.collection("shoucang");
        var hot = db.collection("hot");
        shoucang.deleteOne({"img":img,"user":user},(err,result)=>{
            hot.deleteOne({"img":img,"user":user},(err,result1)=>{
            if(err) throw err;
            res.send(result1);
            db.close();
            })
        })
           
    })
})



// app.get("/user",(req,res)=>{
//     var img = req.query.img;
//     var user =  req.query.user;
//     db.getDb((err,db)=>{
//         var show_sql = db.collection("shoucang");
//         show_sql.update( {"img":img}, { $set: {"user": user } },(err,result)=>{
//             if(err) throw err;
//             console.log("插入成功")
//             res.send(user);
//             db.close();
//         })
        
//     })
// })
app.get("/shoucang",(req,res)=>{
    db.getDb((err,db)=>{
        var movie1 = db.collection("shoucang");
        movie1.find().toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})
app.get("/re_success",(req,res)=>{
    var username=req.query.username;
    var password=req.query.password;
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
 app.get("/change_login",(req,res)=>{
    var postData = req.query;
    var findData = function(db,callback){
    var conn = db.collection("user");
    var data = {username:postData.username,password:postData.password};
      conn.find(data).toArray((err,result)=>{
        if(err) throw err;
        console.log(result);
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
        if(result.length>0){
          res.send("1");
        }else{
          res.send("0");
        }
      })
    }
  })
})


//评论
app.get("/comment",(req,res)=>{
    var dtime = req.query.dtime;
    var user = req.query.user;
    var img = req.query.img;
    var pinglun = req.query.pinglun;
    var re = /妈的|傻逼|操你妈|sb|共产党|国名党|反动派|卧槽+/gi;
    var zpinglun = pinglun.replace(re,"***");
    db.getDb((err,db)=>{
        var comment = db.collection("comment");
        comment.insert({"wq":img,"user":user,"pinglun":zpinglun,"dtime":dtime,"dz":0},(err,result)=>{
            if(err) throw err;
            res.send(zpinglun);
        })
    })
})

app.get("/spl",(req,res)=>{
    var img = req.query.img;
    db.getDb((err,db)=>{
        var comment = db.collection("comment");
        comment.find({"wq":img}).toArray((err,result)=>{
            if(err) throw err;
            res.send(result);
            db.close();
        })
    })
})

//点赞
 app.get("/dz",(req,res)=>{
     var dtime = req.query.dtime;
     var dzuser = req.query.dzuser;
     var dzsl = req.query.dzsl;
     var user = req.query.user;
     var img = req.query.img;
     db.getDb((err,db)=>{
         var comment = db.collection("comment");
         comment.find({user:user,wq:img,dtime:dtime}).toArray((err,result)=>{
            if(err) throw err;
            var arr=[];
            if(!result[0].dzuser){
               arr.push(dzuser);
            }else{
                var arr1=[];
                arr1.push(dzuser);
                arr = arr1.concat(result[0].dzuser);
              
            }
            comment.update({user:user,wq:img,dtime:dtime},{
                $set:{
                   dzuser:arr,
                   dz:dzsl,
                  }
                },(err,result1)=>{
                  if(err) throw err;
                  res.send("成功");
                })
            db.close();
        })
      
     })
 })

 app.get("/qdz",(req,res)=>{
    var dzuser = req.query.dzuser;
    var carr=[];
    db.getDb((err,db)=>{
        var comment = db.collection("comment");
        comment.find().toArray((err,result)=>{
            if(err) throw err;
            var len = result.length;
           
            for(var i=0;i<len;i++){
                if(result[i].dzuser!=undefined){
                for(var j=0;j<result[i].dzuser.length;j++){
                    if(result[i].dzuser[j]==dzuser){
                        carr.push(result[i]._id);
                    }
                }
            }
        }
            res.send(carr);
        })
    })
 })

 //壁纸搜索
 app.get("/wp_search",function(req,res){
    var wp = req.query.wp;
    var awp=[];
    db.getDb((err,db)=>{
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