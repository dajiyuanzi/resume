import React, {Component} from 'react';
import {connect} from 'react-redux'


class App extends Component {
  render(){
    return (
      <div>
        <p>Clicked Times: {this.props.n}</p>
        <button onClick={()=>this.props.addDis()}>Plus 1</button>
      </div>
    )
  }
}

function StateProps(state){
  return {
    n: state.n
  }
}

const ActionProps = {
  addDis:()=>{
    return {type:'add', payload:1}
  }
}

export default connect(StateProps, ActionProps)(App);

