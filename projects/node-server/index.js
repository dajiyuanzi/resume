//一个可用的静态服务器
//客户端向url发送请求，由url中的端口，找到主机中的相应的server（一台主机可能有多个server），同时
//由url中的路径&文件名找到服务器内地文件；服务器经过处理后，发送回客户端。

var http = require('http')
var path = require('path')//win和linux的路径写法不一样，这就需要path模块，自动识别。
var fs = require('fs')//读写文件
var url = require('url')//自动解析复杂url，得到信息，无需再用正则，自动提取字段，如pathname，href等。


function staticRoot(staticPath, req, res){
  console.log(staticPath)
  
  console.log(req.url)
  var pathObj = url.parse(req.url, true)//自动解析复杂url，自动提取字段，如pathname，href等。
  console.log(pathObj)
  
  //localhost8080没有指明文件，就默认读取index.html
  if(pathObj.pathname === '/'){
    pathObj.pathname += 'test.html'
  }
  

  var filePath = path.join(staticPath, pathObj.pathname)//路径：资源文件夹路径+文件名
  
  // var fileContent = fs.readFileSync(filePath,'binary') //同步地 读文件
  // res.write(fileContent, 'binary')
  // res.end()
  
  
  fs.readFile(filePath, 'binary', function(err, fileContent){ //异步地读文件，读取格式为二进制（这样图片文字都能读取）
    if(err){//读文件时，若出错了
      console.log('404')
      res.writeHead(404, 'not found')
      res.end('<h1>404 Not Found</h1>')
    }else{
      console.log('ok')
      res.writeHead(200, 'OK')
      res.write(fileContent, 'binary')//读到文件后，以二进制格式发送
      res.end()      
    }
  })
  
}


console.log(path.join(__dirname, 'static'))

//当返回的数据由js/css/图片 等资源的链接，浏览器会自动进一步请求并返回
var server = http.createServer(function(req, res){
  staticRoot(path.join(__dirname, 'static'), req, res)
})//__dirname为nodejs内置变量，代表当前模块的路径名。其与 主机系统内的static文件 join，以自动地生成一个
//准确的绝对路径，手动的路径可能会错误。

server.listen(8080)
console.log('visit http://localhost:8080' )