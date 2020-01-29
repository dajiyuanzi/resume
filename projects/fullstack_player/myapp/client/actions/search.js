
/*
 * 本文件包含查询页面的所有action
 当输入框失去焦点时我们需要将输入框的值传给后端，需要在actions目录下的search.js文件内完成这个动作
*/

import * as Ajax from './ajax'
//定义
export const GET_SEARCH = 'GET_SEARCH';

//获取查询结果
const getSearch = (response) => ({
  type: GET_SEARCH,
  searchDetail: response,
})
export const getSearchDetail = (data) => {
  return function (dispatch) {
    if (data) {
      //查询记录需要永久保存，所以将值用localStorage存储，每次调用都需获取localStorage中是否有值，使用getItem来获取，又因localStorage只能识别String类型，所以需要使用JSON.parse()将读取的值转化为数组
      let arr = JSON.parse(window.localStorage.getItem('searchRecord')) || [];
      //给数组原型条件一个方法实现根据数组元素的值来对应删除元素。排除搜索记录中相同的记录
      Array.prototype.removeByValue = function (val) {
        for (var i = 0; i < this.length; i++) {
          if (this[i] == val) {
            this.splice(i, 1);
            break;
          }
        }
      }
      arr.removeByValue(data);

      //data是调用时传入的值，就是搜索输入框的值。添加至数组的第一位。
      arr.unshift(data);
      
      //将arr数组（也就是搜索记录）存入localStorage，setItem()是存储方法。
      window.localStorage.setItem('searchRecord', JSON.stringify(arr));
    }
    //通过接口将输入的值传入后台进行查询
    Ajax.getAjax(`/api/search?search=${data}`, function (response) {
      if (response) {
        dispatch(getSearch(response.data));
      }
    })
  }
}

