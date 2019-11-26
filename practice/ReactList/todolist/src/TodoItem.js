import React, { Component } from 'react'

export default class TodoItem extends Component {
  render(){  //satus在addTodo中初始为null
    return (
      <div>
        <input 
          type="checkbox" 
          checked={this.props.todo.status==='completed'} 
          onChange={this.toggle.bind(this)}
        />
        {this.props.todo.title}
        <button onCLick={this.delete.bind(this)}>Delete</button>
      </div>
    )
  }
  toggle(e){
    this.props.onToggle(e, this.props.todo)
  }
  delete(e){
    this.props.onDelete(e, this.props.todo)
  }
}
