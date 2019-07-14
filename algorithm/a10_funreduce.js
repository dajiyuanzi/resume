/*实现一个reduce函数，作用和原生的reduce类似下面的例子。
Ex：

 var sum = reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0); => 6
 */

function reduce(arr,fn,initvalue){
    var arr2 = (initvalue === undefined ? [] :[initvalue]).concat(arr)
    while(arr2.length>1) {
        arr2.splice(0,2,fn(arr2[0],arr2[1]))
    }
    return arr2[0]
}
var sum = reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0)
console.log(sum)