var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //views文件夹
app.set('view engine', 'ejs'); //视图的模板引擎

app.use(logger('dev')); //中间件app.use(funcx)，该步的结果，再交给下一个中间件来处理
app.use(express.json()); //中间件express.json()可处理json数据
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());//解析cookie
app.use(express.static(path.join(__dirname, 'public')));//生成资源（public文件夹）的绝对路径

app.use('/', indexRouter);//如果请求的url和斜杠匹配，就给indexRouter处理
app.use('/users', usersRouter);

// catch 404 and forward to error handler，即上面两个url都没匹配上
app.use(function(req, res, next) {
  next(createError(404));//生成404，next把结果 交给下一级中间件处理
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};//获取error中的信息

  // render the error page
  res.status(err.status || 500); //如果不是404，就变为500
  res.render('error'); //找到error模板，并渲染
});

module.exports = app;
