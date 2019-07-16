//写一个函数isValidUsername(str)，判断用户输入的是不是合法的用户名（长度6-20个字符，只能包括字母、数字、下划线）。

function isValidUsername(str){
    var reg=/^\w{6,20}$/
    return reg.test(str)
}

console.log(isValidUsername('kask2daskd'))
console.log(isValidUsername('12222  sdada'))
console.log(isValidUsername('kaskdaskdddddddddddddddddddddddddddddddd'))
