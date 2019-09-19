var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var noteModel = require('./models/note')

var index = require('./routes/index');
var note = require('./routes/note');



var app = express();//启动express框架（也启动服务器）

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(noteModel);//调用中间件./models/note，以 启动orm和sqlite

app.get('/', function(req, res){
  res.send('hello world')
})

// app.use('/', index);
app.use('/note', note); //当url含有“note”时，将会调用 应用级的路由note 来进一步处理请求（Router对象，相当于一个 子app，其内含有更多的中间件和路由函数，在上方已被require，即./routes/note文件）


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

module.exports = app;
