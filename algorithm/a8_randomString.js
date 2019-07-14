//写一个函数，生成一个长度为 n 的随机字符串，字符串字符的取值范围包括0到9，a到 z，A到Z。

function getRandStr(len){
    var ran_char = ''
    var char_list = '0123456789abcdefghijklmnonqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    var list_len = char_list.length
    for(var i = 0; i < len; i++){
        ran_char += char_list[Math.floor(Math.random() * list_len)]
    }
    return ran_char
}
var str = getRandStr(10) // 0a3iJiRZap
console.log(str)