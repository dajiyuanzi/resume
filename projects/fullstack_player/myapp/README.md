
本课程路由跳转是依靠前端的react-router，所以 routes/user.js 用于控制后端接口的配置，则webpack.config.js的entry将根路径"/"指向client/index.js。前端中的axios会发出ajax，向 后端的路由接口 请求数据。

运行 npm run server 
运行 mongod，再运行mongo


 React-Redux的运作流程：
 在client文件夹下，pages和components内的react组件渲染时(这些组件都 嵌在 index.js的路由内)，声明周期componentDidMount触发调用了action；
 client/acrions内定义了 向后端获取数据的函数，被/reducer内的reducer函数调用，处理获取的数据；
 之后，/reducer/rootReducer.js将所有reducer合并(combineReducers)，以创建store，index.js内的provider将引用此store。
 store对象内含有 不同层级组件间共用的状态数据，共用状态数据实现了方便的数据更新渲染。




## 项目文件结构
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


## 部分项目的搭建过程
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