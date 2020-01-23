//前端入口文件+路由配置文件

//引入react,react-dom,redux
import React, { Component } from 'react';
import { render } from 'react-dom';

// 引入React-Router模块
import { HashRouter, Router, Route, hashHistory,Link } from 'react-router-dom'

// 引入React-redux
import { Provider }from "react-redux";
import store from "./store/store";

//引入自定义组件
import Home from "./pages/home"; //首页页面（个性推荐，歌单，主播电台，排行榜）
import Login from "./pages/login";

// 配置路由 (Provider 是一个react组件，提供一个全局的store使得所有的组件都可以使用)
render((
  <Provider store={store}>
    <HashRouter>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
      </div>
    </HashRouter>
  </Provider>
),document.getElementById('content')); //这里的content需要与public/index.html中div的id一致


//监听app中更改的情况
if (module.hot) {
  module.hot.accept();
}

