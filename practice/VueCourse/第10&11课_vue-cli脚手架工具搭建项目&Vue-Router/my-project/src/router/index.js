import router from 'vue-router'
import Vue from 'vue'
import HelloWorld from '../components/HelloWorld'
import HelloEarth from '../components/HelloEarth'

Vue.use(router)

//配置路由,并导出为模块, 因为开发中有几十上百个路由，所以router代码 要放到单独的文件模块
export default new router({ //一个路由实例
  routes:[{  
    name:'helloworld',
    path:'/helloworld/:worldmsg', //指定 要跳转的路径 和传递的参数
    component:HelloWorld //指定要跳转的组件  
  }, {  
    name:'helloearth',
    path:'/helloearth/:earthmsg', 
    component:HelloEarth  
  }]
})

