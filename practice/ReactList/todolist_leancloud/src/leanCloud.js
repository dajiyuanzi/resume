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