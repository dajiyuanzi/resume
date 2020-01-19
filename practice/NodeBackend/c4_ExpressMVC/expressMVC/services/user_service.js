//const User = require('../models/in_memo/user') //原生mongodb
const User = require('../models/mongoose/user') //mongoose
const Subscription = require('../models/in_memo/subscription')

module.exports.getAllUsers = async function(){
  const users = await User.list()
  return users
}
module.exports.addNewUser = async function(firstName, lastName, age){
  const users = await User.insert(firstName, lastName, age)
  return users
}
module.exports.getUserById = async function(userId){
  const users = await User.getOneById(userId)
  return users
}
module.exports.createSubscription = async function(userId){
  const user = User.getOneById(userId)
  if(!user) throw Error('No such user!')
  const sub = Subscription.insert(userId, url)
  return sub
}