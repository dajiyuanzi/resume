import React, { Component } from 'react'

export default class Footer extends Component {
  render(){
    return (
      <footer>
        <div class="active">
          <span class="iconfont icon-paihang"></span><span><Link to="/repo">Top repos</Link></span>
        </div>
        <div>
          <span class="iconfont icon-beimei"></span><span><Link to="/user">Top users</Link></span>
        </div>
        <div>
          <span class="iconfont icon-search"></span><span><Link to="/search">Search</Link></span>
        </div>
      </footer>
    )
  }
}
