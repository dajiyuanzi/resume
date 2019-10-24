// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//Vuex代码 全部转移到state/index.js里
// import Vuex from 'vuex'
// Vue.use(Vuex)

//创建状态仓库
// var store = new Vuex.Store({
//   state:{
//     num:88
//   },
//   mutations:{//mutations属性内 定义我们的状态改变函数
//     increase:function(state){//es5
//       state.num++;
//     },
//     decrease(state){//es6
//       state.num -= 20;
//     }
//   },
//   actions:{//actions中只能对mutation进行操作
//     decreaseAction:function(context){//context为上下文对象
//       //同步操作
//       context.commit('decrease')

//       //异步操作
//       // setTimeout(function(){
//       //   context.commit('decrease')
//       // }, 1000)
//     }
//   },
//   getters:{//组件一般不直接用computed获取 mutations修改的状态信息，而是配合 getters，并在内设定一些判断/处理
//     getNum(state){
//       return state.num > 0 ? state.num : 0;
//     }
//   }
// })

import store from './state/index.js'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, //es6语法中，键和值一样，就可以 省略写, 即等价于router:router
  store, //注入状态库
  components: { App },
  template: '<App/>' //组件名和其渲染的dom名是一样的，因为使用App组件，才用<App/>
})

/*Vue项目结构的运作流程
1 首先，项目webpack加载各个文件，先加载main.js；
2 main.js加载了 路由数据(router/index.js) 和 页面组件App.vue，三者代码 将一起作用，产出 某个url路由 所指向的页面，渲染在index.html
3 App.vue中的<router-view> 将渲染呈现出 路由指向的组件HelloWorld.vue，其是由 main.js加载的路由index.js 所指向的
4 组件HelloWorld.vue中也可以调用渲染别的组件, 形成父子组件关系 （import，注入components属性，写在template标签）
*/
