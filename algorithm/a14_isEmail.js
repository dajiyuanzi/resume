//写一个函数isEmail(str)，判断用户输入的是不是邮箱。

function isEmail(str){
    var reg=/^\w+[@]\w+(\.\w+)$/
    return reg.test(str)
}

console.log(isEmail('dajiyuanzi@foxmail.com'))
console.log(isEmail('dajiyuanzi@foxmail.com.cn'))
console.log(isEmail('dajiyuanzi@@foxmail.com'))

