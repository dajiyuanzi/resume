<template>
  <div class="hello">
    <parent/> <!-- 这个parent标签的名字，就是import模块的变量名，无关于 模块的文件名&name属性 -->
    <hr>
    <outter></outter>
  </div>
</template>

<script>
import parent from './parent'
import outter from './outter'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    parent,
    outter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
