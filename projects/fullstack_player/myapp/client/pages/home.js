import React, { Component } from 'react'

//组件的名称首字母一定大写
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>This is home page.</div>
    )
  }
}
//导出的名称与定义名称一致
export default Home;
