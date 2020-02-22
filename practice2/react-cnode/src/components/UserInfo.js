import React, { Component } from 'react'
import { formatDate } from './filters'
import { Link } from 'react-router-dom'
import '../styles/UserInfo.css'
import GetData from'./Data'

export default class UserInfo extends Component {
  constructor(props){
    super(props)
    this.state = {
      userinfo:{
        recent_replies:[], //初始化第一次渲染时,异步数据返回之前，这几个数据是undefined，下面map会报错，故给个初始值［］就好
        recent_topics:[]
      },
      laoding: true //加载动画
    }
    this.reqUser()
  }

  render(){
    return(
      <div className='UserInfo'>
        {
          this.state.loading === true ? 
          <div className='loading'>
            <img src={require('./static/loading.gif')} />
          </div> 
          : 
          <div className='userInformation'>
            <section>
              <img src={this.state.userinfo.avatar_url} />
              <span>{this.state.userinfo.loginname}</span>
              <p>{this.state.userinfo.score}积分</p>
              <p>注册时间：{ formatDate(this.state.userinfo.create_at) }</p>
            </section>

            <div className='replies'>
              <p>回复的主题</p>
              <ul>
                {/* 点击文章并跳转 */}
                {
                  this.state.userinfo.recent_replies.map((item)=>{
                    return (
                      <li key={item.id}>
                        <Link to={`/topic/${item.id}&author=${this.props.match.params.name}`} >{item.title}</Link>
                      </li>
                    )
                  })
                }
              </ul>
            </div>

            <div className='topics'>
                <p>创建的主题</p>
                <ul>
                  {
                    this.state.userinfo.recent_topics.map((item)=>{
                      return (
                        <li key={item.id}>
                          <Link to={`/topic/${item.id}&author=${this.props.match.params.name}`} >{item.title}</Link>
                        </li>
                      )
                    })
                  }
                </ul>
            </div>
          </div>
        }
      </div>
    )
  }

  reqUser(){
    //请求数据，参数是App.js中的Route所接收，由SideBar.js中的Link发送
    GetData(`https://cnodejs.org/api/v1/user/${this.props.match.params.name}`, {}, (res)=>{            
      this.setState({
        userinfo: res.data.data,
        loading: false //加载动画停止
      })
    })
  }

}
