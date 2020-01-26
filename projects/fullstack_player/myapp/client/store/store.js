
// 引入总的rootReducer,其内还有reducer对action的处理
import rootReducer from "../reducers/rootReducer";
// createStore 用于创建store ,applyMiddleware 使用中间件
import { createStore,applyMiddleware } from 'redux';
// thunk 是中间件用于使action函数支持异步；
import thunk from 'redux-thunk';

const store=createStore(rootReducer, applyMiddleware(thunk));
export default store;
