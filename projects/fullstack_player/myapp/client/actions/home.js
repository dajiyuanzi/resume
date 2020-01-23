
/*
* 本文件包含首页的所有action，个人推荐，歌单，排行榜
*/

//定义
export const CHANGE_TEST = 'CHANGE_TEST';

//获取歌单
export const PlayListDetail = (response) => ({
  type: CHANGE_TEST,
  test: response
})
