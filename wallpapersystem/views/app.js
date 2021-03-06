var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require("express-session");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');
var multipart = require("connect-multiparty"); 
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//上传大小设置
//handle request entity too large
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb',extended:true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

app.use(function (req, res, next) {
  if (req.headers['content-type'] && req.headers['content-type'].indexOf('GBK') > -1) {
      req.headers['content-type'] = req.headers['content-type'].replace('GBK', 'UTF-8');
  }
  next();
});

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"recommend 128 bytes random string",
  cookie:{maxAge:1000000*60*20},   // 会话的有效时长  20min
  resave:true,     // 自动保存
  saveUninitialized:true
}));
// var Storage = multer.diskStorage({
//   destination:function(req,file,callback){
//     callback(null,"./Images");
//   },
//   filename:function(req,file,callback){
//     callback(null,file,fieldname +"_"+file.originalname);
//   }
// });
// var upload = multer({storage:Storage}).array("imgUploader",3);
// array(fieldname[maxCount]);

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
// 处理跨域方法 jsonp
// app.all('*',function(req,res,next){
//   // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
//   res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//   res.header("X-Powered-By",' 3.2.1');
//   next()
// });

module.exports = app;
