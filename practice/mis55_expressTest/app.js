//一个最简单的express范例
var express = require('express'); //模块系统，导入
var app = express(); //调用模块内的函数，生成express的应用实例

app.get('/', function(req, res){ //路由，默认localhost:3000
  res.send('Hello World');
});
app.get('/about', function(req, res){ //路由，默认localhost:3000
  res.send('about');
});
app.get('/login', function(req, res){ //路由，默认localhost:3000
  res.send('login');
});

var server = app.listen(3000, function(){ //创建服务器。相对于node原生，express可以少写 打开文件连、响应头 等等操作
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening ar http://%s:%s', host, port);
})

//我的node原生笔记 https://github.com/dajiyuanzi/resume/blob/master/practice/mis30_node-server/step0/index.js