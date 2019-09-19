//所有的关于数据库的操作，都通过本文件（中间件）来调用
var orm = require('orm')

module.exports = orm.express("sqlite://database.sqlite", {
  define: function (db, models, next) { //orm定义了一个模型 叫note，放在models参数上。用orm（这个orm在npm上就叫orm）把数据保存成 sqlite文件。
      models.note = db.define("note", {
        title: String,
        content: String
      });//orm会自动给 表内的每条数据 一个id
      models.note.sync() //sync(): add the table to the database
      next();//传给下一个中间件
  }
})