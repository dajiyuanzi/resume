import React from 'react'
import './TodoInput.css'


function submit(props, e){
  if(e.key === 'Enter') { //当按回车了
    // console.log('用户按回车了')

    //如果用户在输入框里什么都不写就敲回车，那么就拒绝用户
    if(e.target.value.trim() !== ''){ //trim() 方法用于删除字符串的头尾空格, 不会改变原始字符串。
      this.props.onSubmit(e)
    }
  }
}

function changeTitle(e){
  this.props.onChange(e)
}


export default function (props) {
  //<input defaultValue={xx}/>中的defaultValue 只会影响input的第一次值，后面 newTodo 怎么变，都不会影响 input
  return (
    <input type="text" 
      // defaultValue={this.props.content} 
      value={props.content}
      className="TodoInput"
      onChange={changeTitle.bind(this)}
      onKeyPress={submit.bind(this)}
    />
  )
}

// onChange 事件执行函数会传递一个事件 e，这里bind null就是给 父组件调用它时的context而产生的this 腾个位置，防止props被当成this

// 搞不清楚 bind 用法的同学，请看完 MDN
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
// 尤其是示例要看懂