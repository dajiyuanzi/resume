// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app', //el 用于指定一个页面中己存在的 DOM 元素来挂载 Vue实例,可以是标签。也可以是css语法--此处是index.html
  router,  //路由文件./router/index.js里包含了./components/里的组件
  components: { App },
  template: '<App/>'
})

//添加过滤器
Vue.filter('formatDate', function(str){
  if (!str) return ''
  var date = new Date(str)
  var time = new Date().getTime() - date.getTime() //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  if (time < 0) {
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前'
  } else {
    return parseInt(time / 31536000000) + '年前'
  }
})

//处理帖子分类标签span上的文字
Vue.filter('tabFormatter', function(post){
  if(post.good == true){
    return '精华'
  }
  else if(post.top == true){
    return '置顶'
  }
  else if(post.tab == 'ask'){
    return '问答'
  }
  else if(post.tab=='share'){
    return '分享'
  }
  else{
    return '招聘'
  }
})

