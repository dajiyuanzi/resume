//用 splice函数分别实现 push、pop、shift、unshift方法。

function push(arr, ...args){
    arr.splice(arr.length, 0, ...args)
    return arr.length
}

function pop(arr){
    arr.splice(arr.length-1, 1);
    return arr.length;
}
var a1=[1,4,7];
//console.log(pop(a1));
//console.log(a1);

function unshift(arr, ...args){
    arr.splice(0, 0, ...args);
    return arr.length;
}
//console.log(shift(a1, 9, 10));
//console.log(a1);

function shift(arr){
    arr.splice(0, 1);
    return arr.length;
}
console.log(shift(a1));
console.log(a1);