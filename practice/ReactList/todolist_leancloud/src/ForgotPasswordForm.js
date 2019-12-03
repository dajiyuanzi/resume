import React, {Component} from 'react'

export default class ForgotPasswordForm extends Component {
  render(){
    return (
      <div className="forgotPassword">
        <h3>Reset Password</h3>
        <form className="forgotPassword" onSubmit={this.props.onSubmit}> {/* 登录*/}
          <div className="row">
            <label>Email</label>
            <input 
              type="text" 
              value={this.props.formData.email}
              onChange={this.props.onChange.bind(null, 'email')}
            />
          </div>
          <div className="row actions">
            <button type="submit">Send the Reset Mail</button>
            <a href="#" onClick={this.props.onSignIn}>Back to Login</a>
          </div>
        </form>
      </div>
    )
  }
}



