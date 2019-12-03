import React, { Component } from 'react'
import './UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'
import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'

export default class UserDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: 'signUp', //默认显示注册 'signIn'
      selectedTab: 'signInOrSignUp', // 'forgotPassword'
      formData: {
        email: '',
        username: '',
        password: ''
      }
    }
  }
  switch (e) {  //切换登录和注册
    this.setState({
      selected: e.target.value
    })
  }

  signUp(e){
    e.preventDefault() //取消事件的默认动作,比如form点击submit后自动提交发送数据
    let {email, username, password} = this.state.formData
    let success = (user)=>{
      this.props.onSignUp.call(null, user) 
      //默认context设null，非严格模式下即window全局，但App.js在传入时已bind为UserDialog所处的context（其实，直接func(user)也行，只是这样更合形式上的逻辑）
    }
    let error = (error)=>{
      switch(error.code){ //leancloud的服务状态码
        case 202:
          alert('用户名已被占用')
          break
        default:
          alert(error)
          break
      }
    }
    signUp(email, username, password, success, error) //这里面的signUp()是调用的src/leanCloud.js里的方法，外层的是定义的父组件里的方法。
  }
  signIn(e){
    e.preventDefault()
    let {username, password} = this.state.formData
    let success = (user)=>{
      this.props.onSignIn.call(null, user)
    }
    let error = (error)=>{
      switch(error.code){
        case 210:
          alert('用户名与密码不匹配')
          break
        default:
          alert(error)
          break
      }     
    }
    signIn(username, password, success, error)
  }

  //登录注册form的input 不断把 onChange监听的state变动 渲染回到input value上
  // changeUsername(e){
  //   // this.state.formData.username = e.target.value
  //   // this.setState(this.state)
  //   // 像上面这样写会看到一个警告 warning  Do not mutate state directly. Use setState()
    
  //   let stateCopy = JSON.parse(JSON.stringify(this.state)) //用JSON深拷贝
  //   stateCopy.formData.username = e.target.value
  //   this.setState(stateCopy)
  // }
  // changePassword(e){
  //   let stateCopy = JSON.parse(JSON.stringify(this.state)) //用JSON深拷贝
  //   stateCopy.formData.password = e.target.value
  //   this.setState(stateCopy)
  // }
  //将 changeUserName 和 changePassword 优化成一个函数 changeFormData
  changeFormData(key, e){ //登录注册form的input 不断把 onChange监听的state变动 渲染回到input value上
    let stateCopy = JSON.parse(JSON.stringify(this.state)) //用JSON深拷贝
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy)
  }

  render(){
    let signInOrSignUp = (
      <div className="signInOrSignUp">
        <nav>
          <label>
            <input 
              type="radio" 
              value="signUp" 
              checked={this.state.selected === 'signUp'}
              onChange={this.switch.bind(this)}
            /> Register
          </label>
          <label>
            <input 
              type="radio" 
              value="signIn" 
              checked={this.state.selected === 'signIn'}
              onChange={this.switch.bind(this)}
            /> Login
          </label>
        </nav>
        <div className="panes">
          {this.state.selected === 'signUp' ? 
            <SignUpForm 
              formData={this.state.formData} 
              onSubmit={this.signUp.bind(this)}
              onChange={this.changeFormData.bind(this)}
            />
            : null
          }
          {this.state.selected === 'signIn' ? 
            <SignInForm 
              formData={this.state.formData}
              onChange={this.changeFormData.bind(this)}
              onSubmit={this.signIn.bind(this)}
              onForgotPassword={this.showForgotPassword.bind(this)}
            />
          : null}
        </div>
      </div>
    )
  
    let forgotPassword = (
      <div className="forgotPassword">
        <h3>Reset Password</h3>
        <form className="forgotPassword" onSubmit={this.resetPassword.bind(this)}> {/* 登录*/}
          <div className="row">
            <label>Email</label>
            <input 
              type="text" 
              value={this.state.formData.email}
              onChange={this.changeFormData.bind(this, 'email')}
            />
          </div>
          <div className="row actions">
            <button type="submit">Send the Reset Mail</button>
            <a href="#" onClick={this.returnToSignIn.bind(this)}>Back to Login</a>
          </div>
        </form>
      </div>
    )

    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          {this.state.selectedTab === 'signInOrSignUp' ? signInOrSignUp : forgotPassword}
        </div>
      </div>
    )
  }

  showForgotPassword(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'forgotPassword'
    this.setState(stateCopy)
  }
  returnToSignIn(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'signInOrSignUp' //把页面改回 登录/注册
    this.setState(stateCopy)
  }
  resetPassword(e){
    e.preventDefault()
    sendPasswordResetEmail(this.state.formData.email)
  }
}

