import React, { Component } from 'react'
import getData from './data'

export default class rep_board extends Component {
  constructor(props){
    super(props)
    this.state = {
      projects: [],
      loadAnimation: "block"
    }
    this.pageNum=1
    this.isLoading = false //默认ajax不发送请求 判断是否正加载
    this.count=30 //githubapi每页的数据条目数。this特指 属于类的实例 的自身环境，this.xxx特指实例环境中的变量
    this.url='https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc'

    getData(this.url, this.pageNum, function(res){ //运行引入的函数，不是声明
      this.setState({
        projects: res.data.items,
        loadAnimation: "none"
      })
    }.bind(this)) //回调要指定为当前的运行环境，因此要用bind或者箭头函数
  }

  render(){
    let projectsDom = this.state.projects.map(( item, index )=>{ //这里要用箭头函数，将回调的context设置在此class，而不是变量自身的环境（详见 回调函数的笔记）
      return (
        <div class="item" key={item.id}>
          <a href={item.html_url}>
            <div class="order"><span>{index+1}</span></div>
            <div class="detail">
              <h2>{ item.name }</h2>
              <div class="description">{ item.description }</div>
              <div class="extra">
                <span class="star-count">{ item.stargazers_count } star</span>
              </div>  
            </div>
          </a>
        </div>
      )
    })

    return (
      <section ref="container" id="repo-board" onScroll={this.scrollLoad.bind(this)}>
        <div ref="content" class="container">
          {projectsDom}
        </div>
        <div class="loading" style={{ display:this.state.loadAnimation }}><span class="iconfont icon-loading"></span></div>
        {/* 加载中，默认display: none;，加载时显示 */}
      </section>
    )
  }

  scrollLoad(){
    if(
      //判断触底 滚动到靠近底部才加载,
      (this.refs.container.clientHeight+this.refs.container.scrollTop+50 > this.refs.content.scrollHeight) &&
      
      //节流:判断是否正加载, 数据没有完成&没有在加载中，就不要发送请求。
      (this.isLoading === false)
    ){
      this.isLoading = true 
      this.pageNum++
      this.setState({loadAnimation: "block"})
      getData(this.url, this.pageNum, function(res){
        this.setState({ //setState更新数据和渲染
          projects: this.state.projects.concat(res.data.items), //concat把新旧数据数组相连成一串，push会把整个数组作为一个数组元素塞进去。
          loadAnimation: "none"
        })
        this.isLoading = false

        // console.log('hahaha scroll')
        // console.log(this.pageNum)
        // console.log(this.isLoading)
        // console.log(this.state.projects)
      }.bind(this))
    }
  }
    
}

