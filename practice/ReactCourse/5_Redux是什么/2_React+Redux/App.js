
//引入react 和 它的组件类
import React, { Component } from 'react';

class App extends Component { //不需要super
  //承接 父组件传来的 store数据中的回调函数，但并不是 store本身传过去了
  add1(){
    this.props.onAdd1()
  }
  add2(){
    this.props.onAdd2()
  }
  add3(){
    this.props.onAdd3()
  }
  add4(){
    this.props.onAdd4()
  }

  render() {
    return (
      <div>
        你点击了 <span id="value">{this.props.value}</span> 次  {/* 不能直接拿到index.js声明的store数据，用index.js里的父组件的传值 */}
        <div>
          <button id="add1" onClick={()=> this.add1()}>+1</button>
          <button id="add2" onClick={()=> this.add2()}>+2</button>
          <button id="add1IfOdd" onClick={()=>this.add3()}>如果是单数就+1</button>
          <button id="add1After2Sec" onClick={()=>this.add4()}>两秒钟后+1</button>
        </div>
      </div>
    );
  }
}

//react比原生好处，是 只更新有修改的部分，不需要全部重新渲染

//React+Redux流程本质是：
//一层层的，儿子组件把 Redux的状态数据 由props给父亲，父传爷

//React+Redux的缺点 和 用React-Redux克服
//React+Redux这样 层层嵌套传递，根本不好用。为让组件直接获得 Redux的状态信息store，并发起修改的action，则用React-Redux(React内置的redux)   (或者用React内置的 钩子Hooks，干掉redux)

export default App;
