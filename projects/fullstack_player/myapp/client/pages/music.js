
import React, { Component } from 'react';
import { connect } from "react-redux";
import { List } from 'antd-mobile';
import FontAwesome from 'react-fontawesome';
import Header from "./header";
import '../styles/music.less'

const Item = List.Item;

class Music extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='my-music'>
        <Header />
        <List renderHeader={null} className="my-music-list">
          <Item extra={null}>
            <FontAwesome type='music' name='music'></FontAwesome>
            <span>本地音乐 <span className='songs-num'>(0)</span></span>
          </Item>
          <Item extra={null}>
            <FontAwesome type='music' name='music'></FontAwesome>
            <span>最近播放 <span className='songs-num'>(0)</span></span>
          </Item>
          <Item extra={null}>
            <FontAwesome type='music' name='music'></FontAwesome>
            <span>下载管理 <span className='songs-num'>(0)</span></span>
          </Item>
          <Item extra={null}>
            <FontAwesome type='music' name='music'></FontAwesome>
            <span>我的电台 <span className='songs-num'>(0)</span></span>
          </Item>
          <Item extra={null}>
            <FontAwesome type='music' name='music'></FontAwesome>
            <span>我的收藏 <span className='songs-num'>(0)</span></span>
          </Item>
        </List>
        <div className='create-playlist'>
          <span>
            <FontAwesome name='angle-right' key='angle-right-1'></FontAwesome> &nbsp;创建的歌单(0)
                    </span>
          <span className='handle'>
            <FontAwesome name='cog' key='cog-1'></FontAwesome>
          </span>
        </div>
        <div className='collect-playlist'>
          <span>
            <FontAwesome name='angle-right' key='angle-right-2' ></FontAwesome> &nbsp;收藏的歌单(0)
                    </span>
          <span className='handle'>
            <FontAwesome name='cog' key='cog-2'></FontAwesome>
          </span>
        </div>
      </div>
    )
  }
}

function select(state) {
  return {

  }
}

export default connect(select)(Music);


/*
<List> 是我们的列表组件，我们可以单个连续模块垂直排列，显示当前内容、状态、和可进行的操作。我们一般使用 <Item> 作为嵌套组件，下面我们来介绍一下 <Item> 的常用属性：
	* extra:右边内容，默认为 null
	* arrow：箭头方向（右、上、下），可选 horizontal，up，down，empty，如果是 empty，虽然不会显示，但是存在对应的 dom，默认为 null
	* align：子元素垂直对齐，可选 top，middle，bottom，默认为 middle
	* error：报错样式，右侧文字变为橙色，默认为 false
	* wrap：是否换行，默认为 false
*/



