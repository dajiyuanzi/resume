import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput.js'
import TodoItem from './TodoItem.js'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo:'test',
      todoList: [
        {id:1, title:'1st Todo Item'},
        {id:1, title:'2nd Todo Item'}
      ]
    }
  }
  render(){
    //map遍历数组，回调函数返回值 组成一个新数组返回，新数组索引结构和原数组一致，原数组不变
    let todos = this.state.todoList.map((item, index)=>{
      return (
        // <li>{item.title}</li>
        <li>
          <TodoItem todo={item} />
        </li>
      )
    })//渲染在下面

    return (
      <div>
        <h1>My Todos</h1>
        <div className="inputWrapper">
          {/*注意 value= 后面不要加引号，加了会错*/}
          {/* <input type="text" value={this.state.newTodo}/> */}
          <TodoInput content={this.state.newTodo} />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
}

export default App;
