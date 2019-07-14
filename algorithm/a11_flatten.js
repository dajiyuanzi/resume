/*实现一个flatten函数，将一个嵌套多层的数组 array（数组） (嵌套可以是任何层数)转换为只有一层的数组，数组中元素仅基本类型的元素或数组，不存在循环引用的情况。
Ex:：

flatten([1, [2], [3, [[4]]]]) => [1, 2, 3, 4];*/

function flat(arr){
    var arr2=[]
    arr.forEach(function(val){
        if(Array.isArray(val)){
            arr2=arr2.concat(flat(val))
        }
        else{
            arr2.push(val)
        }
    })
    return arr2
}

var arr=[3, ['4,5', 7, [1]], [2, 10]]
var arr2=flat(arr)
console.log(arr2)

