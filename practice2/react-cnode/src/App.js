import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom"
import Header from './components/Header'
import PostList from './components/PostList'
import Article from './components/Article'
import SideBar from './components/SideBar'
import UserInfo from './components/UserInfo'

export default class App extends Component {

  render(){
    return (
      <div className="App">
        <Router>
          <Header />
          <div className="main">
            {/* 首页的帖子列表页 */}
            <Route exact path="/" component={ PostList }></Route>

            {/* 进入帖子页 */}
            <Route path="/topic/:id&author=:name" component={ SideBar }></Route>
            <Route path="/topic/:id&author=:name" component={ Article }></Route>

            {/* 用户页 */}
            <Route path='/userinfo/:name' component={ UserInfo }></Route>
          </div>
        </Router>     
      </div>
    )
  }
}

