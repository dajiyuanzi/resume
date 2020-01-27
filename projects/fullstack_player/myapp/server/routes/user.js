var express = require('express');
var router = express.Router();
var home = require('../models/home')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//推荐歌单
router.get('/personalized',home.getPersonalized);
// //最新音乐
// router.get('/newsongs',home.getNewSongs);
// //推荐mv
// router.get('/mv',home.getMV);
// //主播电台
// router.get('/djprogram',home.getDJProgram);
// //独家放送
// router.get('/privatecontent',home.getPrivatecontent);
// //推荐歌单
// router.get('/personalized',home.getPersonalized);


var home = require('../models/home')
router.get('/playlist',home.getPlayList);


//引入创建的排行榜接口的方法
var rank = require('../models/rank')
//两个接口一个用于获取官方榜，一个用于或许全球榜
router.get('/officialrank', rank.getOfficialRank);
router.get('/nationalrank', rank.getNationalRank);
//express后端 所监听的请求，都是client/action中定义的js函数发出的；这些js函数是在引用它的组件 在被渲染时，被触发调用的

module.exports = router;
