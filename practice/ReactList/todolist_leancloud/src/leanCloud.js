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


// 把所有跟 Todo 相关的 LeanCloud 操作都放到这个对象里，而不是一个个接口export
// 所有跟 Todo 相关的 LeanCloud 操作都放到这里
export const TodoModel = {
  getByUser(user, successFn, errorFn){ //请求todo的数据
    // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
    let query = new AV.Query('Todo')
    query.equalTo('deleted', false) //获取所有deleted属性为false的todo
    query.find().then((response)=>{
      let array = response.map((t)=>{ //map(func)返回一个新数组，其元素为原始数组元素调用处理函数后的值。
        return {id: t.id, ...t.attributes}
      })
      successFn.call(null, array)
    }, (error)=>{
      errorFn && errorFn.call(null, error)
    })
  },
  create({status, title, deleted}, successFn, errorFn){
    let Todo = AV.Object.extend('Todo') // 声明leancloud的1个class，下面存入云端,leancloud回自动给每条数据加id
    let todo = new Todo() // 构建对象
    todo.set('title', title) // 为属性赋值 key+value
    todo.set('status', status)
    todo.set('deleted', deleted)

    //只获得属于当前用户的todo，使用 Access Control Layer 访问控制层，让新建的 todo 只能被当前用户访问
    // 根据文档 https://leancloud.cn/docs/acl-guide.html#hash-1171845695
    // 这样做就可以让这个 Todo 只被当前用户看到
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false) // 注意这里是false。默认当前用户可读，默认public 不可写。
    acl.setWriteAccess(AV.User.current(), true)
    acl.setReadAccess(AV.User.current(), true)
    todo.setACL(acl)

    todo.save().then(function(response){
      successFn.call(null, response.id)
    }, function(error){
      errorFn && errorFn.call(null, error) //结合性Associative property: a=1&&3 返回3；a=1||3返回1。 或|| 即使第一个false，还会往下看，第二个数为true在返回第二个；两边皆true，返回第一个数（与&&相反），即第一个true则不再往下看了。
    });
  },
  update({id, title, status, deleted}, successFn, errorFn){
    // 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#更新对象
    let todo = AV.Object.createWithoutData('Todo', id)
    title !== undefined && todo.set('title', title) //!==先执行，其优先级高于&&
    status !== undefined && todo.set('status', status)
    deleted !== undefined && todo.set('deleted', deleted)
    // 为什么我要像上面那样写代码？
    // 考虑如下场景
    // update({id:1, title:'hi'})
    // 调用 update 时，很有可能没有传 status 和 deleted
    // 也就是说，用户只想「局部更新」
    // 所以我们只 set 该 set 的
    // 那么为什么不写成 title && todo.set('title', title) 呢，为什么要多此一举跟 undefined 做对比呢？
    // 考虑如下场景
    // update({id:1, title: '', status: null}}
    // 用户想将 title 和 status 置空，我们要满足
    todo.save().then((response) => {
      successFn && successFn.call(null)
    }, (error) => errorFn && errorFn.call(null, error))
  },
  destroy(todoId, successFn, errorFn){
    
    //删除数据
    // 文档 https://leancloud.cn/docs/leanstorage_guide-js.html#删除对象
    // let todo = AV.Object.createWithoutData('Todo', todoId)
    // todo.destroy().then(function (response) {
    //   successFn && successFn.call(null)
    // }, function (error) {
    //   errorFn && errorFn.call(null, error)
    // });

    // 我们不应该删除数据，而是将数据标记为 deleted，这样方便用户查看他删掉的todo
    TodoModel.update({id: todoId, deleted: true}, successFn, errorFn)
  }
}

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
    successFn.call(null, user) //默认执行context在非严格下 为全局window，当UserDialog组件调用 此回调successFn时, 才是successFn的context
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

export function sendPasswordResetEmail(email, successFn, errorFn){ //js的function的参数不需要全填上，不用的参数也算是预留的接口
  AV.User.requestPasswordReset(email).then(function(success){ //leancloud内的用户对象
    successFn.call()
  }, function(error){
    //console.dir(error) //在控制台中显示指定JavaScript对象的属性，并通过类似文件树样式的交互列表显示。
    errorFn.call(null, error)
  })
}

function getUserFromAVUser(AVUser){
  return {
    id: AVUser.id, //leancloud中 数据对象 是leancloud自动生成的
    ...AVUser.attributes //attributes是leancloud中 用户对象 的属性
  }
}
//console.log(AV.User.current().attributes)
