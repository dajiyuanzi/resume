# Vue-CLI实现CNode社区
本项目利用CNode社区提供的API，使用Vue-CLI手脚架、Vue组件、Vue-router、Axios搭建仿CNode社区项目，并重新布局。

#预览地址
https://dajiyuanzi.github.io/resume/projects/cnode/dist/#/

#源码
https://github.com/dajiyuanzi/resume/tree/master/practice/VueCourse/%E7%AC%AC12%E8%AF%BE_cnode%E7%A4%BE%E5%8C%BA/cnode

# 运作流程
main.js里的路由和组件挂载渲染到index.html上。路由/route/index.js指向的view，渲染在App.vue的router-view上。


# Vue-Cli 的构建 与Github Page上部署 
(本质:就是此命令把项目内的代码编译, 生成静态网页的文件,放到dist文件夹(distribution); 然后把这个文件夹的内容单独上传, github page 预览它的 dist/index.html 就可以了)

执行命令 npm run build

如果打算将项目部署到 https://< USERNAME >.github.io/ 上, publicPath 将默认被设为 "/"，你可以忽略这个参数。

如果打算将项目部署到 https://< USERNAME >.github.io/< REPO >/ 上 (即仓库地址为 https://github.com/< USERNAME >/< REPO >)，可将 publicPath 设为 "/< REPO >/"。举个例子，如果仓库名字为“my-project”，那么 vue.config.js 的内容应如下所示：
```
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
  ? '/my-project/'
  : '/'
}
```
(run build 前必做:  就是在最开始的第一层目录, 建一个文件叫vue.config.js, 然后里面粘进去这一小段代码, 并修改自己的github page下的文件路径, 这里仓库名是my-project)

现已把构建时所用的vue.config.js 放在dist文件夹旁边

# PS
可能还需要，在config目录下，找到index.js，将其内的 build:{assetsPublicPath} 改成如下，斜杠前加个点，然后再run build.
![path_fix](https://github.com/dajiyuanzi/resume/blob/master/projects/cnode/path_fix.png)

# 项目技术栈
Vue-CLI 3:对比Vue-CLI 2.x，3.x集成度更高，在创建项目时提供常用插件。

Vue-router:进行路径管理。

Axios:基于Promise，用于浏览器和Node.js的HTTP客户端，改写Vue原型链，并把Axios挂载其上。

# 预览截图
![cnode](https://github.com/dajiyuanzi/resume/blob/master/projects/cnode/cnode.PNG)
