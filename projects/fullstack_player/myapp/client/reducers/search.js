
import { GET_SEARCH } from '../actions/search'
//初始化state
let initialState = {
  searchDetail: [],
};
//searchDetail 表示查询结果
export default function search(state = initialState, action) {
  switch (action.type) {
    case GET_SEARCH:
      return Object.assign({}, state, { searchDetail: action.searchDetail, });
    default:
      return state;
  }
}


