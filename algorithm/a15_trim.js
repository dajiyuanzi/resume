//写一个函数trim(str)，去除字符串两边的空白字符。
function trim(str){
    return str.replace(/^\s+|\s+$/g,'') //以空格开头，或以空格结尾，全局（不加全局，只replace一个匹配的字符）；
}

console.log(trim('dsadad     dasd gsdf '))