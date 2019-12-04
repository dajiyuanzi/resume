import React, { Component } from 'react'
import './UserDialog.css'
import {signUp, signIn, sendPasswordResetEmail} from './leanCloud'

import ForgotPasswordForm from './ForgotPasswordForm'
import SignInOrSignUp from './SignInOrSignUp'


export default class UserDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      // selected: 'signUp', //默认显示注册 'signIn'
      selectedTab: 'signInOrSignUp', // 'forgotPassword'
      formData: {
        email: '',
        username: '',
        password: ''
      }
    }
  }
  // switch (e) {  //切换登录和注册
  //   this.setState({
  //     selected: e.target.value
  //   })
  // } 
  //与selected属性移到组件，将signInOrSignUp抽离成一个组件，注意state和props的区别

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
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          {this.state.selectedTab === 'signInOrSignUp' ? 
            <SignInOrSignUp
              formData={this.state.formData}
              onSignIn={this.signIn.bind(this)}
              onSignUp={this.signUp.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onForgotPasswordForm={this.showForgotPassword.bind(this)}
            /> : 
            <ForgotPasswordForm 
              formData={this.state.formData} 
              onSubmit={this.resetPassword.bind(this)}
              onChange={this.changeFormData.bind(this)}
              onSignIn={this.returnToSignIn.bind(this)}
            />
          }
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

