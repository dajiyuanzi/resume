

/*
 搜索页面
*/
import React, { Component } from 'react'
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';
import '../styles/search.less'

class Search extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div className='search login'></div>
    )
  }
}

function select(state) {
  return {

  }
}

export default connect(select)(Search);

