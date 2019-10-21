<template>
  <div class="hello">
    <h1>HELLO EARTH</h1>
    <h2>Essential Links</h2>
    我是传递过来的参数：====<h3>{{$route.params.earthmsg}}</h3>
    <hr>
  </div>
</template>

<script>
export default {
  name: 'HelloEarth', //代码作为模块的代号名称，类似全局id，可便于定位报错和传递参数等
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 *{
   color: blue;
 }
</style>
