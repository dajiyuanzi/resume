

// 引入react
import React, { Component } from 'react'
import './playList.less'
import { connect } from "react-redux";

import { Flex } from 'antd-mobile'; //引入antd-mobile布局组件Flex

import { getPlayList } from "../../actions/home"; //引入action中的方法

class PlayList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() { //在class中添加componentDidMount生命周期，并执行方法最初获取数据
    this.props.dispatch(getPlayList());
  }

  render() {
    const { playListDetail }=this.props

    return (
      <div className="palylist">
        <a href='#' className='banner'>
          <img src='/imgs/song_cover8.jpg' />
          <div>
            <div className='title'>精品歌单 &gt;</div>
            <p className='sub-title'>古典优美的声乐曲集</p>
            <p className='description'>古典音乐不只有"纯音"哦~</p>
          </div>
        </a>
        <div className='playlists-classify'>
          <a className='all-playlists' href='#'>全部歌单 &gt;</a>
          <div className='classify'>
            <Flex>
              <Flex.Item>欧美</Flex.Item>
              <Flex.Item>摇滚</Flex.Item>
              <Flex.Item>民谣</Flex.Item>
            </Flex>
          </div>
        </div>
        {
          playListDetail.map((item, index) => {
            return (
              <div className='playlists-content' key={index}>
                <div>
                  <img src={item.coverImgUrl} />
                </div>
                <div className='song-describition'>{item.name}</div>
                <div className='creator'>by {item.creatorName}</div>
              </div>
            )
          })
        }
      </div>
    )
  }
}


function select(state) {
  return {
    playListDetail:state.home.playListDetail,
  }
}

export default connect(select)(PlayList);
