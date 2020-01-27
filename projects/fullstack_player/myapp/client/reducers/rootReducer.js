
//通过 combineReducers(reducers) 可以把多个 reducer 合并成一个 rootReducer
import { combineReducers } from "redux"; 

import home from './home'; //这里引入添加的reducer文件
import rank from './rank';
import search from './search';

var rootReducer=combineReducers({
  home,
  rank,
  search
});

export default rootReducer;

