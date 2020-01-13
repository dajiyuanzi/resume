var express = require('express')
var app = express()
app.listen(3000)

//启动前安装express   npm install express --no-save

function a1(req ,res, next){
  console.log('a1')
  next()
}
function a2(req ,res, next){
  console.log('a2')
  next()
}
function a3(req ,res, next){
  console.log('a3')
  next()
}

function b1(req ,res, next){
  console.log('b1')
  next()
}

app.use(b1)
app.use(a1, a2, a3)
app.use(b1) //next让下面接着执行

/*
打印
b1
a1
a2
a3
b1
不同use间的中间件[app.use(b1)和app.use(a1, a2, a3)] 和 同一个use内的中间件[app.use(a1, a2, a3)]，只要不用next，就都不能连续调用。
先写的use，先被用；同use内，先写的中间件先被用--先写先运行，若不用next，后写的无法执行

另外，因为重复使用app.use(b1)，浏览器会报错拒收：server不安全
*/

function b2(req ,res, next){ //没有next
  console.log('b2')
}
app.use(b1, b2) //打印b1 b2，但下一个use不执行，因为b2没有next
app.use(a1, a2, a3) //不执行

//next让 不同的中间件和其use调用 能串行，从而 共享同一个请求 并一起处理它
//express自带的中间件，自身大都含有next()
