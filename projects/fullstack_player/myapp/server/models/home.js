
var Personalized = require('../schemas/personalized');
//创建一个方法 获取数据
exports.getPersonalized = (req, res, next) => {
  Personalized.find({}, function (err, result) {
    res.send(result);
  })
}


//获取歌单
var PlayList = require('../schemas/playList');
//创建一个方法获取数据
exports.getPlayList = (req, res, next) => {
  PlayList.find({}, function (err, result) {
    res.send(result);
  })
}



