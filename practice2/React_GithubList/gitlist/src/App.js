import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/iconfont.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import repo_board from './components/repo_board'
import user_board from './components/user_board'
import search from './components/search'
import Footer from './components/footer'

class App extends Component {
  render(){
    return (
      <div>    
        <Router>
          <main>
            <Route exact path="/" component={repo_board} />
            <Route path="/repo" component={repo_board} />
            <Route path="/user" component={user_board} />
            <Route path="/search" component={search} />
          </main>
          <Footer />
        </Router>
      </div>
    )
  }
}

export default App;
