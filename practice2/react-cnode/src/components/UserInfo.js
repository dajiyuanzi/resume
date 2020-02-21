import React, { Component } from 'react'

export default class UserInfo extends Component {
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className='UserInfo'>
        {
          this.state.loading === true ? 
          <div className='loading'>
            <img src='/loading.gif' />
          </div> 
          : 
          <div className='userInformation'>
            <section>
              
            </section>
          </div>
        }
      </div>
    )
  }

}
