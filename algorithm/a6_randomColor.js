//写一个函数，生成一个随机颜色字符串，合法的颜色为#000000~ #ffffff。

function getRandColor(){
    var color = ['#']
    var num = '0123456789abcdef'
    var index
    for (let i = 0; i <= 6; i++) {
        index = Math.floor(Math.random()*16) //因为random可能等于0，但是一定小于1，且用floor，所以此处写16，不写15
        color += num[index]
    }
    return color
}
var color = getRandColor()
console.log(color)   // #3e2f1b