import React, { Component } from 'react'

export default class TodoInput extends Component {
  render(){ //<input defaultValue={xx}/>中的defaultValue 只会影响input的第一次值，后面 newTodo 怎么变，都不会影响 input
    return (
      <input type="text" 
        // defaultValue={this.props.content} 
        value={this.props.content}
        onChange={this.changeTitle.bind(this)}
        onKeyPress={this.submit.bind(this)}
      />
    )
  }
  submit(e){
    if(e.key === 'Enter') { //当按回车了
      // console.log('用户按回车了')
      this.props.onSubmit(e)
    }
  }
  changeTitle(e){
    this.props.onChange(e)
  }
}