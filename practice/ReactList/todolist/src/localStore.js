export function save (key, value){ 
  return window.localStorage.setItem(key, JSON.stringify(value))
}
//localStorage 创建一个本地存储的 name/value 对，SON.stringify将值转换为 JSON 字符串

export function load(key){
  return JSON.parse(window.localStorage.getItem(key))
}
