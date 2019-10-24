<template>
  <div>
    我是outter组件(非父子关系) 拿到的全局状态: {{getOutterCount}}
    <br />
    <button @click="oadd">outter组件--改变状态按钮</button>
    <button @click="oaddaction">outter组件--改变状态按钮(action)</button>
  </div>
</template>

<script>
// 一般，父子之间传递数据较方便，若非父子组件间要拿到数据，只能让组件都有共同的父组件；但真实情况下，组件很多上百，要给组件都设置共同的父组件，会很麻烦。
// 若一个组件，和别的组件 非直接的父子关系，但之间仍需要 共享状态信息----这就是需要 Vuex

export default {
  name: "outter",
  computed: {
    getOutterCount: function() {
      return this.$store.state.num;
    }
  },
  methods: {
    oadd() {
      this.$store.commit("increase");
    },
    oaddaction(){
      this.$store.dispatch('decreaseAction')
    }
  }
};
</script>

<style scoped>
</style>