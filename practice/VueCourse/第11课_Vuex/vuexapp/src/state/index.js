
// webpack默认直接处理文件夹下的index.js

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//创建状态仓库
export default new Vuex.Store({
  state:{
    num:88
  },
  mutations:{//mutations属性内 定义我们的状态改变函数
    increase:function(state){//es5
      state.num++;
    },
    decrease(state){//es6
      state.num -= 20;
    }
  },
  actions:{//actions中只能对mutation进行操作
    decreaseAction:function(context){//context为上下文对象
      //同步操作
      context.commit('decrease')

      //异步操作
      // setTimeout(function(){
      //   context.commit('decrease')
      // }, 1000)
    }
  },
  getters:{//组件一般不直接用computed获取 mutations修改的状态信息，而是配合 getters，并在内设定一些判断/处理
    getNum(state){
      return state.num > 0 ? state.num : 0;
    }
  }
})