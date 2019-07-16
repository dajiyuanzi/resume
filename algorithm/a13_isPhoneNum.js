//写一个函数isPhoneNum(str)，判断用户输入的是不是手机号。

function isPhoneNum(str){
    var reg=/^1[3578]\d{9}$/
    return reg.test(str)
}

console.log(isPhoneNum('18396735291'))
console.log(isPhoneNum('183967352a1'))
console.log(isPhoneNum('1839673529111'))