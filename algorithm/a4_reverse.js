//写补全sortString函数，实现字符串倒序

function  sortString(str){
    return str.split('').reverse().join(''); //js中字符串不是数组，要先变成数组。split() 方法用于把一个字符串分割成字符串数组。
}
var str = 'jirenguhungervalley'
var str2 = sortString(str)
console.log(str2) // 'yellavregnuhugnerij'