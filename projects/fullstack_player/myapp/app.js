var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./server/routes/index');
// var usersRouter = require('./server/routes/users');
var user = require('./server/routes/user');

var app = express();

//服务器自动重启和前端自动编译，从而实现热更新
if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var webpackConfig = require('./webpack.config.js');
  var webpackCompiled = webpack(webpackConfig);
  // 配置运行时打包
  var webpackDevMiddleware = require('webpack-dev-middleware');
  app.use(webpackDevMiddleware(webpackCompiled, {
      publicPath:webpackConfig.output.publicPath,
      stats: {colors: true},
      lazy: false,
      watchOptions: {
          aggregateTimeout: 300,
          poll: true
      },
  }));

  // 配置热更新
  var webpackHotMiddleware = require('webpack-hot-middleware');
  app.use(webpackHotMiddleware(webpackCompiled));
}


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//设置跨域访问,在app.use(express.static(path.join(__dirname, 'public')));后添加
app.all('*',function(req, res, next) {    
  res.header("Access-Control-Allow-Origin", "*");    
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");    
  res.header("X-Powered-By",' 3.2.1')    
  res.header("Content-Type", "application/json;charset=utf-8");    
  next();    
});

//webpack.config.js 将把根目录路由"/" 指向./client/index.js，而非之前的routes/index.js
// app.use('/', indexRouter); 
// app.use('/users', usersRouter);
app.use('/api', user);
//express后端 所监听的请求，都是client/action中定义的js函数发出的；这些js函数是在引用它的组件 在被渲染时，被触发调用的

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


//mongoose的数据库连接配置
var mongoose = require('mongoose'),
    DB_URL = 'mongodb://localhost:27017/myapp';
//连接
mongoose.connect(DB_URL, {useMongoClient: true,});
//连接成功
mongoose.connection.on('connected', function () {    
    console.log('connect success ' + DB_URL);  
});    
//连接异常
mongoose.connection.on('error',function (err) {    
    console.log('connect error: ' + err);  
});    
//连接断开
mongoose.connection.on('disconnected', function () {    
    console.log('disconnect');  
});  


//下述代码生效：运行了npm run server，且数据库是可以连接上的，我们将数据写入数据库。后面修改参数的相同操作同理。
//注意：在添加这段代码时，不用重启服务器，完成连接后，需删除这段代码
//数据库的文件读取：歌曲列表
var MongoClient = require('mongodb').MongoClient;
var fs=require('fs');
//这里的songs.json是mongoDB目录下的歌曲数据
var file="./mongoDB/songs.json"; //再改为personal.json等
var file2="./mongoDB/playlists.json";
var file3="./mongoDB/rank.json"
var file5="./mongoDB/personal.json";

//读取文件 为json格式
var result=JSON.parse(fs.readFileSync(file));
var result2=JSON.parse(fs.readFileSync(file2));
var result3=JSON.parse(fs.readFileSync(file3))
var result5=JSON.parse(fs.readFileSync(file5))

//连接数据库 并 将文件读取数据 添加进数据库对应的Account表单中
MongoClient.connect(DB_URL,function(err, db) {
  //这里的Songs就是数据库集合的内容
  db.collection('Songs').insert(result); //再改为personalized等
  db.collection('PlayList').insert(result2); 
  db.collection('Rank').insert(result3); 
  db.collection('NewSongs').insert(result);
  db.collection('personalized').insert(result5);
});

module.exports = app;
