import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux'

const stateChanger = (state, action)=>{ //相当于reducer，设定对 state和action(对state的操作) 的处理，即 管家
  if(state === undefined){
    return 0
  }else{
    if(action.type === 'add'){
      var newState = state + action.payload
      return newState
    }else{
      return state
    }
  }

  return newState
}

const store = createStore(stateChanger)
render()

store.subscribe(()=>{ //注意用箭头函数，以传递函数和相应的context
  render()
})

function add3(){
  if(store.getState() % 2 === 1){ //如果是单数就+1
    store.dispatch({type:'add', payload: 1})
  }
}
function add4(){
  setTimeout(()=>{
    store.dispatch({type:'add', payload: 1})
  },2000)
}

function render(){
  ReactDOM.render( //react比原生好处，是只更新有修改的部分，不需要全部重新渲染
    <App 
      value={store.getState()}   /* store的数据 传值给子组件 以触发监听，但并不是把store本身传过去 */
      onAdd1={()=>{store.dispatch({type:'add', payload: 1})}}  //此dispatch函数 传给子组件，不是函数执行后的数据
      onAdd2={()=>{store.dispatch({type:'add', payload: 2})}}  //这里JSX内，函数的this(context)强制是undefined，需要用bind(this) 或者箭头函数
      onAdd3={add3}
      onAdd4={add4}
    />, document.getElementById('root'));
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
