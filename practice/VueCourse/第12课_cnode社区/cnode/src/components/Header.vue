<template>
  <div class="header">
    <!-- <a href="/"><img src="../assets/cnodejs_light.svg" alt=""></a> -->
    <router-link :to="{
      name:'root'
    }">
      <img src="../assets/cnodejs_light.svg" alt="">
    </router-link>
    <ul>
      <li><a href="/">首页</a></li> <!--a href的路径，没指明协议，自动拼接到url，作为路由的路径了-->
      <li><a href="#">新手入门</a></li>
      <li><a href="#">API</a></li>
      <li><a href="#">关于</a></li>
      <li><a href="#">注册</a></li>
      <li><a href="#">注册登录</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Header"
  }
</script>

<style scoped>/*scoped 表示只对当前这个组件内的代码有效*/
.header{
  background-color:#5a5555;
  height:50px;
}

img{
  max-width: 120px;
  margin-left: 50px;
  margin-top: 10px;
}

ul{
  list-style: none; /* ul的小点点样式，none是没有 */
  float: right; /*漂浮在图片上，不在普通流了*/
  margin: 4px; /*改小外边距，防止下移 */
}

li{
  display: inline-block; /* 让li有行内属性，从而 水平*/
  padding: 10px 15px;
}

a{
  text-decoration: none;
  color: #ccc;
  font-size: 14px;
  text-shadow: none;
}
</style>