var express = require('express');
var router = express.Router();
//const User = require('../models/in_memo/user') //数据模型对象 可被service中的函数操作
const UserService = require('../services/user_service')

/* GET users listing. */
router.get('/', (req, res)=>{ // http://localhost:3000/users/
  //const users = new User(req.query.firstName, req.query.lastName, req.query.age) 若不用service直接引入数据对象
  const users = UserService.getAllUsers()
  res.locals.users = users
  res.render('user')
}) //响应访问http://localhost:3000/users?firstName=ji&lastName=yuan&age=26
/* 
req.query是解析GET里的查询参数(?号后)
locals将rep数据填充好，再一起送给 指定模板来渲染 
render渲染 指定模板
*/

router.post('/', (req, res)=>{
  const {firstName, lastName, age} = req.body //post请求 提交新用户，数据放在请求的body内
  const u = UserService.addNewUser(firstName, lastName, age)
  res.json(u) //发送JSON给客户端
  //写入用户数据，用postman,在post形式的body内 写入xxx-form-urlencoded格式的 请求数据 并发送
})
router.get('/:userId', (req, res)=>{ //冒号 标识 userId为参数
  const users = UserService.getUserById(Number(req.params.userId)) //req.params可获取 post请求url中 的参数userId
  res.locals.users = users
  res.render('user')
})
router.post('/:userId/subscription', (req, res, next)=>{
  try{
    const sub = UserService.createSubscription(Number(req.params.userId, req.body.url))
    res.json(sub)
  }catch(e){
    next(e)
  }
})

module.exports = router

//本文件即 MVC的controller层
