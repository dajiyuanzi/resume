import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import SideBar from '../components/SideBar'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name:'root', //路由名
      path:"/",
      components:{
        main:PostList
      }
    },
    {
      name:'post_content', //路由名-文章路由链接的请求
      path:"/topic/:id&author=:name", //路由参数为id和name
      components:{
        //main是给组件在此的命名(键值对key名)，而Article是引入的代码模块的变量名（虽然这个模块里也是组件代码）
        main:Article, //用路由参数id
        sidebar:SideBar //用路由参数name
      }//es6语法中，键和值一样，就可以 省略写成一个
    },
    {
      name:'user_info',
      path:'/userinfo/:name',
      components:{
        main:UserInfo
      }
    }
  ]
})
