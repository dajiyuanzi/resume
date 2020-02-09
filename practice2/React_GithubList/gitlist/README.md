本项目用react和react-router实现，将页面的不同部分作为不同组件开发。

# 坑点：
1. footer的点击变色，要明确执行的生命周期 和 检查当前的window.location
2. 一个组件state状态变量 不会受到 它包含的路由router里 的组件的渲染而变化（见App.js）-- 点击路由不会触发路由所在组件的渲染，也就没有生命周期变动
3. 当直接更改地址时，整个页面刷新，触发所有组件的渲染；当点击路由link，不会触发整个页面刷新，只路由相关的组件内部会渲染，其它组件不会重新渲染（父组件页不渲染）
4. 出现报错:渲染的item有key重复（key都是数据的id，不会重复）--直接重启服务器yarn start 就可以。


# 该项目根据practice的mis38 jquery修改而来，可见 react与jQuery最大区别：
React不需要jQuery那样选择元素，而是把state和props变量 插入JSX 的class和style（虽然React也有ref，也可用原生getelementbyid）。

# 预览地址
http://dajiyuanzi.github.io/resume/practice2/React_GithubList/gitlist/build
初次在线预览 需要点击下 底部的功能



