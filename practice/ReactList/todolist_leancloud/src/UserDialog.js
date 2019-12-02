import React, { Component } from 'react'
import './UserDialog.css'
import {signUp, signIn} from './leanCloud'

export default class UserDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: 'signUp', //默认显示注册
      formData: {
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
    let {username, password} = this.state.formData
    let success = (user)=>{
      this.props.onSignUp.call(null, user) 
      //默认context设null，非严格模式下即window全局，但App.js在传入时已bind为UserDialog所处的context（其实，直接func(user)也行，只是这样更合形式上的逻辑）
    }
    let error = (error)=>{
      alert(error)
    }
    signUp(username, password, success, error) //这里面的signUp()是调用的src/leanCloud.js里的方法，外层的是定义的父组件里的方法。
  }
  signIn(e){
    e.preventDefault()
    let {username, password} = this.state.formData
    let success = (user)=>{
      this.props.onSignIn.call(null, user)
    }
    let error = (error)=>{
      alert(error)
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
  changeFormData(key, e){
    let stateCopy = JSON.parse(JSON.stringify(this.state)) //用JSON深拷贝
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy)
  }

  render(){
    let signUpForm = (
      <form className="signUp" onSubmit={this.signUp.bind(this)}> {/* Register */}
        <div className="row">
          <label>User Name</label>
          <input type="text" 
            value={this.state.formData.username} 
            onChange={this.changeFormData.bind(this, 'username')} 
          />{/* bind 不仅可以绑定 this，还可以绑定第一个参数 */}
        </div>
        <div className="row">
          <label>Password</label>
          <input type="password"
            value={this.state.formData.password}
            onChange={this.changeFormData.bind(this, 'password')}
          />
        </div>
        <div className="row actions">
          <button type="submit">Login</button>
        </div>
      </form>
    )
    let signInForm = (
      <form className="signUp" onSubmit={this.signIn.bind(this)}> {/* Login */}
        <div className="row">
          <label>User Name</label>
          <input type="text" 
            value={this.state.formData.username} 
            onChange={this.changeFormData.bind(this, 'username')}
          />
        </div>
        <div className="row">
          <label>Password</label>
          <input type="password"
            value={this.state.formData.password}
            onChange={this.changeFormData.bind(this, 'password')}
          />
        </div>
        <div className="row actions">
          <button type="submit">Login</button>
        </div>
      </form>
    )
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
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
            {this.state.selected === 'signUp' ? signUpForm : null}
            {this.state.selected === 'signIn' ? signInForm : null}
          </div>
        </div>
      </div>
    )
  }
}

