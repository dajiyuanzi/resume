import React, { Component } from 'react'
import { Link } from "react-router-dom"
import GetData from './Data'
import '../styles/SideBar.css'

export default class SideBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      userinfo:{}
    }
    this.reqUser()
  }

  render(){
    return (
      <div className='autherinfo'>
        <div className='authersummary'>
          <div className='topbar'>作者</div>
          <Link
            to={`/userinfo/${this.state.userinfo.loginname}`}
          >
            <img src={this.state.userinfo.avatar_url} />
          </Link>
        </div>

        <div className='recent_topics'>
          <div className='topbar'>作者最近主题</div>
          <ul>
            {
              this.topicLimitBy5().map((list)=>{
                return (
                  <li><Link to={`/topic/${list.id}&author=${list.author.loginname}`}>
                    {list.title}
                  </Link></li>
                )
              })
            }
          </ul>
        </div>

        <div className='recent_replies'>
          <div className='tobar'>作者最近回复</div>
          <ul>
            {
              this.replyLimitBy5().map((list)=>{
                return (
                  <li>
                    <Link to={`/topic/${list.id}&author=${list.author.loginname}`}>
                      {list.title}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </div>
    )
  }

  reqUser(){
    //请求数据，参数是App.js中的Route所接收，由PostList.js中的Link发送
    GetData(`https://cnodejs.org/api/v1/user/${this.props.match.params.name}`, {}, (res)=>{
      this.setState({
        userinfo: res.data.data
      })
      console.log(res)
    })
  }

  //作者最近主题，最多显示5条
  topicLimitBy5(){
    if(this.state.userinfo.recent_topics){ //当userinfo不为空，就返回5个  length>会报错，因为当请求数据还未返回，userinfo是空，其length为undefined
      return this.state.userinfo.recent_topics.slice(0, 5) //slice 数组从坐标0-5截取出，不包括5
    }else{ //有的时候此数据为空，上面map会报错，故返回空数组
      return []
    }
  }

  //作者最近回复，最多显示5条 
  replyLimitBy5(){
    if(this.state.userinfo.recent_replies){
      return this.state.userinfo.recent_replies.slice(0, 5)
    }else{ //有的时候此数据为空，上面map会报错，故返回空数组
      return []
    }
  }

}