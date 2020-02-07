import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput.js'
import TodoItem from './TodoItem.js'
import 'normalize.css'
import './reset.css'
import * as localStore from './localStore'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      newTodo: '', //输入框内渲染出的值，最开始的默认值 为空字符，以content变量 传给子组件TodoInput
      todoList: localStore.load('todoList') || [] //从window.localSotre获取数据，无数据则为空
      /*  
	    1. todoList 是一个数组，用来容纳所有 todo，每个 todo 拥有： {id:1, title:'1st Todo Item', status:'completed', deleted:'true'}, 这是设计的数据格式
        id - 区分两个 todo 的依据;   title - 标题;   status - completed 表示完成，空表示未完成，以后还可以加 parsed 表示暂缓;   deleted - bool 值，表示是否删除了（用户总想把以前删掉的东西找回来，他们就是这么喜欢后悔）
      2. newTodo 用来容纳用户在 input 输入的文字
      */
    }
  }
  render(){
    //待办条目
    let todos = this.state.todoList
      .filter((item)=>!item.deleted)  //只展示没有被删除的todo。filter返回数组的一个子集，回调函数用于逻辑判断是否返回，返回true则把当前元素加入到返回数组中，false则不加
      .map((item, index)=>{ //map遍历数组，回调函数返回值 组成一个新数组返回，原数组不变
        return (
          // <li>{item.title}</li>
          // onToggle是传入的变量  key是react要求每个li都要有不同的编号
          <li key={index}>
            <TodoItem 
              todo={item} 
              onToggle={this.toggle.bind(this)} 
              onDelete={this.delete.bind(this)}
            />
          </li>
        )
      })//渲染在下面,不用担心已有dom重复渲染，react diff会自动更新
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
        <ol className="todoList">
          {todos}
        </ol>
      </div>
    )
  }
  //每次渲染setState之后都有运行一次save，所以用钩子，下面 不需要重复写
  componentDidUpdate(){
    localStore.save('todoList', this.state.todoList) //向window.localSotre存储 更新的todo数据
  }
  toggle(e, todo){ //item的<input checkbox/>有change时触发以下判断：status此时在addTodo中初始为null，所以被赋值为completed
    todo.status = todo.status==='completed' ? '' : 'completed' //如果是status已经是completed, 触发change时再设为空(去掉勾)
    this.setState(this.state)
    //localStore.save('todoList', this.state.todoList)
  }
  changeTitle(event){ //用户输入时触发onchange事件，把输入值更新到状态变量(react的diff会自动对比更新)，并通过TodoInput的参数content 渲染到输入框
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList//这行可以不写
    })
    //localStore.save('todoList', this.state.todoList) //向window.localSotre存储数据
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
    //localStore.save('todoList', this.state.todoList)
  }
  delete(event, todo){
    todo.deleted = true
    this.setState(this.state)
    //localStore.save('todoList', this.state.todoList)
  }
}

export default App;

let id = 0
function idMaker(){
  id += 1
  return id
}
