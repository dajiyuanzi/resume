import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput.js'
import TodoItem from './TodoItem.js'
import 'normalize.css'
import './reset.css'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo:'', //输入框最开始的默认值 为空字符，传给子组件TodoInput
      todoList: [
        // {id:1, title:'1st Todo Item'},
        // {id:1, title:'2nd Todo Item'}
      ]
    }
  }
  render(){
    //待办条目
    //map遍历数组，回调函数返回值 组成一个新数组返回，新数组索引结构和原数组一致，原数组不变
    let todos = this.state.todoList.map((item, index)=>{
      return (
        // <li>{item.title}</li>
        // onToggle是传入的变量
        <li key={index}>
          <TodoItem 
            todo={item} 
            onToggle={this.toggle.bind(this)} 
            onDelete={this.delete.bind(this)}
          />
        </li>
      )
    })//渲染在下面
    //console.log(todos)

    return (
      <div className="App">
        <h1>My Todos</h1>
        <div className="inputWrapper">
          {/*注意 value= 后面不要加引号，加了会错*/}
          {/* <input type="text" value={this.state.newTodo}/> */}
          <TodoInput 
            content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)} 
            onSubmit={this.addTodo.bind(this)} 
          />
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
  toggle(e, todo){ //item的<input checkbox/>有change时触发以下判断：satus此时在addTodo中初始为null，所以被赋值为completed
    todo.status = todo.status==='completed' ? '' : 'completed' //如果是status已经是completed, 触发change时再设为空(去掉勾)
    console.log(todo.status)
    this.setState(this.state)
  }
  changeTitle(event){
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event){
    //console.log('我得添加一个todo了')
    this.state.todoList.push({
      id: idMaker(),
      title: event.target.value,
      status: null,
      deleted: false
    })
    this.setState({ //更新数据
      newTodo: '',
      todoList: this.state.todoList
    })
  }
  delete(event, todo){
    todo.deleted = true
    this.setState(this.state)
  }
}

export default App;

let id = 0
function idMaker(){
  id += 1
  return id
}
