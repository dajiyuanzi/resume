//该例子了解基本原理

var http = require('http') //加载一个模块，返回对象，里面提供了一些方法。

//函数createServer内部异步地创建一个服务器，将其内函数 作为参数，来处理请求。
//浏览器的请求信息（如浏览器信息，申请的域名），被封装成个对象，即function的第一个参数req；
//返回信息也被封装成对象，即第二个参数res。
//可以对不同的url请求，设置不同的数据处理响应。
/*
var server = http.createServer(function(req, res){ 
    console.log('jiengu')
    //响应头（返回给服务器的数据）
    res.setHeader("Content-Type","text/html; charset=utf-8") //  text/html返回数据是html，用utf-8解码；test/plain返回数据是字符串,此时即使html也是明文
    res.write('<h1> 饥人谷</h1>')
    res.end()
})
server.listen(9000) //上面的函数只是创建了服务器实例，listen启动它。
*/
//该函数只是创建了服务器示例，listen启动它。之后在终端输入命令“node 文件名”，服务器就开始等待用户的输入。
//如果主机要运行多个网站，就要设置多个server，多个端口。一个端口不能多个服务器同时用，只能一个服务器。


//响应头：一些关于本次响应的基本信心，如地址等。
//响应体：返回的html等数据，如web的源代码。


//浏览器就是根据返回数据的头部里的基本信息，决定如何处理返回数据。
var server = http.createServer(function(request, response){
  setTimeout(function(){
    //响应头（返回给服务器的数据）
    response.setHeader('Content-Type','text/html; charset=utf-8')//response.setHeader()只允许您设置单个默认的响应头. 若返回数据乱码，可在setheader设置charset解决。
    response.writeHead(404, 'Not Found')//[状态码，对状态码的解释（随便解释你说的算，只是一般规范404是not found）] response.writeHead()将允许您设置几乎关于响应头的所有内容,包括状态代码,内容和多个标题.
    response.write('<html><head><meta charset="gbk" /></head>')
    response.write('<body>')
    response.write('<h1>你好</h1>')
    response.write('</body>')
    response.write('</html>')
    
    response.end()
  },2000);//延时2秒，方便观察，实战不用
})

console.log('open http://localhost:8080')
server.listen(8080)