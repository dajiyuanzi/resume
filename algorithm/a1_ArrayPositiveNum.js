//写一个函数，操作数组，返回一个新数组，新数组中只包含正数。

/*function filterPositive(arr){
    for(var key in arr){
        if(typeof arr[key] !== 'number'){
            arr.splice(key, 1);
        }
        else if(arr[key]<=0){
            arr.splice(key, 1);
        }
    }
    return arr;
}
var arr = [3, -1,  2,  '饥人谷', true];
filterPositive(arr); //必须执行两次，因为splice改变了元素组的长度.
console.log(filterPositive(arr)); //[3,  2]
*/

function filterPositive(arr){
    var arr2=[];
    arr2 = arr.filter(function(e){
        if(e > 0 && typeof e == 'number'){
            return true;
        }
    });
    return arr2;
}

var arr = [3, -1,  2,  '饥人谷', true];
console.log(filterPositive(arr)); //[3,  2]