//对以下代码 users中的对象，分别以 name 字段、age 字段、company 字段进行排序

var users = [
  { name: "John", age: 20, company: "Baidu" },
  { name: "Pete", age: 18, company: "Alibaba" },
  { name: "Ann", age: 19, company: "Tecent" }
]

//从小到大
var nameSort = users.sort(function(v1, v2){
    return v1.name-v2.name;
});
console.log(nameSort);

var ageSort = users.sort(function(v1, v2){
    return v1.age-v2.age;
});
console.log(ageSort);

var companySort = users.sort(function(v1, v2){
    return v1.company-v2.company;
});
console.log(companySort);

