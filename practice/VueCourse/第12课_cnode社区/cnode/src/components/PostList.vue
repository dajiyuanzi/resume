
<template>
  <div class="PostList">
    <!-- 在数据未返回的时候，显示这个正在加载的gif -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>

    <!-- 代表我们的主题帖子列表 -->
    <div class="posts" v-else> <!--velse与上面的vif呼应-->
      <ul>
        <li>
          <div class="toobar">
            <span>全部</span>
            <span>精华</span>
            <span>分享</span>
            <span>问答</span>
            <span>招聘</span>
          </div>
        </li>

        <li v-for="(post,key) in posts" v-bind:key="key"> <!--vbind旁，引号的key是v-for引号内的数，本质是 实例的data，冒号的key属于框架指令，相当于class-->
          <!-- 头像 -->
          <img :src="post.author.avatar_url" alt=""> <!--post+json的数据格式-->
          <!-- 回复/浏览 -->
          <span>
            <span class="reply_count">{{post.reply_count}}</span><!--回复内容-->
            /{{post.visit_count}}
          </span>
          <!-- 帖子的分类 class动态绑定: 若帖子json中的“精华/置顶”属性为true，则让相应的css类为true-->
          <span :class="[{put_good:(post.good == true), put_top:(post.top==true), 
          'topiclist-tab':(post.good != true)}]"> <!--topiclist-tab不加引号 会报错-->
            <span>{{post | tabFormatter}}</span>
          </span>
          <!-- 标题&文章路由链接 -->
          <router-link :to="{ //注：用v-bind
            name:'post_content',//路由名称
            params:{
              id:post.id, //路由参数为id,post是组件的data，储存着请求返回的数据
              name:post.author.loginname
            }
          }"> <!-- 跳转过程：当点击router-link链接时，跳转到路由(名为post_content)并传递参数id，App.vue内的router-view显示组件Article.vue，不再显示PostList.vue -->
            <span>
              {{post.title}}
            </span>
          </router-link>
          <!-- 最终回复时间 -->
          <span class="last_reply">
            {{post.last_reply_at | formatDate}}
          </span>
        </li>

        <li><!-- 分页，子组件pagination给父组件postlist传递数据,以实现 点击翻页请求更多数据 -->
          <pagination @handleList="renderList"></pagination>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import pagination from './Pagination'

  export default {
    name: "PostList",
    data(){
      return {
        isLoading: false,
        posts:[], //代表页面的列表数组
        postpage:1 //接收子组件pagination传来的数据(点击的页码)
      }
    },
    components:{
      pagination
    },
    methods:{
      getData(){//Axios
        this.$http.get('https://cnodejs.org/api/v1/topics', {
          params:{
            page:this.postpage,
            limit:20
          }
        })
        .then(res=>{
          this.isLoading=false //加载成功后，去除 加载动画
          //console.log('lala')
          //console.log(res)
          this.posts = res.data.data //返回的数据json格式中有data属性下的data属性
        })
        .catch(function(err){
          //处理返回失败后的问题
          console.log(err)
        })
      },
      renderList(value){//分页，子组件pagination给父组件传递数据(点击的当前页码),以实现 点击翻页 请求更多数据
        this.postpage=value
        this.getData() //接收到子组件的数据，就再发请求
      }
    },
    beforeMount(){
      this.isLoading=true //加载成功之前 显示加载动画
      this.getData() //在页面加载之前 获取数据
    }
  }
</script>

<style scoped>

  .PostList{
    background-color: #e1e1e1;
  }
  .posts {
    margin-top: 10px;
  }

  .PostList img {
    height: 30px;
    width: 30px;
    vertical-align: middle;
  }

  ul {
    list-style: none;
    width: 100%;
    max-width: 1344px;
    margin: 0 auto;
  }

  ul li:not(:first-child) { /*子元素中，除外第一个 */
    padding: 9px;
    font-size: 15px;
    font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
    font-weight: 400;
    background-color: white;
    color: #333;
    border-top: 1px solid #f0f0f0;
  }

  li:not(:first-child):hover {
    background: #f5f5f5;;
  }

  li:last-child:hover {
    background: white;
  }

  li span {
    line-height: 30px;
  }

  .allcount {
    width: 70px;
    display: inline-block;
    text-align: center;
    font-size: 12px;
  }

  .reply_count {
    color: #9e78c0;
    font-size: 14px;
  }

  .put_good, .put_top { /* 帖子分类，good-精华，top-置顶 */ 
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
    margin-right: 10px;
  }

  .topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
    margin-right: 10px;
  }

  .last_reply {
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
    float: right;
    color: #778087;
    font-size: 12px;
  }

  .toobar {/* 第二顶部栏 “全部 精华 分享 问答 招聘” */
    height: 40px;
    background-color: #f5f5f5;
  }

  .toobar span {
    font-size: 14px;
    color: #80bd01;
    line-height: 40px;
    margin: 0 10px;
    cursor: pointer;
  }

  .toobar span:hover {
    color: #9e78c0;
  }

  a {
    text-decoration: none;
    color: black;
  }

  a:hover {
    text-decoration: underline;
  }

  .loading {
    text-align: center;
    padding-top: 300px;
  }
</style>







