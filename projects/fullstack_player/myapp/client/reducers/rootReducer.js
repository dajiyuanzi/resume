import { combineReducers } from "redux"; 

import home from './home'; //这里引入添加的reducer文件
import rank from './rank';

var rootReducer=combineReducers({
  home,
  rank
});

export default rootReducer;

