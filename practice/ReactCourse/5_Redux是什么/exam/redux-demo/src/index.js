import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//引入redux和react-redux
import {createStore} from 'redux'
import {Provider} from 'react-redux'

/*
请使用 react-redux 做出一个 counter 应用：

页面上有一个数字 n 和一个按钮 +1
点击 +1 之后 n 就会加 1
简单吧
*/

const reducer = (state, action)=>{
  if(state == undefined){
    return {n:0}
  }
  else{
    if(action.type == 'add'){
      return {n: state.n+action.payload} 
    }
  }
}
const store = createStore(reducer)


ReactDOM.render(
  <Provider store={store} >
    <App />
  </Provider>, 
  
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
