import React, { Component } from 'react'
import '../styles/Article.css'
import { tabFormatter, formatDate } from './filters'
import { Link } from "react-router-dom"
import GetData from './Data'

export default class Article extends Component {
  constructor(props){
    super(props)
    this.state = {
      loading: true, //是否正在加载
      post: {} //代表当前文章页的所有内容，所有属性
    }
    this.reqArticle()
  }

  render(){
    return (
      <div className="article">
        {
          this.state.loading===true ? 
          <div class='loading'>
            <img src='/loading.gif' />
          </div> 
          : 
          <div>
            <div className='topic_header'>
              <div className='topic_title'>{this.state.post.title}</div>
              <ul>
                <li>· 发布于: { formatDate(this.state.post.create_at) }</li>
                <li>· 作者：{ this.state.post.author.loginname }</li>
                <li>· { this.state.post.visit_count }次浏览</li>
                <li>· 来自{ tabFormatter(this.state.post) }</li>
              </ul>

              {/* 因为帖子内容为markdown，所以要解析为html，等于vue的v-html */}
              <div class="topic_content" 
                dangerouslySetInnerHTML={{ __html: this.state.post.content }}
              ></div>
            </div>
            
            <div>
              <div className="topbar">回复</div>
              {
                this.state.post.replies.map((reply, index)=>{
                  return (
                    <div key={reply.id} className='replySec'>
                      <div className='replyUp'>
                        
                        {/* 点击用户头像/姓名，跳转至用户页 */}
                        {/* 第一种link可能不行 会报错 */}
                        <Link to={
                          {
                            pathname: '/userinfo/',
                            state: { name: reply.author.loginname }
                          }
                        }>
                          <img src={reply.author.avatar_url} />
                        </Link>
                        <Link to={`/userinfo/${reply.author.loginname}`}>
                          <span>{reply.author.loginname}</span>
                        </Link>

                        <span>{index+1}楼</span>
                        
                        {/* 获赞数，为0就不显示 */}
                        {
                          reply.ups.length>0 ? 
                          <span>{reply.ups.length}</span> : <span></span>
                        }       
                      </div>
                      {/* 评论内容 */}
                      <p dangerouslySetInnerHTML={{ __html: reply.content }} ></p>
                    </div>
                  )
                })
              }
            </div>
          </div>
        }
      </div>
    )
  }

  reqArticle(){
    //请求数据，参数是App.js中的Route所接收，由PostList.js中的Link发送
    GetData('https://cnodejs.org/api/v1/topic/'+this.props.match.params.id, {}, (res)=>{
      if(res.data.success === true){
        this.setState({ 
          post: res.data.data,
          loading: false // 不再显示“正在加载”动画
        })
        console.log(res)
      }     
    })
  }

}