<template>
  <div class="UserInfo">
    <!-- 如果正在加载 显示此div -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif" />
    </div>
    <div class="userInformation" v-else>
      <section>
        <img :src="userinfo.avatar_url" />
        <span>{{userinfo.loginname}}</span>
        <p>{{userinfo.score}}积分</p>
        <p>注册时间: {{userinfo.create_at | formatDate}}</p>
      </section>
      <div class="replies">
        <p>回复的主题</p>
        <ul>
          <!-- 点击文章并跳转 -->
          <li v-for="(item, key) in userinfo.recent_replies" :key="key"><!-- key和:key就是为了防止报错 -->
            <router-link :to="{
              name:'post_content',//路由名称，是Article组件
              params:{
                id:item.id //路由参数为 文章id, userinfo是该组件的data
              }
            }">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
      <div class="topics">
        <p>创建的主题</p>
        <ul>
          <li v-for="(item, key) in userinfo.recent_topics" :key="key"><!-- key和:key就是为了防止报错 -->
            <router-link :to="{
              name:'post_content',//路由名称，是Article组件
              params:{
                id:item.id //路由参数为 文章id
              }
            }">
              {{item.title}}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      isLoading: false,
      userinfo: {}
    };
  },
  methods: {
    getData() {//Axios，查询 用户的信息
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`) //该组件读取 它所属的路由中 的参数
        .then(res => {
          this.isLoading = false; //加载成功后，去除 加载动画
          this.userinfo = res.data.data; //返回的数据json格式中有data属性下的data属性
          //console.log(this.userinfo)
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  beforeMount(){
    this.isLoading=true //加载成功之前 显示加载动画
    this.getData() //在页面加载之前 获取数据
  }
};
</script>

<style scoped>
.userInfomation {
  background: white;
  width: 75%;
  margin: 10px auto;
}
.userInfomation section {
  padding: 12px;
}
.userInfomation img {
  width: 30px;
}
.userInfomation li {
  list-style: none;
}
.userInfomation .replies,
.userInfomation .topics {
  font-size: 0.72rem;
  border-top: 10px #dddddd solid;
}
.userInfomation > div > p {
  padding: 12px 0 12px 12px;
  background-color: rgba(212, 205, 205, 0.17);
  font-size: 0.75rem;
  margin: 0;
}
.userInfomation > div > ul > li {
  padding: 4px 0 4px 12px;
  white-space: nowrap;
  font-size: 0.72rem;
  text-overflow: ellipsis;
  overflow: hidden;
  line-height: 30px;
  vertical-align: middle;
}
.userInfomation > div > ul > li > a {
  color: #094e99;
  text-decoration: none;
}
</style>

