
//做搜索功能时，我们需要一个数据接口，根据前端传入的值，进入数据库中进行模糊查询并将数据返回前端进行展示。
var Songs = require('../schemas/newSongs');
exports.searchSongs = (req, res, next) => {
    var search = new RegExp(req.query.search);
    Songs.find( { $or: [ { 'name': search }, { 'artistName': search } ] },function(err, result){
        res.send(result);
    });
};

