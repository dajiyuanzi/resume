export function login(state){
  return {
    type:'LOGIN_START',
    playload: {
      state:state
    }
  }
}

export function loginWithAsync(state){
  return (dispatch, getState)=>{
    let startTime=Date.now()
    setTimeout(()=>{
      dispatch({
        type: 'LOGIN_START',
        playload: {
          state:state
        }
      })
      console.log(Date.now()-startTime)
    }, 2000)
  }
}