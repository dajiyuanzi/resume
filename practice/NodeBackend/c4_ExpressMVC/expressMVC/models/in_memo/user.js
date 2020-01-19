//本文件即 MVC的model层

class User{
  constructor(firstName, lastName, age){
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
    User.id+=1 //静态属性
    this._id = User.id
  }
  getName(){
    return `${this.firstName} ${this.lastName}` //字符串模板
  }

  static insert(firstName, lastName, age){
    const u = new User(firstName, lastName, age)
    User.users.push(u) //users是User的静态属性
    console.log(User.users.push(u))
    return u
  }
  static getOneByName(firstName, lastName){ //查找用户
    return User.users.find(u => u.firstName === firstName && u.lastName === lastName)
  }
  static getOneById(userId){
    return User.users.find(u => u.id ===userId)
  }
  static list(query){ //列举所以用户
    return User.users
  }
  // static get ['users'](){ //static get ['users'](){} 等同于User.users = []    console.log('User.users')
  //   return users
  // }
}
//贫血设计模式：若数据对象只用来 存储数据，没有别的方法 去操作数据，Java中叫plain old object

User.users = [] //静态属性
User.id = 0 //静态属性

module.exports = User

/* //测试代码
console.log(User.list())
console.log(User.insert('ke', 'yang', 12))
console.log(User.insert('lao', 'san', 23))
console.log(User.list())

console.log(User.getOneByName('ke', 'yang'))
*/
