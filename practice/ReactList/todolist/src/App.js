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
      newTodo:'', //输入框内的默认值 为空，传给子组件TodoInput
      todoList: [
        // {id:1, title:'1st Todo Item'},
        // {id:1, title:'2nd Todo Item'}
      ]
    }
  }
  render(){
    //map遍历数组，回调函数返回值 组成一个新数组返回，新数组索引结构和原数组一致，原数组不变
    let todos = this.state.todoList.map((item, index)=>{
      return (
        // <li>{item.title}</li>
        <li key={index}>
          <TodoItem todo={item} />
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
}

export default App;

let id = 0
function idMaker(){
  id += 1
  return id
}
