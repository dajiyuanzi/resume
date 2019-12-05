import React from 'react'

export default function(props) {
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

// onChange 事件执行函数会传递一个事件 e，这里bind null就是给 父组件调用它时的context而产生的this 腾个位置，防止props被当成this