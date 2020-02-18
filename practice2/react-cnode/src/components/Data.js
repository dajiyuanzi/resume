import axios from 'axios'

export default function GetData(url, Para, callback){
  axios.get(url, {
    params: Para
  })
  .then(function(res){
    callback(res)
  })
  .catch(function (error) {
    console.log(error);
  });
}