import axios from 'axios'

export default function GetData(url, Para, callback){
  axios.get(url, {
    params: Para //用params里的参数在url的方式：url?para1=xxx&para2=xxx。若url不需要'?para'此形式，可以直接在url里拼接参数，para的{}设为空
  })
  .then(function(res){
    callback(res)
  })
  .catch(function (error) {
    console.log(error);
  });
}