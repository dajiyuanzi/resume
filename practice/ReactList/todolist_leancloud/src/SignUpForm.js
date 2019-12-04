import React, {Component} from 'react';

export default class SignUpForm extends Component {
  render(){
    return (
      <form className="signUp" onSubmit={this.props.onSubmit.bind(this)}> {/* Register */}
        <div className="row">
          <label>Email</label>
          <input 
            type="text"
            value={this.props.formData.email}
            onChange={this.props.onChange.bind(null, 'email')}
          />
        </div>
        <div className="row">
          <label>User Name</label>
          <input 
            type="text" 
            value={this.props.formData.username} 
            onChange={this.props.onChange.bind(null, 'username')} 
          />{/* bind 不仅可以绑定 this，还可以绑定第一个参数,。这里执行context设为null，因为UserDialog绑定了它的context */}
        </div>
        <div className="row">
          <label>Password</label>
          <input type="password"
            value={this.props.formData.password}
            onChange={this.props.onChange.bind(null, 'password')}
          />
        </div>
        <div className="row actions">
          <button type="submit">Sign Up</button>
        </div>
      </form>
    )
  }
}

