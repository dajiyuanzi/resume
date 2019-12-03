import React, {Component} from 'react';

export default class SignUpForm extends Component {
  render(){
    return (
      <form className="signUp" onSubmit={this.signUp.bind(this)}> {/* Register */}
        <div className="row">
          <label>Email</label>
          <input 
            type="text"
            value={this.state.formData.email}
            onChange={this.changeFormData.bind(this, 'email')}
          />
        </div>
        <div className="row">
          <label>User Name</label>
          <input 
            type="text" 
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
  }
}

