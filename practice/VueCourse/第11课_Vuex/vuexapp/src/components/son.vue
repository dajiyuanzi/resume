<template>
  <div>
    <span>我是子组件</span>----拿到的父组件数据：{{msg}} <br>
    ----我是子组件中 拿到的全局状态: {{getNum}} <br>
    <button @click="sendMsgToFather">向父组件传递数据</button><br>
    <button @click="saddaction">子组件--改变状态按钮(action)</button>
  </div>
</template>

<script>
  export default {
    name:"son",
    props:{
      msg:{
        type: String,
        default:''
      }
    },
    data:function(){
      return {
        toFatherMsg:'我是你的son'
      }
    },
    methods:{
      sendMsgToFather:function(){
        this.$emit('handle', this.toFatherMsg)
      },
      sadd(){
        this.$store.commit('increase')
      },
      saddaction(){
        this.$store.dispatch('decreaseAction')
      }
    },
    computed:{
      getNum:function(){
        return this.$store.state.num
      }
    }
  }
</script>

<style scoped>

</style>