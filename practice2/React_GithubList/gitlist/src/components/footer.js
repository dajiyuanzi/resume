import React, { Component } from 'react'
import { Link } from "react-router-dom"
// import { browserHistory } from 'react-router'

export default class Footer extends Component {
  constructor(props){
    super(props)
    this.state = {
      repo: '',
      user:'',
      search:''
    }
  }

  componentDidMount(){ //当直接更改地址时，整个页面刷新，会被触发；当点击路由link，不会触发整个页面刷新
    this.footerColor()
  }

  footerColor(){
    switch(window.location.pathname){
      case '/' : case '/repo':
        this.setState({
          repo: 'active',
          user:'',
          search:''
        })
        break
      case '/user':
        this.setState({
          repo: '',
          user:'active',
          search:''
        })
        break
      case '/search':
        this.setState({
          repo: '',
          user:'',
          search:'active'
        })
        break
    }
  }

  render(){
    return (
      <footer>
        <div className={this.state.repo} onClick={this.footerColor.bind(this)}>
          <span class="iconfont icon-paihang"></span><span><Link to="/repo">Top repos</Link></span>
        </div>
        <div className={this.state.user} onClick={this.footerColor.bind(this)}>
          <span class="iconfont icon-beimei"></span><span><Link to="/user">Top users</Link></span>
        </div>
        <div className={this.state.search} onClick={this.footerColor.bind(this)}>
          <span class="iconfont icon-search"></span><span><Link to="/search">Search</Link></span>
        </div>
      </footer>
    )
  }
}
