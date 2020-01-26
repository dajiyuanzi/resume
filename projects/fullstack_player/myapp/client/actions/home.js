
/*
* 本文件包含首页的所有action，个人推荐，歌单，排行榜
*/


//定义
export const CHANGE_TEST = 'CHANGE_TEST';

// 引入axios封装好ajax传输，页面使用时Ajax.getAjax(url,cb),其中getAjax是ajax中封装函数的名字，cd是回调函数
import * as Ajax from './ajax';


// 获取推荐歌单
// 定义
export const GET_PERSONAL_DETAIL = 'GET_PERSONAL_DETAIL';
const PersonalizedDetail = (response) => ({
  type: GET_PERSONAL_DETAIL,
  personalizedDetail: response
})
export const getPersonalized = () => { 
  return function (dispatch) {
    //刚才我们定义的接口，路由有"api"这个字符 的原因是 我们在app.js中定义的路由
    Ajax.getAjax(`/api/personalized`, function (response) {
      if (response) {
        // 通过dispatch调用getNewSongs函数，将获取的值传给reducer,更新action对应的函数
        dispatch(PersonalizedDetail(response.data))
      }
    })
  }
}


//添加歌单action
//定义
export const GET_PLAYLIST_DETAIL = 'GET_PLAYLIST_DETAIL';
//获取歌单
const PlayListDetail = (response) => ({
  type: GET_PLAYLIST_DETAIL,
  playListDetail: response
})
export const getPlayList = () => {
  return function (dispatch) {
    Ajax.getAjax(`/api/playlist`, function (response) {
      if (response) {
        // 通过dispatch调用getNewSongs函数，将获取的值传给reducer,更新action对应的函数
        dispatch(PlayListDetail(response.data))
      }
    })
  }
}

