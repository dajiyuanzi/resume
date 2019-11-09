/* 一个模块 是默认导出，则import时 不用{}花括号，且导出后的名字 随便起。
一个模块 是命名导出，则import时 必须用{}花括号，且且导出后的名字 要与模块名字一致。 */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//引入redux和react-redux
import {createStore} from 'redux'
import { Provider } from "react-redux";

const reducer = (state, action)=>{
  if(state === undefined){
    return {n: 0}  //写成哈希，方便传递后取出 (props.n)
  }else{
    if(action.type === 'add'){
      var newState = {n: state.n + action.payload}  //redux不需要手动写setState
      return newState
    }else{
      return state
    }
  }
}
const store = createStore(reducer)

//provider可以直接把数据 送给它内部所有的 层层嵌套的组件
ReactDOM.render(
  <Provider store={store}>  
    <App />
  </Provider>, 
  document.getElementById('root')
);
/* React-Redux的特别之处, 用provider和connect()(APP)让组件 直接 得到/修改数据，而不再
是组件间嵌套，层层转递数据。Provider将 自动更新渲染 各个组件，不需要再自己render() */



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
