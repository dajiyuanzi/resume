在.gitignore文件内 忽略依赖文件和本地数据

node_modules
.DS_Stroe


node bin/www 打开服务器，在www文件内看默认端口
一定要到bin/www内看启动的端口好是多少，一般是localhost3000，不是8080

本项目使用express+ejs模板+sqlite3数据库+ORM插件



删除功能：让浏览器发送ajax，服务器接收请求并删除数据库数据，再返回json状态，如status:success或status:fail
一个简单的网站就是由 增删改查 堆积起来的。用户注册功能，在model有 用户创建表，在view有注册页面，密码等要用md5等加密储存。
注册成功后，创建一个session，放到当前req上（需要安装npm上的express-session插件）。这样下次用户请求时，请求会带上session对象，
服务器的路由 就可判断req请求中的这个session对象：若有，则用户已经登录成功；若没有，展示登录页面。还可判断用户的权限。