import React from 'react';

//如果一个组件只有 props 没有 state，你就可以把它写成一个函数

export default function(props) {
  return (
    <form className="signUp" onSubmit={props.onSubmit.bind(this)}> {/* Register */}
      <div className="row">
        <label>Email</label>
        <input 
          type="text"
          value={props.formData.email}
          onChange={props.onChange.bind(null, 'email')}
        />
      </div>
      <div className="row">
        <label>User Name</label>
        <input 
          type="text" 
          value={props.formData.username} 
          onChange={props.onChange.bind(null, 'username')} 
        />{/* bind 不仅可以绑定 this，还可以绑定第一个参数,。这里执行context设为null，因为UserDialog绑定了它的context */}
      </div>
      <div className="row">
        <label>Password</label>
        <input type="password"
          value={props.formData.password}
          onChange={props.onChange.bind(null, 'password')}
        />
      </div>
      <div className="row actions">
        <button type="submit">Sign Up</button>
      </div>
    </form>
  )
}

