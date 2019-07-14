/*写一个函数，参数为时间对象毫秒数的字符串格式，返回值为字符串。假设参数为时间对象毫秒数t，根据t的时间
分别返回如下字符串：

刚刚（ t 距当前时间不到1分钟时间间隔）
3分钟前 (t距当前时间大于等于1分钟，小于1小时)
8小时前 (t 距离当前时间大于等于1小时，小于24小时)
3天前 (t 距离当前时间大于等于24小时，小于30天)
2个月前 (t 距离当前时间大于等于30天小于12个月)
8年前 (t 距离当前时间大于等于12个月)
*/

function friendlyDate(time){
    var nowtime=Date.now()
    var interval=nowtime-parseInt(time)
    var answer
    switch (true){
        case interval<60000:
            answer='刚刚'
            break
        case interval>=60000 && interval<3600000:
            answer='3分钟前'
            break
        case interval>=3600000 && interval<86400000:
            answer='8小时前'
            break
        case interval>=86400000 && interval<2592000000:
            answer='3天前'
            break
        case interval>=2592000000 && interval<31104000000:
            answer='2个月前'
            break
        case interval>=31104000000:
            answer='8年前'
            break
        default:
    }
    console.log(answer)
    return answer
}
var str = friendlyDate( '1484286699422' ) //  1分钟前（以当前时间为准） 8年前
var str2 = friendlyDate('1563119511865') //4天前（以当前时间为准） 3分钟前