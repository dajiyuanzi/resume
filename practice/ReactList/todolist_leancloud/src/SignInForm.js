import React, {Component} from 'react'

export default class SignInForm extends Component {
  render(){
    return (
      <form className="signIn" onSubmit={this.props.onSubmit}> {/* Login */}
        <div className="row">
          <label>User Name</label>
          <input type="text" 
            value={this.props.formData.username} 
            onChange={this.props.onChange.bind(null, 'username')}
          />
        </div>
        <div className="row">
          <label>Password</label>
          <input type="password"
            value={this.props.formData.password}
            onChange={this.props.onChange.bind(null, 'password')}
          />
        </div>
        <div className="row actions">
          <button type="submit">Login</button>
          <a href="#" onClick={this.props.onForgotPassword}>Do you forget the password?</a>
        </div>
      </form>
    )
  }
}