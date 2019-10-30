<template>
  <div class="autherinfo">
    <div class="authersummary">
      <div class="topbar">作者</div>
      <router-link :to="{
        name:'user_info',//路由名
        params:{
          name:userinfo.loginname //路由参数 值为loginname, userinfo是该组件的data，储存着请求返回的数据
        }
      }">
        <img :src="userinfo.avatar_url" alt=""> <!-- 注：要用v-bind -->
      </router-link>
    </div>
    <div class="recent_topics">
      <div class="topbar">作者最近主题</div>
      <ul>
        <li v-for="(list, key) in topiclimitby5" :key="key"> <!-- topiclimitby5是计算属性 key只是防vscode报错 -->
          <router-link :to="{
            name:'post_content',
            params:{
              id:list.id,
              name:list.author.loginname
            }
          }">
            {{list.title}}
          </router-link>
        </li>
      </ul>
    </div>
    <div class="recent_replies">
      <div class="topbar">作者最近回复</div>
      <ul>
        <li v-for="(list, key) in replylimitby5" :key="key"> <!-- replylimitby5是计算属性 key只是防vscode报错 -->
          <router-link :to="{
            name:'post_content',
            params:{
              id:list.id,
              name:list.author.loginname
            }
          }">
            {{list.title}}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name:"SideBar",
  data(){
    return {
      userinfo:{}
    }
  },
  methods:{
    getData(){//Axios，查询 用户的信息
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`) //该组件读取 它所注入的路由中 的参数
        .then(res => {
          this.isLoading = false; //加载成功后，去除 加载动画
          this.userinfo = res.data.data; //返回的数据json格式中有data属性下的data属性
          //console.log(this.userinfo)
        })
        .catch(function(err) {
          console.log(err);
        })
    }
  },
  computed:{
    topiclimitby5(){ //作者最近主题，最多显示5条
      // if(this.userinfo.recent_topics.length>5){ 
      //   return this.userinfo.recent_topics.slice(0, 5) //slice 数组从坐标0-5截取出，不包括5
      // }
      // else{
      //   return this.userinfo.recent_topics
      // }
      //会报错，因为当请求数据还未返回，userinfo是空，其length为undefined；所以如下，

      if(this.userinfo.recent_topics){ //当userinfo不为空，就返回5个
        return this.userinfo.recent_topics.slice(0, 5) //slice 数组从坐标0-5截取出，不包括5
      }
    },
    replylimitby5(){//作者最近回复，最多显示5条
      if(this.userinfo.recent_replies){
        return this.userinfo.recent_replies.slice(0, 5)
      }
    }
  },
  beforeMount(){
    this.isLoading=true //加载成功之前 显示加载动画
    this.getData() //在页面加载之前 获取数据
  }
}
</script>

<style scoped>
.authersummay, .recent_replies, .recent_topics {
  background-color: #fff;
}
.autherinfo {
  width: 328px;
  float: right;
  margin-top: 0;
}
li{
  padding: 3px 0 ;
}
.recent_replies ul, .recent_topics ul {
  margin-top: 0px;
  margin-bottom: 0px;
  list-style: none;
  padding-left: 14px;
}

ul a {
  font-size: 12px;
  text-decoration: none;
  color: #778087;
}

.topbar {
  padding: 10px;
  background-color: #f6f6f6;
  height: 16px;
  font-size: 12px;
  margin-top: 10px;
}

img {
  height: 48px;
  width: 48px;
  border-radius: 3px;
  margin: 10px;
}

.loginname {
  width: 100px;
  float: right;
  margin-top: 22px;
  margin-right: 159px;
  font-size: 14px;
}

.loginname a {
  text-decoration: none;
  color: #778087;
}

.authersummary .topbar {
  margin-top: 0px;
}
</style>




