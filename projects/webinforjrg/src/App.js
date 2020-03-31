import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import { Provider, connect } from 'react-redux'
import store from './data/create' //可调用中间件的store

import Signup from './components/sign/signup'


@connect(
  state=>({
    loginState: state.sign.loginState
  }),
  {

  }
)

class App extends Component {
  render(){
    return (
      <div className='main'>

      </div>
    )
  }
}

export default class Main extends Component {
  render(){
    return (
      <Provider store={store}>
        <App/>
      </Provider>
    )
  }
}

