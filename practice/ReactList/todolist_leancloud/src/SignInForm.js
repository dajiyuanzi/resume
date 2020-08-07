import React from 'react'

export default function(props) {
  return (
    <form className="signIn" onSubmit={props.onSubmit}> {/* Login */}
      <div className="row">
        <label>User Name</label>
        <input type="text" 
          value={props.formData.username} 
          onChange={props.onChange.bind(null, 'username')} 
        />
      </div> 
      <div className="row">
        <label>Password</label>
        <input type="password"
          value={props.formData.password}
          onChange={props.onChange.bind(null, 'password')} 
        /> 
      </div>
      <div className="row actions">
        <button type="submit">Login</button>
        <a href="#" onClick={props.onForgotPassword}>Do you forget the password?</a>
      </div>
    </form>
  )
}

/*函数onChange在父级已经被bind(this)到父级所处的执行域上等待执行，只是层层传递至 此子组件 再被触发执行。onChange的执行域是bind在UserDialog.js的*/
//换言之，这里bind(null)就是给 父组件调用props.onChange时的执行域this 腾个位置，防止使用 此处props的执行域

//简单说，让此处的回调 没有context，自然去上溯到 其声明之处 / 所绑定的父级 的context执行域。

//另外，onChange事件监听 会自动传递一个事件e 给执行函数this.props.onChange