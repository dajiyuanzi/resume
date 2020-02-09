import axios from 'axios'

export default function getData(url, pageNum, callback){
  axios.get(url, {
    params:{
      page:pageNum
    }
  })
    .then(function (res){
      //console.log(res)
      callback(res)
    })
    .catch(function (error) {
       console.log(error);
    });
}


