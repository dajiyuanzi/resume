<template>
  <div>
    <span>我是父组件</span>------拿到的子组件数据：{{fromSonMsg}} <br>
    我是父组件中 拿到的全局状态：{{getCount}} <br>
    <button @click="padd">父组件--改变状态按钮</button>
    <button @click="paddaction">父组件--改变状态按钮(action)</button>
    <hr>

    <son :msg="toSonMsg"  @handle="getMsgFromSon"> <!-- 在此渲染子组件，父组件数据传给 子组件props中msg接收；子组件发给父组件，用自定义的handle事件 -->
    </son><!-- 这个son标签的名字，就是import模块的变量名，无关于 模块的文件名&name属性 -->
  </div>
</template>

<script>
  import son from './son'

  export default {
    name:"parent",
    data:function() {
      return {
        toSonMsg:'我是你的父亲',
        fromSonMsg:''
      }
    },
    components:{
      son
    },
    methods:{
      getMsgFromSon:function(value){
        this.fromSonMsg = value
      },
      padd(){ //在不同的组件内，获取状态仓库的对象，并调用 状态改变函数
        this.$store.commit('increase') 
      },
      paddaction(){
        this.$store.dispatch('decreaseAction')
      }
    },
    computed:{ //组件一般不直接用computed获取 mutations修改的状态信息，而是配合store的 getters，其内设定一些判断/处理
      getCount:function(){
        //return this.$store.state.num
        return this.$store.getters.getNum
      }
    }
  }
</script>

<style scoped>

</style>