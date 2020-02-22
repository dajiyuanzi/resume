import React, { Component } from 'react'
import '../styles/PostList.css' 
import { Link } from "react-router-dom"
import GetData from './Data'
import { tabFormatter, formatDate } from './filters'
import Pagination from './Pagination'

export default class PostList extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true,
      posts:[]
    }
    this.page=1 // current page num

    this.reqPost()
  }
  
  reqPost(){
    GetData('https://cnodejs.org/api/v1/topics', 
      {
        page: this.page,
        limit: 20
      }, 
      (res)=>{
        this.setState({
          loading: false, //加载成功后，去除 加载动画
          posts: res.data.data //返回的数据json格式中有data属性下的data属性
        })
        console.log(res)
      }
    )
  }

  render(){
    let postDom = this.state.posts.map((item)=>{
      return (
        <li key={item.id}>
           {/* 头像 */}
          <img src={item.author.avatar_url} />

          {/* 回复/浏览 */}
          <span>
            <span className="reply_count">{item.reply_count}/{item.visit_count}</span>
          </span>

          {/* 帖子的分类--class动态绑定: 若帖子json中的“精华/置顶”属性为true，则让相应的css类为true */}
          <span className={
            `${item.good===true ? 'put_good' : null} 
            ${item.top===true ? 'put_top' : null}`
          }>
            <span>{ tabFormatter(item) }</span>
          </span>
          
          {/* 标题&文章路由链接 */}
          <Link to={`/topic/${item.id}&author=${item.author.loginname}`} >
            <span>{item.title}</span>
          </Link>

          {/* 最终回复时间 */}
          <span className="last_reply">
            {formatDate(item.last_reply_at)}
          </span>
        </li>
      )
    })

    return (
      <div className="PostList">
        {
          this.state.loading === true ?
          <div className="loading">
            <img src={require('./static/loading.gif')} />
          </div>
          :
          <div className="posts"> 
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
              {postDom}
              
              {/* 分页：点击翻页就申请更多数据 */}
              <li>
                <Pagination onPage={this.currentPage.bind(this)} />
              </li>
            </ul>
          </div>
        }
      </div>
    )  
  }

  //根据当前的页码请求数据
  currentPage(page){
    this.page = page
    this.reqPost()
  }

}