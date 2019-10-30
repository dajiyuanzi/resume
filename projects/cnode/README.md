#预览地址


#源码



# Vue-Cli 的构建 与Github Page上部署 
(本质:就是此命令把项目内的代码编译, 生成静态网页的文件,放到dist文件夹(distribution); 然后把这个文件夹的内容单独上传, github page 预览它的 dist/index.js 就可以了)
npm run build


如果打算将项目部署到 https://<USERNAME>.github.io/ 上, publicPath 将默认被设为 "/"，你可以忽略这个参数。
如果打算将项目部署到 https://<USERNAME>.github.io/<REPO>/ 上 (即仓库地址为 https://github.com/<USERNAME>/<REPO>)，可将 publicPath 设为 "/<REPO>/"。举个例子，如果仓库名字为“my-project”，那么 vue.config.js 的内容应如下所示：(run build 前必做:  就是在最开始的第一层目录, 建一个文件叫vue.config.js, 然后里面粘进去下面的这一小段代码, 并修改自己的github page下的文件路径, 这里仓库名是my-project)
已把构建时所用的vue.config.js 放在dist文件夹旁边