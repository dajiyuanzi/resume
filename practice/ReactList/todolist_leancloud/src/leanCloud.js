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

//下面用的是leancloud的接口

export function signUp(email, username, password, successFn, errorFn){
  // 新建AVUser对象实例
  var user = new AV.User()

  // 设置用户名
  user.setUsername(username)

  //设置密码
  user.setPassword(password)

  //设置邮箱
  user.setEmail(email)

  //注册判断 
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
    successFn.call(null, user) //默认执行context在非严格下 为全局window，当UserDialog组件调用时就是它的context
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

export function sendPasswordResetEmail(email, successFn, errorFn){
  AV.User.requestPasswordReset(email).then(function(success){ //leancloud内的用户对象
    successFn.call()
  }, function(error){
    console.dir(error) //在控制台中显示指定JavaScript对象的属性，并通过类似文件树样式的交互列表显示。
  })
}

function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id, //leancloud中 数据对象 是leancloud自动生成的
    ...AVUser.attributes //attributes是leancloud中 用户对象 的属性
  }
}
//console.log(AV.User.current().attributes)
