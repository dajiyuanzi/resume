import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput.js'
import TodoItem from './TodoItem.js'
import 'normalize.css'
import './reset.css'
import UserDialog from './UserDialog'
import { getCurrentUser, signOut, TodoModel } from './leanCloud'


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


//存储对象的数据,测试代码
// import AV from './leanCloud'
// // 声明类型
// var TodoFolder = AV.Object.extend('TodoFolder');
// // 新建对象
// var todoFolder = new TodoFolder();
// // 设置名称
// todoFolder.set('name','工作');
// // 设置优先级
// todoFolder.set('priority',1);
// todoFolder.save().then(function (todo) {
//   console.log('objectId is ' + todo.id);
// }, function (error) {
//   console.error(error);
// });


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: getCurrentUser || {}, //当前用户  leancloud回自动给每条数据加id, getCurrentUser将获得并返回
      newTodo: '', //输入框内渲染出的值，最开始的默认值 为空字符，以content变量 传给子组件TodoInput
      todoList: []  
      // {id:1, title:'1st Todo Item'}, 这是设计的数据格式
      // {id:1, title:'2nd Todo Item'}
    }
    let user = getCurrentUser()
    if(user){
      TodoModel.getByUser(user, (todos)=>{ //获得属于当前用户的todo数据
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
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
    })//渲染在下面 {todos}
    //console.log(todos)

    return (
      <div className="App">
      <h1>
        {this.state.username || 'My'} Todos
        {this.state.user.id ? <button onClick={this.signOut.bind(this)}>SignOut</button> : null}
      </h1>
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
        {this.state.user.id ? 
          null : 
          <UserDialog 
            onSignUp={this.onSignUpOrSignIn.bind(this)}
            onSignIn={this.onSignUpOrSignIn.bind(this)}
          /> 
        }
      </div>
    )
  }

  signOut(){
    signOut() //这里面的signOut()是调用的src/leanCloud.js里的方法，外层的是定义的父组件里的方法。
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    this.setState(stateCopy)
  }
  onSignUpOrSignIn(user){
    // this.state.user = user
    // this.setState(this.state)
    // 消除「不要直接修改 state」的警告,如下方案实现数据更新，即全部重新赋值。可以直接赋值，只是不推荐而已；后面改成Redux的，先写挫的再升级
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
    let newTodo = {
      title: event.target.value,
      status: null,
      deleted: false
    }
    TodoModel.create(newTodo, (id)=>{ //leancloud回自动给每条数据加id, 在leancloud以回调传回到这里
      newTodo.id = id  
      this.state.todoList.push(newTodo)
      this.setState({ //更新数据
        newTodo: '',
        todoList: this.state.todoList
      })
    }, (error)=>{
      console.log(error)
    })
  }
  delete(event, todo){
    todo.deleted = true
    this.setState(this.state)
  }
}

export default App;

// let id = 0
// function idMaker(){
//   id += 1
//   return id
// }
// leancloud回自动给每条数据加id
