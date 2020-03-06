本项目使用React和React-Router实现了一个Cnode社区，可以翻页查看帖子和帖子作者的信息，数据请求自Cnode官网。

# 技术难点
底部分页pagination.js页码的变动逻辑(pagination.js)。
Article.js中用componentWillReceiveProps解决“路由路径不变而参数变时,页面不刷新渲染”。
UserInfo.js中 数据初始化state变量赋值 空数组[]，防止 渲染时请求的数据没有返回而state变量为undefined。

本机运行可以，github page的部署有问题

## Available Scripts
In the project directory, you can run:

### `yarn start`
Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

