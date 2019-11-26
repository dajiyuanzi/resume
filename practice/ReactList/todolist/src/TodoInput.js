import React, { Component } from 'react'

export default class TodoInput extends Component {
  render(){
    return (
      <input type="text" defaultValue={this.props.content} onKeyPress={this.submit.bind(this)}/>
    )
  }
  submit(e){
    if(e.key === 'Enter') { //当按回车了
      // console.log('用户按回车了')
      this.props.onSubmit(e)
    }
  }
}