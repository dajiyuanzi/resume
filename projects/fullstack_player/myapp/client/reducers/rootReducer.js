import { combineReducers } from "redux"; 

import home from './home'; //这里引入添加的reducer文件

var rootReducer=combineReducers({
  home,
});

export default rootReducer;

