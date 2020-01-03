var http = require('http')
var path = require('path')
var fs = require('fs')
var url = require('url')

//req.query是get对应 的数据，req.body是post对应的数据。

var routes = {//路由：不同url申请，对应不同的函数来读取url的文件路径，再写入response数据到流中
  '/a': function(req, res){ //路由为 /a/?a=xxx, 就返回request中的参数{'a':'xxx'}
    res.end(JSON.stringify(req.query))
  },

  '/b': function(req, res){
    res.end('match /b') //返回字符传'match /b'
  },

  '/a/c': function(req, res){
    res.end('match /a/c')
  },

  '/search': function(req, res){
    res.end('username='+req.body.username+',password='+req.body.password)

  }

}


var server = http.createServer(function(req, res){
  routePath(req, res)
})

server.listen(8080)
console.log('visit http://localhost:8080' )


function routePath(req, res){
  var pathObj = url.parse(req.url, true)
 
  var handleFn = routes[pathObj.pathname]
  if(handleFn){
    req.query = pathObj.query

    //参考 https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/
    // post json 解析
    var body = ''
    req.on('data', function(chunk){
      body += chunk
    }).on('end', function(){
      req.body = parseBody(body)
      handleFn(req, res)
    })
    
  }else {
    staticRoot(path.resolve(__dirname, 'static'), req, res)//请求的url没有找到对应的文件，就当作静态文件处理，从static文件夹中找文件. path.resolve:方法会把一个路径或路径片段的序列解析为一个绝对路径。
  }
}

function staticRoot(staticPath, req, res){
  var pathObj = url.parse(req.url, true)
  var filePath = path.join(staticPath, pathObj.pathname)
  fs.readFile(filePath,'binary', function(err, content){
    if(err){
      res.writeHead('404', 'haha Not Found')
      return res.end()
    }

    res.writeHead(200, 'Ok')
    res.write(content, 'binary')
    res.end()  
  })

}

function parseBody(body){
  console.log(body)
  var obj = {}
  body.split('&').forEach(function(str){
    obj[str.split('=')[0]] = str.split('=')[1]
  })
  return obj
}