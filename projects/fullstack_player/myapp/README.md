![runscreen](https://github.com/dajiyuanzi/resume/tree/master/projects/fullstack_player/myapp/netease.PNG)
![runscreen2](https://github.com/dajiyuanzi/resume/tree/master/projects/fullstack_player/myapp/netease2.PNG)

This is a course project that uses React, nodejs, mongodb, mongoose and redux. The backend and frontend code both together are integrated into this project.
  
In this project, the route jumping is developed by react-router of frontend, instead of rounte listeners of Node backend. As well, the node route (routes/user.js) listens to the data request towards the backend.  
  
app.js contains the configuration of database connection and cross-origin. bin/www.js create the server to listen to the request and response it.  
The "entry" attribute in webpack.config.js directs the root path "/" towards "client/index.js". The user's request is listened to by React route, and then the react code (frontend rendering in server) sends the request to the backend node for data. As well, Axios of frontend sends ajax to the API of backend for data. 
  
## How to Start
In Win, first execute the command 'mongod' to start the database MongoDB; then execute 'npm run server'. This workflow may needs open 2 GitBash windows.
Ahead it needs to install MongoDB and create a database named 'myapp'. In the database, the 'collection' (data table) is created by JS code automatically.   
    
  
****
  
本课程路由跳转是依靠前端的react-router (在/client/index.js)，故 node的路由(routes/user.js) 用于 监听 对后端数据的 请求。

app.js是 数据库连接&跨域的 相关配置，bin/www.js是创建服务器 以监听请求并响应。
webpack.config.js的entry将根路径"/"指向client/index.js，用户请求 是被react的路由所监听，react(服务器中前端渲染)的代码 发送请求 到后端node要数据。前端中的axios会发出ajax，向 后端的路由接口 请求数据。

## 启动运行
win上先运行命令 "mongod" 以开启数据库mongodb，再运行"npm run server"，这可能需要在项目文件下 开启2个gitbash窗口
需要安装mongodb，并创建数据库，命名为myapp。数据库中的collection(数据表)由js代码 自动创建。


## React-Redux的运作流程：
 在client文件夹下，pages和components内的react组件渲染时(这些组件都 嵌在 index.js的路由内)，声明周期componentDidMount触发调用了action；

 client/acrions内定义了 向后端获取数据的函数，被/reducer内的reducer函数调用，处理获取的数据；

 之后，/reducer/rootReducer.js将所有reducer合并(combineReducers)，以创建store，index.js内的provider将引用此store。

 store对象内含有 不同层级组件间共用的状态数据，共用状态数据实现了方便的数据更新渲染。

 可以用 client/components/Home/rank.js开始，一探究竟。


## 后端
在项目中，mongoose操作 mongodb 数据，mongoose 是 Node.js 下的 mongodb 的 orm 框架，能用面向对象的方式去操作数据库。在实现用户模块时，使用express-session模块来管理 session 状态，express-generator 模块是 express 的应用生成器。在接口传输数据时，使用json格式的数据，借助body-parser模块来进行解析。

## 项目前后端的配置过程
先创建express架构：express -e myapp
然后在webpack.config.js中写入其它需要的配置，如babel等前端资源依赖的配置。
运行npm run start将依赖资源安装。



### 项目文件结构
```
├── app.js    
├── bin
│   └── www         用于创建一个http服务器
├── package.json      
├── public          存储所有静态文件目录
│   ├── imgs  
│       └── style.css
│   ├── js 
│   ├── css   
│   ├── fonts       fontawesome 存储目录
│        ├── css
│        └── fonts
│   ├── svgs
│   ├── index.html(内容与views->index.ejs一致)
├── views           视图目录
│   ├── error.ejs
│   ├── index.ejs
├── server          视图目录
│   ├── routes
│        └── user.js
│   ├── models        
|   ├── schemas
├── mongoDB         存放所有mongoDB的表 
└── client
|   ├── actions     action 存储目录
|   ├── components  组件存储目录
|   ├── pages       页面存储目录
|   ├── reducers    reducers存储目录
|   ├── store       store存储目录
|   ├── styles      页面的less文件储存目录
|   ├── index.js    前端入口文件+路由配置文件
```


### 其它部分项目的搭建过程
$ npm install express-generator -g #下载Express 应用生成器  
$ express -e myapp   #创建一个应用(-e表示ejs模板，没有就是默认jade)  
$ cd myapp #进入项目目录  
   
 DEBUG=myapp npm start #(MacOS 或 Linux 平台) / set DEBUG=myapp & npm start(Windows) 


配置webpack
$ npm install webpack --save  #本项目中安装webpack  
$ touch webpack.config.js  #确保在根部录下创建  
$ npm install less babel-loader style-loader file-loader css-loader less-loader url-loader --save-dev #下载webpack的所有loader  
$ npm install extract-text-webpack-plugin compression-webpack-plugin --save-dev  
$ mkdir client  
$ cd client  
$ touch index.js #这里的index.js作为webpack的入口文件，同时也作为react项目中路由的配置文件  
  
配置 babel  
$ npm install babel-core --save-dev  
$ npm install babel-preset-es2015 --save-dev  #支持ES2015  
$ npm install babel-preset-react --save-dev #支持jsx  
$ npm install babel-preset-stage-0 --save-dev #支持ES7  
$ npm install babel-polyfill --save-dev   
  
配置mongoose  
npm install mongoose --save //save将安装也记录到package.json  
  
服务器自动重启和前端自动编译，从而实现热更新  
在 /myapp 下下载 webpack-dev-middleware 和 webpack-hot-middleware  
$ npm install webpack-dev-middleware webpack-hot-middleware --save-dev   

服务器监听重启  
$ npm install supervisor -g   
$ npm install cross-env --save-dev   
  
启动服务器  
npm run server  
  
antd-moblie 使用配置  
$ npm install antd-mobile --save  
$ npm install babel-plugin-import svg-sprite-loader --save-dev  
babel-plugin-import 是一款 babel 插件，它会在编译过程中将 import 的写法自动转换为按需引入的方式。 svg 文件(矢量图)处理。  
  
  
 npm i rc-form --save-dev  