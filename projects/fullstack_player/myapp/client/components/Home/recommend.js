
// 引入react
import React, { Component } from 'react'
import './recommend.less'
import { connect } from "react-redux";
import Carousels from './carousels'

import FontAwesome from 'react-fontawesome';
import { Flex } from 'antd-mobile';

//引入action中的方法
import { getPersonalized } from "../../actions/home";

class Recommend extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { // 在class中添加componentDidMount生命周期，并执行方法最初获取数据
    this.props.dispatch(getPersonalized());
  }

  render() {
    const { personalizedDetail } = this.props;
    return (
      <div style={{ width: '100%', }}>
        <Carousels />

        <div className='recommend-container'>
          <Flex>
            <Flex.Item>
              <div>
                <FontAwesome key='address-card-o' name="address-card-o"></FontAwesome>
              </div>
              <span>私人FM</span>
            </Flex.Item>
            <Flex.Item>
              <div>
                <FontAwesome key='calendar' name="calendar"></FontAwesome>
              </div>
              <span>每日歌曲推荐</span>
            </Flex.Item>
            <Flex.Item>
              <div>
                <FontAwesome key='signal' name="signal"></FontAwesome>
              </div>
              <span>云音乐热歌榜</span>
            </Flex.Item>
          </Flex>
        </div>
        <div className='recommend-songs'>
          <div className='recommend-title'>推荐歌单 &gt;</div>
          {/*循环获取每一个的值并显示 下面是return jsx内 再写js return*/}
          {
            personalizedDetail.map((item, index) => {
              return (
                <div className='recommend-content content' key={index}>
                  <div className='song-cover'>
                    <p>
                      <i className='fa fa-headphones'></i> {item.playCount}
                    </p>
                    <img src={item.picUrl} />
                  </div>
                  <div className='song-describition'>{item.name}</div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

function select(state) { //改变最后的function select,获取全局的state，它return的就是render()中的this.props
  return {
    personalizedDetail:state.home.personalizedDetail, //home是来自reducers/rootReducer.js
  }
}

export default connect(select)(Recommend);

