<template>
  <div id="app">
    <Header/>
    <div class="main">
      <!-- <PostList/> 这里会显示不同路由指向的不同组件，直接写在这里就只显示PostList组件 -->
      
      <router-view name='sidebar'></router-view> <!-- sidebar的css是float:right, 要放到前面，因为普通block块盒元素（非浮动）正常展位（从上到下），看不见浮动元素，浮动元素等于不存在且覆盖在普通块盒元素之上，但块元素内的文本会看见浮动元素并让位。所以，浮动并不是“绝对”的脱离文档流。
但“绝对定位”的元素彻底脱离文档流，各个元素之间是完全发现不了的，会相互遮盖。 -->
      <router-view name="main"></router-view> <!--router-view用 组件名name和当前页面所在的路由url 找到需要渲染的组件，name为 所渲染的路由内的组件key名，见router/index.js。所以, 一个路由文件内 不同路由的组件可以同名-->
      
    </div> <!--跳转过程：当在PostList点击router-link链接时，跳转到路由(名为post_content)，此处的router-view显示Article.vue，不再显示PostList.vue -->
  </div>
</template>

<script>
import Header from './components/Header'
//import PostList from './components/PostList'

export default {
  name: 'App',
  components:{
    Header //等价于Header:Header, es6同名省略键值对写法。第2个Header是引入的代码模块，第1个Header是在此文件内 给组件的命名（键值对的key名）。
    //,PostList 有了router-view就不需要引入了
  }
}
</script>

<style>
.main{
  width: 80%;
  margin: 0 auto;
}
</style>
