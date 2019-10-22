<template>
  <div class="hello">
    <h3>我是axiosAPP，用来发送请求，拦截响应</h3>
    <button @click="getData">GET方式 发送请求</button>
    <button @click="postData">POST方式 发送请求</button>
    <ul>
      <li v-for="(item, key) in items" v-bind:key="key"> <!--引号的key是vfor引号内的数，相当于data，冒号的key属于框架指令，相当于class-->
        {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from "vue"

import axios from 'axios'
import qs from 'qs'
Vue.prototype.$http = axios //这样可用this.$xxx发送请求（this指代vue实例） .$xxx名称任意($符在js很多意义，此处表 原型上的函数/对象)

export default {
  name: 'HelloWorld',
  data () {
    return {
      items:[]
    }
  },
  methods:{
    getData(){
      var self = this
      this.$http.get('https://cnodejs.org/api/v1/topics?pag=1&limit=15'  /*, {  两种传递参数的方法
        params:{
          page:1,
          limit:10
        }
      }*/) //get方式 发送请求
        .then(function(res){ //基于promise，此为 成功 状态下 返回的数据
          console.log(res.data.data) //拦截响应
          
          //此处的this指向的不是当前vue实例----所以在前面把外面的this赋值self 
          self.items = res.data.data
        })
        .catch(function(err){ //基于promise，此为 失败 状态下 返回的数据
          console.log(err)
        })
    }
  },
  postData(){
    //var self = this
    //post方式 发送请求
    this.$http.post(url, qs.stringify({ //get就不需要qs插件
      page:1,
      limit:20
    }))
      .then(res=>{
        //self.items = res.data.data
        this.items = res.data.data
        console.log(res.data.data)
      })
      .catch(function(err){ //基于promise，此为 失败 状态下 返回的数据
        console.log(err)
      })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* h1, h2 {
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
} */
</style>
