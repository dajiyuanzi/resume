<template>
  <ul>
    <li>
      <!-- <router-link to="helloworld">HELLO WORLD</router-link> -->
      <router-link :to="{name:'helloworld', params:{worldmsg:'你好世界'}}">HELLO WORLD</router-link>
      <!--固定格式，必须是name和params。冒号是v-bind, 否则会把{}内容 作字符串而非变量-->
      <!--跳转到哪个组件，哪个组件就 接收信息-->
    </li>
    <li>
      <!-- <router-link to="helloearth">HELLO EARTH</router-link> -->
      <router-link :to="{name:'helloearth', params:{earthmsg:'你好地球！'}}">HELLO EARTH</router-link>
    </li>
  </ul>
</template>

<script>
//该组件把 其他组件的路由链接 展示出来，用户可点击跳转
export default {
  name: 'list'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  li{
    margin: 3px
  }
</style>