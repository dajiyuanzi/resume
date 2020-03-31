import React, { Component } from 'react'
import { connect } from 'react-redux'
import './index.css'
import classnames from 'classnames' //classnames插件方便控制 jsx的css类型变量

@connect(
  state=>({

  }),
  {

  }
)

export default class SignUp extends Component {
  keyDown = ()=>{

  }

  signup = ()=>{
    var username = this.refs.name.value
    var pwd = this.refs.auth.value
    var nickname = this.refs.nickname.value;
    if(!username || !pwd){
      return false
    }
    let {loginWithAsync} = this.props
    loginWithAsync(2)
  }

  render(){
    //安装classnames插件方便控制 jsx的css类型变量，否则就要写className={'webim-sign webim-signup'}
    let mainClassName=classnames({
      'sign': true,
      'signup': true
    })

    return (
      <div className={mainClassName}>
        <h2>注册页面</h2>
        <input ref='name' name='name' placeholder='输入用户名' autoFocus={true} onInput={this.keyDown} />
        <input ref='auth' name='auth' placeholder='输入密码' type='password' onInput={this.keyDown} />
        <input ref='nickname' name='nickname' placeholder='输入昵称' onInput={this.keyDown} />

        <button className='button' onClick={this.signup}>注册</button>
        <p>
          已有账户,<i onClick={this.signin}>登录</i>
        </p>
      </div>
    )
  }
}


