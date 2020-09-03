This project is implemented with react and react-router, develops different parts of the page as different components, and uses axios to process ajax requests.
本项目用react和react-router实现，将页面的不同部分作为不同组件开发，并使用axios处理ajax请求。

# Demo Link 预览地址 
When open this link, please click the the bottom button of function. 
http://dajiyuanzi.github.io/resume/practice2/React_GithubList/gitlist/build
初次在线预览 需要点击下 底部的功能

# English Summary
## Challengs & Learning
1. The feature, clicking the footer and changing its color,needs to clarify the life cycle and check the current Window.location.
2. The state variable of a component cannot get changed by the rendering of other components even in the route that this component contains (see App.js) ---- that is to say, clicking the <route> cannot trigger the rendering update of the component where the route is located, so there is no change on life cycle.
3. When the address is directly changed, the entire page is refreshed, triggering the rendering of all components. When the routing link is clicked, the entire page refreshing will not be triggered; instead, only the routing-related components will be rendered internally, and other components will not be re-rendered (that is, the parent component page does not Rendering).
4. An error occurs: the rendered item has a duplicate key (the key is the id of the data and will not be duplicated)-just restart the server yarn start.

## This project is reworked from /practice/mis38 (uses jQuery),  which shows the difference between jQuery & React:
React needn't select the dom in the way of jQuery; instead, it inserts the variable, state and props, into JSX's class and style (although React also has ref, native getelementbyid can also be used).

****

# Chinese Summary
## 坑点：
1. footer的点击变色，要明确执行的生命周期 和 检查当前的window.location
2. 一个组件state状态变量 不会受到 它包含的路由router里的组件的渲染 而变化（见App.js）-- 点击路由<route> 不会触发路由所在组件的渲染更新，也就没有生命周期变动
3. 当直接更改地址时，整个页面刷新，触发所有组件的渲染；当点击路由link，不会触发整个页面刷新，只路由相关的组件内部会渲染，其它组件不会重新渲染（即 父组件页不渲染）
4. 出现报错:渲染的item有key重复（key都是数据的id，不会重复）--直接重启服务器yarn start 就可以。


## 该项目根据practice的mis38 jquery修改而来，可见 react与jQuery最大区别：
React不需要jQuery那样选择元素，而是把state和props变量 插入JSX 的class和style（虽然React也有ref，也可用原生getelementbyid）。





