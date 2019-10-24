// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

/*Vue项目结构的运作流程
1 首先，项目webpack加载各个文件，先加载main.js；
2 main.js加载了 路由数据(router/index.js) 和 页面组件App.vue，三者代码 将一起作用，产出 某个url路由 所指向的页面，渲染在index.html
3 App.vue中的<router-view> 将渲染呈现出 路由指向的组件HelloWorld.vue，其是由 main.js加载的路由index.js 所指向的
4 组件HelloWorld.vue中也可以调用渲染别的组件, 形成父子组件关系 （import，注入components属性，写在template标签）
*/
