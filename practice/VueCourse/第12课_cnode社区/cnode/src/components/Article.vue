
<template>
  <div class="article">
    <!-- 如果正在加载 显示此div -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <div v-else>
      <div class="topic_header">
        <div class="topic_title">{{post.title}}</div>
        <ul>
          <li>· 发布于: {{post.create_at | formatDate}}</li>
          <li>· 作者：{{post.author.loginname}}</li>
          <li>· {{post.visit_count}}次浏览</li>
          <li>· 来自{{post | tabFormatter}}</li>
        </ul>
        <div v-html="post.content" class="topic_content"></div> <!-- 因为帖子内容为markdown，所以用v-html -->
      </div>
      <div>
        <div class="topbar">回复</div>
        <div v-for="(reply, index) in post.replies" :key="index" class="replySec">
          <div class="replyUp">
            <!-- 点击用户头像/姓名，跳转至用户页 -->
            <router-link :to="{
              name:'user_info',
              params:{
                name:reply.author.loginname //传递参数为name, post是该组件的data
              }
            }">
              <img :src="reply.author.avatar_url" alt=""/>
            </router-link>
            <router-link :to="{name:'user_info'}">
              <span>{{reply.author.loginname}}</span>
            </router-link>
            
            <span>{{index+1}}楼</span>

            <span v-if="reply.ups.length>0">
              ☝ {{reply.ups.length}}<!-- 获赞数，为0就不显示 -->
            </span>
            <span v-else></span>
          </div>
          <p v-html="reply.content"></p><!-- 评论内容 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      isLoading: false, //是否正在加载
      post: {} //代表当前文章页的所有内容，所有属性
    };
  },
  methods: {
    getArticleData() {
      //this.$http.get('https://cnodejs.org/api/v1/topic/'+this.$route.params.id)
      this.$http //es6字符串模板
        .get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`) //该组件读取 它所属的路由中 的参数
        .then(res => {
          //es6箭头函数的this和外面相同，不闭包
          if (res.data.success == true) {
            this.isLoading = false; //不再显示“正在加载”组件
            this.post = res.data.data; //返回数据有个属性叫data
          }
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  beforeMount() {
    this.isLoading = true;
    this.getArticleData();
  },
  watch:{ //跳转后的路由与当前相同没变, 只是后面的参数变了, 所以router会检测不到路由变化. 解决这个,需要检测路由的变化----watch
    '$route'(to, from){
      this.getArticleData()
    }//路由变量 比较特殊,就是加引号
  }
};
</script>


<style>
/*这里不能用scope，因为scope让style只在其所在的文件内作用，同时也不让引入外部的css文件，@import引入失效 */

@import url("../assets/markdown-github.css"); /*引入处理markdown的css*/

.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}

.article:not(:first-child) {
  margin-right: 340px;
  margin-top: 15px;
}

#reply,
.topic_header {
  background-color: #fff;
}

#reply {
  margin-top: 15px;
}

#reply img {
  width: 30px;
  height: 30px;
  position: relative;
  bottom: -9px;
}

#reply a,
#reply span {
  font-size: 13px;
  color: #666;
  text-decoration: none;
}
.replySec {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 10px;
}

.loading {
  text-align: center;
  padding-top: 300px;
}

.replyUp a:nth-of-type(2) {
  margin-left: 0px;
  display: inline-block;
}

.topic_header {
  padding: 10px;
}

.topic_title {
  font-size: 20px;
  font-weight: bold;
  padding-top: 8px;
}

.topic_header ul {
  list-style: none;
  padding: 0px 0px;
  margin: 6px 0px;
}

.topic_header li {
  display: inline-block;
  font-size: 12px;
  color: #838383;
}

.topic_content {
  border-top: 1px solid #e5e5e5;
  padding: 0 10px;
}

.markdown-text img {
  width: 92% !important;
}
</style>
