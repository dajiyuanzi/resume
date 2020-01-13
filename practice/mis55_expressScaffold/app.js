var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views')); //读取view文件的路径 拼接至views文件夹：项目根目录_dirname+views
app.set('view engine', 'ejs'); //视图的模板引擎

//use默认路由是'/'，其内的中间件自身都含有next()
app.use(logger('dev')); //中间件logger会做日志。系统中间件一般有next， 会把该步的结果 再交给下一个中间件来处理
app.use(express.json()); //中间件express.json()可处理json数据
app.use(express.urlencoded({ extended: false })); //解析UTF-8的编码的数据
app.use(cookieParser()); //解析cookie
app.use(express.static(path.join(__dirname, 'public')));//将静态文件目录绝对路径 设置为：项目根目录+/public文件夹

app.use('/', indexRouter);//如果请求的url和斜杠匹配，就给indexRouter处理
app.use('/users', usersRouter);

// catch 404 and forward to error handler，即上面两个url都没匹配上
app.use(function(req, res, next) {
  next(createError(404));//生成404，next把结果 交给下一面的中间件处理
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};//若是开发环境，则获取error中的信息，否则错误时抛出空对象

  // render the error page
  res.status(err.status || 500); //如果不是404，就变为500
  res.render('error'); //找到error模板，并渲染
});

module.exports = app;
