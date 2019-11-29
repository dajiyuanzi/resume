import React, { Component } from 'react'
import './UserDialog.css'

export default class UserDialog extends Component {
  render(){
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          <nav>
            <input type="radio"/>Register
            <input type="radio"/>Login
          </nav>
          <div className="panes">
            <form className="signUp"> {/* Register */}
              <div className="row">
                <label>User Name</label>
                <input type="text"/>
              </div>
              <div className="row">
                <label>Password</label>
                <input type="password"/>
              </div>
              <div className="row actions">
                <button type="submit">Login</button>
              </div>
            </form>
            <form className="signUp"> {/* Login */}
              <div className="row">
                <label>User Name</label>
                <input type="text"/>
              </div>
              <div className="row">
                <label>Password</label>
                <input type="password"/>
              </div>
              <div className="row actions">
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
