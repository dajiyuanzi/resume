var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/list', function(req, res, next) {
  req.models.note.find({}, function(err, notes){ //find是在表note内 查询数据；find无参数，则展示所有的数据
    if(err){
      throw new Error
    }
    console.log(notes)
    res.render('list', {notes: notes})
  })
});

router.get('/create', function(req, res, next) { //用户请求create页面时，是get，从view找create页面文件（注意，这里的/create 没有点，所以不是当前目录）
  res.render('create');
});
router.post('/create', function(req, res, next) {//用户写入数据，用post
  console.log(req.body.title, req.body.content)//从http的报文里的body体里找信息
  req.models.note.create({//把req中的数据，放在orm创建的 模型note（数据表）上（创建代码 见models/note.js）
    title: req.body.title,
    content: req.body.content
  }, function(err){
    if(err){//如果数据创建中 有出错
      console.log(err)
      throw new Error
    }
    res.send('create success...')
  })
});

router.get('/detail/:id', function(req, res, next) {//根据 get请求的url中的 参数id 来展示数据
  console.log(req.params.id)
  req.models.note.find({id:req.params.id}, function(err, note){//find查询
    if(err){
      throw new Error
    }
    console.log(note)
    res.render('detail', {note:note[0]})
  })

});

module.exports = router; //每个路由文件通过生成一个 express.Router的实例router 并导出，通过 app.use 挂载到不同的路径。


//删除功能：让浏览器发送ajax，服务器接收请求并删除数据库数据，再返回json状态，如status:success或status:fail
//一个简单的网站就是由 增删改查 堆积起来的。用户注册功能，在model有 用户创建表，在view有注册页面，密码等要用md5等加密储存。
//注册成功后，创建一个session，放到当前req上（需要安装npm上的express-session插件）。这样下次用户请求时，请求会带上session对象，
//服务器的路由 就可判断req请求中的这个session对象：若有，则用户已经登录成功；若没有，展示登录页面。还可判断用户的权限。
