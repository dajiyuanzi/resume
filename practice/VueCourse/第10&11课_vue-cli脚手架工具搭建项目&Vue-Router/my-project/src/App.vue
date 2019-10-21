<template>
  <div id="app">
    <router-view></router-view> <!--组件模板就渲染于此-->


    <img src="./assets/logo.png">

    <list/>
  </div>
</template>

<script>
//该页面组件 是首页，展示了其他页面的链接
//import HelloWorld from './components/HelloWorld'
import list from './components/list' //引入 组件资源

export default{
  name:'App',
  data:function(){
    return {
    }
  },
  components:{
    list //注入 组件渲染，该组件里有其他组件的跳转链接
  }
}

/*export default {
  name: 'App',
  components: {
    HelloWorld
  }
}*/
</script>

<style>
#app { /*此处样式只在此处能起作用*/ 
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
