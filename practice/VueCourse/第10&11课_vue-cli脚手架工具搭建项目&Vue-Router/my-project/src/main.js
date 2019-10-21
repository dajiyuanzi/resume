//入口文件
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' //没有"./"，指从node_module中获取
import App from './App' //就是App.vue

import rt from './router/index' //记录了组件的路由路径, 因为开发中有几十上百的路由，所以router代码要放到单独的文件模块

Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: rt,
  components: { App },
  template: '<App/>'
})

//各种资源都被分到不同的页，如list页等，在App页内集中展现
