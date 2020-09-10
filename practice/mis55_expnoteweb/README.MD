![]()

This project uses "express+ejs+sqlite3+ORM".  
  
localhost:3000/node/[arguments]：
"/list" show all notes, "/detail/:id" show one note, "/create" make a note.


  
****
  
在.gitignore文件内 忽略依赖文件和本地数据

node_modules
.DS_Stroe


node bin/www 打开服务器，在www文件内看默认端口
一定要到bin/www内看启动的端口好是多少，一般是localhost3000，不是8080

本项目使用express+ejs模板+sqlite3数据库+ORM插件

localhost:3000/node/参数：
/list 展示所有笔记，/detail/:id 展示某条笔记，/create 创建笔记


删除功能：让浏览器发送ajax，服务器接收请求并删除数据库数据，再返回json状态，如status:success或status:fail
一个简单的网站就是由 增删改查 堆积起来的。用户注册功能，在model有 用户创建表，在view有注册页面，密码等要用md5等加密储存。
注册成功后，创建一个session，放到当前req上（需要安装npm上的express-session插件）。这样下次用户请求时，请求会带上session对象，
服务器的路由 就可判断req请求中的这个session对象：若有，则用户已经登录成功；若没有，展示登录页面。还可判断用户的权限。

注意: 墙内用淘宝镜像/CNPM安装依赖，否则会失败。安装成功后若依然失败，需要安装sqlite和配置其环境变量。

删除功能(未做 可写在/routes/note.js)：
让浏览器发送ajax，服务器接收请求并删除数据库数据，再返回json状态，如status:success或status:fail
一个简单的网站就是由 增删改查 堆积起来的。用户注册功能，在model有 用户创建表，在view有注册页面，密码等要用md5等加密储存。
注册成功后，创建一个session，放到当前req上（需要安装npm上的express-session插件）。这样下次用户请求时，请求会带上session对象，
服务器的路由 就可判断req请求中的这个session对象：若有，则用户已经登录成功；若没有，展示登录页面。还可判断用户的权限。


知识点1：
router.get('/events', function(req, res, next) {
  // ..
});
此处若app.use('/index',router)，则router.get在url路径为/index/events时被触发。

知识点2：
调用中间件 app.use([path,] function [, function...])  
当app.use没有提供path参数时，路径默认为“/”,即 全局中间件。当你为某个路径安装了中间件，则当以该路径为基础的路径被访问时，都会应用该中间件。比如你为“/abcd”设置了中间件，那么“/abcd/xxx”被访问时也会应用该中间件。

具体说，在app.js中引入数据模型的中间件
var dataModel=require('./models/data.js'); app.use(dataModel);  
若app.js再使用了router，在router的文件/router/note.js内 可不用require中间件dataModel，便能直接使用data.js
router.get('/list', function(req, res, next) {
  req.models.data.find({}, function(err, notes){...})
});
models.note是orm的模型之调用方法，orm在sqlite上创建的数据表模型note，其把req中的数据放在数据表上
此处 没有“var models=require('./models/data.js');”
