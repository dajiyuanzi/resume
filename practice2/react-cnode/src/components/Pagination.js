import React, { Component } from 'react'
import '../styles/Pagination.css'

export default class Pagination extends Component {
  constructor(props){
    super(props)
    this.state = {
      pageBtn: [1, 2, 3, 4, 5, '......'], //只显示4个页码
      leftEllipsis: false,
      currentPage: 1
    }
    this.currentPage = 1
  }

  render(){
    return(
      <div className="pagination">
        <button onClick={this.changeBtn.bind(this)} >首页</button>
        <button onClick={this.changeBtn.bind(this)} >上一页</button>

        {
          this.state.leftEllipsis === true ? 
            <button className="pagebtn">......</button> : null
        }
        {
          this.state.pageBtn.map((item)=>{
            return (
              <button key={item}
                onClick={ this.changeBtn.bind(this, item) } 
                className={ `${item===this.state.currentPage ? 'currentPage' : null} pagebtn` }
              >
                {item}
              </button>
            )
          })
        }

        <button onClick={this.changeBtn.bind(this)} >下一页</button>
      </div>
    )
  }

  //页码变动
  changeBtn(page){ 
    //点击的不是 页码，而是 上一页/下一页/首页
    if( typeof page != 'number' ){
      switch(page.target.innerText){
        case '上一页':
          if(this.currentPage === 1){
            return
          }
          this.currentPage--
          this.changeBtn(this.currentPage)
          break

        case '下一页':
          this.currentPage++
          this.changeBtn(this.currentPage)
          break

        case '首页':
          this.setState({ pageBtn:[1,2,3,4,5,'......'] }) //点击首页时，就要重置页码展示
          this.changeBtn(1)
          break

        default:
          break
      }
      return //退出函数，不再执行下面的
    }

    this.currentPage = page
    this.setState({currentPage: this.currentPage})

    //判断 页码栏左侧的“...”按钮 是否出现
    if(page>4){
      this.setState({leftEllipsis: true})
    }
    else{
      this.setState({leftEllipsis: false})
    }

    //页码只显示5个，往后/往前点多了，前面/后面的会被挤掉
    if(page === this.state.pageBtn[4]){ //朝后翻页
      this.state.pageBtn.shift() //移除第1个元素 只剩4个了 原先的第5个成第4个
      this.state.pageBtn.splice(4, 0, this.state.pageBtn[3]+1) //添加尾部页码: 剩余只有4个数，splice的下标从1开始，所以在第4个数pagebtn[3] 后添加
      this.setState({ pageBtn: this.state.pageBtn })
    }
    else if(page === this.state.pageBtn[0] && page != 1){//朝前翻页
      this.state.pageBtn.unshift(this.state.pageBtn[0]-1) //先在第1个位置加1个数
      this.state.pageBtn.splice(5, 1) //移除最后1个数字
      this.setState({ pageBtn: this.state.pageBtn })
    }

    this.props.onPage(this.currentPage) //向其父组件PostList发送 点击的页码
  }

}