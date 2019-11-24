import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo:'test',
      todoList: [
        {id:1, title:'First Todo Item'}
      ]
    }
  }
  render(){
    //写render外面行不？
    //map遍历数组，回调函数返回值 组成一个新数组返回，新数组索引结构和原数组一致，原数组不变
    let todos = todoList.map((item, index)=>{
      return <li>{item.title}</li>
    })//渲染在下面

    return (
      <div>
        <h1>My Todos</h1>
        <div className="inputWrapper">
          {/*注意 value= 后面不要加引号，加了会错*/}
          <input type="text" value={this.state.newTodo}/>
        </div>
        <ol>
          {todos}
        </ol>
      </div>
    )
  }
}

export default App;
