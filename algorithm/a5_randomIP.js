//写一个函数，生成一个随机 IP 地址，一个合法的 IP 地址为 0.0.0.0~255.255.255.255。

function getRandIP(){
    var ipnum = new Array(4);
    for(var i=0;i<4;i++){
        ipnum[i]=Math.floor(Math.random()*255);
    }
    return ipnum;
}
var ip = getRandIP()
console.log(ip) // 10.234.121.45