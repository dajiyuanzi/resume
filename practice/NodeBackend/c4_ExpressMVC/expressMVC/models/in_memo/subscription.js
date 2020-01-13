class Subscription{
  constructor(userId, url){
    this.userId = userId
    this.url = url
  }

  static list(){
    return Subscription.subscriptions
  }
  static insert(userId, url){
    const sub = new Subscription(userId, url)
    Subscription.subscriptions.push(sub) //静态属性subscriptions数组
    return sub
  }
  static findByUserId(userId){
    return Subscription.subscription.map(s=>s.userId===userId)
  }
}

Subscription.subscriptions = [] //静态属性

module.exports = Subscription
