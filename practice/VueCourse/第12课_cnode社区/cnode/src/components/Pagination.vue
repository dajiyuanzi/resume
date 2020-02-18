<template>
  <div class="pagination">
    <button @click="changeBtn">首页</button>
    <button @click="changeBtn">上一页</button>
    <button v-if="judge" class="pagebtn">......</button>
    <!-- key就是防止报错 --> <!-- changeBtn点击改变页码 -->
    <button v-for="(btn, key) in pagebtns" :key="key" @click="changeBtn(btn)" 
    :class="[{currentPage: btn==currentPage}, 'pagebtn']"> <!-- 当前页的样式，用v-bind绑定: 第1个currentPage是类名(style对象)，第2个
    是data里的数据(当前页), 第2个与btn相同，则返回true，用currentPage和pagebtn样式；否则，只用pagebtn(算默认样式) -->
      {{btn}}
    </button>
    <button @click="changeBtn">下一页</button>
  </div>
</template>

<script>
import $ from 'jquery' //在项目文件内执行 npm install jquery

export default {
  name: "Pagination",
  data(){
    return {
      pagebtns:[1,2,3,4,5,'......'],
      currentPage: 1,
      judge:false //判断 页码栏左侧的“...”按钮 是否出现
    }
  },
  methods:{
    changeBtn(page){//点击改变页码
      //点击的是 上一页/下一页按钮，而不是页码
      if(typeof page != 'number'){
        switch(page.target.innerText){
          case '上一页':
            $('button.currentPage').prev().click();//jQuery选择器，$('E.C')既是元素E又有calss C；prev获取匹配元素之前的同辈元素；click触发点击事件
            break;
          case '下一页':
            $('button.currentPage').next().click();
            break;
          case '首页':
            this.pagebtns = [1,2,3,4,5,'......']; //点击首页时，就要重置页码展示
            this.changeBtn(1);
            break;
          default:
            break;
        }
        return //退出，防止执行下面的
      }

      this.currentPage = page

      //判断 页码栏左侧的“...”按钮 是否出现
      if(page>4){
        this.judge = true
      }
      else{
        this.judge = false
      }

      //页码只显示5个，往后/往前点多了，前面/后面的会被挤掉
      if(page == this.pagebtns[4]){ //朝后翻页
        this.pagebtns.shift() //移除第1个元素 只剩4个了 原先的第5个成第4个
        this.pagebtns.splice(4, 0, this.pagebtns[3]+1) //添加尾部页码: 剩余只有4个数，splice的下标从1开始，所以在第4个数pagebtn[3] 后添加
      }
      else if(page==this.pagebtns[0] && page!=1){//朝前翻页
        //先在第1个位置加1个
        this.pagebtns.unshift(this.pagebtns[0]-1)

        //移除最后1个数字
        this.pagebtns.splice(5, 1)
      }
      this.$emit('handleList', this.currentPage) //向其父组件PostList发送 点击的页码
    }
  }
}
</script>

<style scoped>
  .pagination {
    margin-top: 5px;
    margin-bottom: 20px;
    background-color: white;
    padding: 6px 20px;
    border-radius: 5px;
    /*box-shadow: 0px 2px 9px #888888;*/
    border: 1px solid #888888;
  }

  button {
    background-color: #fff;
    border: 1px solid #ddd;
    color: #778087;
    border-radius: 3px;
    outline: none;
    height: 21px;
    cursor: pointer;
    padding: 0 2px;
    width: 55px;
    height: 29px;
  }

  .pagebtn {
    position: relative;
    bottom: 1px;
    width: 40px;
    margin: 0 4px;
  }

  .currentPage {
    color: white;
    background-color: #1f1b1b;

  }
</style>
