import { reacteStore, combineReducers, applyMiddleware } from 'redux'

import signReducer from './reducers/sign'

const reducers = {
  sign: signReducer
}

const middlewares = []

let finalCreateStore

//通过createStore的数据，调用中间件
export default finalCreateStore = applyMiddleware(...middlewares)(createStore)

