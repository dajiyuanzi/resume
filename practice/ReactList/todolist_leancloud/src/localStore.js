//每次用户更新数据时，就将所有 todo 以字符串的形式保存在 localStorage 里

export function save (key, value){ 
  return window.localStorage.setItem(key, JSON.stringify(value))
}
//localStorage 创建一个本地存储的 name/value 对，JSON.stringify将值转换为 JSON 字符串

export function load(key){ //SON.parse()将一个 JSON 字符串转换为对象
  return JSON.parse(window.localStorage.getItem(key))
}
