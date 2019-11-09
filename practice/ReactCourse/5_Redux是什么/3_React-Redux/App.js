import React, { Component } from 'react';
import { connect } from "react-redux";


class App extends Component {
  render() {
    return (
      <div>
        你点击了 <span id="value">{this.props.n}</span> 次  {/* 通过provider，数据n来自下面的connect(mapStateToProps)() */}
        <div>
          <button id="add1" onClick={()=> this.props.add1()}>+1</button>  {/* 通过provider，函数add来自下面的connect(mapDispatchToProps)() */}
          <button id="add2">+2</button>
          <button id="add1IfOdd">如果是单数就+1</button>
          <button id="add1After2Sec">两秒钟后+1</button>
        </div>
      </div>
    );
  }
}

//如何获得index.js的provider传来的store数据：用conect()()获取state和发送action，如下

//获取state其中的数据n 并返回，以渲染到组件的props
function mapStateToProps(state){
  return { //包在对象内
    n: state.n  //n来自index.js中的reducer
  }
}

//对象内有 一个dispatch action的函数，箭头式让其this处于执行时的context，传递给组件的props以触发
const mapDispatchToProps = {
  add1: ()=>{
    return {type:'add', payload: 1}
  } 
}
//connect的函数型写法，把dispatch映射到add1
/*function mapDispatchToProps(dispatch){
  return {
    add1: ()=> dispatch({type:'add', playload:1})
  }
}*/

export default connect(mapStateToProps,mapDispatchToProps)(App);
/* connext(x, y)(App), x和y的名称 随便取，App是相关的组件class，connect把x和y合并为props传给App
X必须是函数，该函数返回 state中需要的数据 x:state.x (获得状态); --把state映射到props.n
y是 对象{}或函数，该对象{} 返回 要dispatch的action，以变更状态 (更新状态) --把dispatch action映射到props.add1() */


/* connect(x, y)(App)的运作流程
y被触发时，把数据变更的action发给index.js，其内中的store(reducer)来处理state更新，provider将监听state更新
并把数据传递给 子组件APP, 其中的connect(y)将再获取数据以渲染。 */


/*注意
export必须是connect(x, y)(APP)返回的数据 (即 是个加工过的组件)，而不是APP本身，也就是说，如下写法不行

connect(x, y)(APP)
export default APP  错

应该是 
export default connect(x, y)(APP)  对
*/


//PS：bindActionsCreatorrs({type:'add'}, dispatch) 等同于 dispatch({type:'add'})

