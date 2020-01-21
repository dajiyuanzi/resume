## 我的项目搭建过程


$ npm install express-generator -g #下载Express 应用生成器
$ express -e myapp   #创建一个应用(-e表示ejs模板，没有就是默认jade)
$ cd myapp #进入项目目录
 
 DEBUG=myapp npm start #(MacOS 或 Linux 平台) / set DEBUG=myapp & npm start(Windows) 

├── app.js    
├── bin
│   └── www           用于创建一个http服务器
├── package.json      
├── public            存储所有静态文件目录
│   ├── images        修改为：imgs，图片目录
│   ├── javascripts   修改为：js，压缩后js存放目录
│   └── stylesheets   修改为：css,存储压缩后css
│       └── style.css
├── routes            路由目录
│   ├── index.js      首页路由
│   └── users.js      user路由
└── views             视图目录
    ├── error.ejs
    ├── index.ejs


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
