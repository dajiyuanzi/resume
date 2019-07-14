//写一个函数，返回从min到max之间的 随机整数，包括min不包括max。

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min; //如果包括max，则需要+1，因为random可能等于0，但是一定小于1，且floor取小于随机数的最大整数
}

console.log(getRandomInt(3, 10))
