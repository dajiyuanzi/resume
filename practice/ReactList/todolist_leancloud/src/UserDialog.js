import React, { Component } from 'react'
import './UserDialog.css'

export default class UserDialog extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: 'signUp'
    }
  }
  switch (e) {  //切换登录和注册
    this.setState({
      selected: e.target.value
    })
  }
  render(){
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          <nav onChange={this.switch.bind(this)}>
            <input type="radio" value="signUp" checked={this.state.selected === 'signUp'}/>Register
            <input type="radio" value="signIn" checked={this.state.selected === 'signIn'}/>Login
          </nav>
          <div className="panes">
            <form className="signUp"> {/* Register */}
              <div className="row">
                <label>User Name</label>
                <input type="text"/>
              </div>
              <div className="row">
                <label>Password</label>
                <input type="password"/>
              </div>
              <div className="row actions">
                <button type="submit">Login</button>
              </div>
            </form>
            <form className="signUp"> {/* Login */}
              <div className="row">
                <label>User Name</label>
                <input type="text"/>
              </div>
              <div className="row">
                <label>Password</label>
                <input type="password"/>
              </div>
              <div className="row actions">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
