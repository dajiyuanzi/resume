import AV from 'leancloud-storage'

//拷贝leancloud初始化代码, 这些码和地址都是leancloud生成的
var APP_ID ='v14NvWPzvoqzf1OAVFrlamua-gzGzoHsz'
var APP_KEY = '4kTB4FACraYqwnn9IWrmlmHV'
var serURLs = 'https://v14nvwpz.lc-cn-n1-shared.com'
AV.init({
  appId: APP_ID,
  appKey: APP_KEY,
  serverURLs: serURLs
})

export default AV


export function signUp(username, password, successFn, errorFn){
  // 新建AVUser对象实例
  var user = new AV.User()

  // 设置用户名
  user.setUsername(username)

  //设置密码
  user.setPassword(password)

  //设置邮箱
  user.signUp().then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function(error){
    errorFn.call(null, error)
  })

  return undefined
}

export function signIn(username, password, successFn, errorFn){
  AV.User.logIn(username, password).then(function(loginedUser){
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user) //默认执行context在非严格下 为全局window，当UserDialog调用时就是它的context
  }, function(error){
    errorFn.call(null, error)
  })
}

export function getCurrentUser(){
  let user = AV.User.current()
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}

export function signOut(){
  AV.User.logOut()
  return undefined
}

function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id, //leancloud中 数据对象 是leancloud自动生成的
    ...AVUser.attributes //attributes是leancloud中 用户对象 的属性
  }
}
//console.log(AV.User.current().attributes)
