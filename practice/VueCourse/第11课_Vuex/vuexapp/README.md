

# Vue项目结构的运作流程
1 首先，项目webpack加载各个文件，先加载main.js；
2 main.js加载了 路由数据(router/index.js) 和 页面组件App.vue，三者代码 将一起作用，产出 某个url路由 所指向的页面，渲染在index.html
3 App.vue中的<router-view> 将渲染呈现出 路由指向的组件HelloWorld.vue，其是由 main.js加载的路由./route/index.js 所指向的
4 组件HelloWorld.vue中也可以调用渲染别的组件, 形成父子组件关系 （import，注入components属性，写在template标签）




# vuexapp

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
