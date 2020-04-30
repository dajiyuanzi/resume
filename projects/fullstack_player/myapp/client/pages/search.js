

/*
 搜索页面
*/
import React, { Component } from 'react'
import { connect } from "react-redux";
import FontAwesome from 'react-fontawesome';
import '../styles/search.less'

import { getSearchDetail } from '../actions/search'

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchRecords:[],
    }
  }

  handleSearch() { //点击回退按钮
    window.history.go(-1);
  }

  changeState() { //获取 localStorage 存储的数据 并渲染刷新页面
    //获取值
    let searchRecord = JSON.parse(window.localStorage.getItem('searchRecord'));
    this.setState({
      searchRecords: searchRecord
    })
  }
  componentDidMount() {
    this.changeState();
  }

  searchSongs() { //输入框失去焦点事件触发
    //获取输入框的值
    const search = this.search.value;
    if (search != '') {
      this.props.dispatch(getSearchDetail(search)); //这里是react-redux的用法，store在props里，以此调用store的dispatch。被 connect 过的 component 中的 this.props 有了 dispatch 属性。
    } else {
      this.props.dispatch(getSearchDetail());
    }
  }

  //点击热门搜索事件，实现：当点击热门搜索时需要自动搜索并将输入框的值替换成热门搜索
  searchItem(item) {
    this.search.value = item;
    this.props.dispatch(getSearchDetail(item));
    this.changeState();
  }

  //删除记录：当点击搜索记录后面删除键时需要更新 localStorage 中的值，并实时删除当前记录
  deleteRecord(item) {
    let searchRecord = JSON.parse(window.localStorage.getItem('searchRecord'));
    //给数组对象添加一个方法(根据元素的值删除指定元素)
    Array.prototype.removeByValue = function (val) {
      for (var i = 0; i < this.length; i++) {
        if (this[i] == val) {
          this.splice(i, 1);
          break;
        }
      }
    }
    searchRecord.removeByValue(item);
    this.setState({
      searchRecords: searchRecord
    })
    //改变localStorage key为searchRecord的值
    window.localStorage.setItem('searchRecord', JSON.stringify(searchRecord));
  }

  render() {
    //热门搜索目前是数据不会动态变化，是一个数组 内包含 热门内容
    const topSearch = ['谢天笑','风去云不回','GAI爷','你坐最后一排，我坐讲台旁边','China-U','薛之谦','林俊杰','未来的进击','alan walker']
    const { searchRecords } = this.state;
    const { searchDetail } = this.props;
    return (
      <div className='search login'>
        <div className='login-title'>
          <a onClick={() => this.handleSearch()}>
            <FontAwesome name='arrow-left' key='arrow-left'></FontAwesome>
          </a>
          <div className="search-input-container">
            <input
              className='search-input'
              placeholder="搜索音乐、歌手、歌词、用户"
              ref={(ref) => this.search = ref}
              onBlur={() => this.searchSongs()}
            />
          </div>
        </div>
        <div className='search-content'>
          <p>热门搜索</p>
          <div className='search-label'>
            {
              topSearch.map((item, index) => {
                return (
                  <a onClick={() => this.searchItem(item)} key={index}>{item}</a>
                )
              })
            }
          </div>
          <ul className='search-record'>
            {
              searchRecords.map((item, index) => {
                return (
                  <li key={index} className='record-item'>
                    <FontAwesome name='clock-o' className='record-left'></FontAwesome>
                    <span onClick={() => this.searchItem(item)}>{item}</span>
                    <FontAwesome name='times-circle' className='record-right' onClick={() => this.deleteRecord(item)}></FontAwesome>
                  </li>
                )
              })
            }
          </ul>
        </div> 
        {/* 用于选择展示搜索还是搜索结果,必须使用三目运算 */}
        {
          searchDetail.length == 0 ?
            <div className='search-content'>……</div> : 
            <ul className='search-result'>
              {
                searchDetail.map((item, index) => {
                  return (
                    <li key={index}>
                      <div className='song-name'>{item.name}</div>
                      <div className='song-artist'>{item.artistName} - {item.albumName}</div>
                      <div className='song-right'><FontAwesome name='ellipsis-v' key='ellipsis-v'></FontAwesome></div>
                    </li>
                  )
                })
              }
            </ul>
        }
      </div>
    )
  }
}

function select(state) { //取得当前搜索结果
  return {
    searchDetail:state.search.searchDetail //serach是来自store的数据 由reducers/rootReducer.js处理action之后产生
  }
}

export default connect(select)(Search);

