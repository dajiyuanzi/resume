import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput.js'
import TodoItem from './TodoItem.js'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog'
import { getCurrentUser } from './leanCloud'

//移到leanCloud.js
//拷贝leancloud初始化代码, 这些码和地址都是leancloud生成的
// import AV from 'leancloud-storage'
// var APP_ID ='v14NvWPzvoqzf1OAVFrlamua-gzGzoHsz'
// var APP_KEY = '4kTB4FACraYqwnn9IWrmlmHV'
// var serURLs = 'https://v14nvwpz.lc-cn-n1-shared.com'
// AV.init({
//   appId: APP_ID,
//   appKey: APP_KEY,
//   serverURLs: serURLs
// })

//测试 leancloud 功能
// var TestObject = AV.Object.extend('TestObject')
// var testObject = new TestObject()
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!')
// })

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser || {},
      newTodo: '', //输入框内渲染出的值，最开始的默认值 为空字符，以content变量 传给子组件TodoInput
      todoList: []  
      // {id:1, title:'1st Todo Item'}, 这是设计的数据格式
      // {id:1, title:'2nd Todo Item'}
    }
  }
  render(){
    //待办条目
    let todos = this.state.todoList
      .filter((item)=>!item.deleted)  //只展示没有被删除的todo。filter返回数组的一个子集，回调函数用于逻辑判断是否返回，返回true则把当前元素加入到返回数组中，false则不加
      .map((item, index)=>{ //map遍历数组，回调函数返回值 组成一个新数组返回，新数组索引结构和原数组一致，原数组不变
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
    })//渲染在下面
    //console.log(todos)

    return (
      <div className="App">
      <h1>{this.state.username || 'My'} Todos</h1>
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
        {this.state.user.id ? null : <UserDialog on SignUp={this.onSignUp.bind(this)}/> }
      </div>
    )
  }

  onSignUp(user){
    // this.state.user = user
    // this.setState(this.state)
    // 消除「不要直接修改 state」的警告,如下
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = user
    this.setState(stateCopy)
  }
  componentDidUpdate(){
    
  }
  toggle(e, todo){ //item的<input checkbox/>有change时触发以下判断：satus此时在addTodo中初始为null，所以被赋值为completed
    todo.status = todo.status==='completed' ? '' : 'completed' //如果是status已经是completed, 触发change时再设为空(去掉勾)
    this.setState(this.state)
  }
  changeTitle(event){ //用户输入时 把输入值更新渲染到输入框
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
