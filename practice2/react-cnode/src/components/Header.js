import React, { Component } from 'react'
import { Link } from "react-router-dom"
import '../styles/Header.css'

export default class Header extends Component {
  constructor(props){
    super(props)
  }
  
  render(){
    return (
      <div className="header">
        <Link to="/">
          <img src={require('./static/cnodejs_light.svg')} alt=""/>
        </Link>
        <ul>
          <li><a href="/">首页</a></li>
          <li><a href="#">新手入门</a></li>
          <li><a href="#">API</a></li>
          <li><a href="#">关于</a></li>
          <li><a href="#">注册</a></li>
          <li><a href="#">注册登录</a></li>
        </ul>
      </div>
    )
  }
}