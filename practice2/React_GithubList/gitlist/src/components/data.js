import axios from 'axios'

export default function getData(pageNum, callback){
  var url='https://api.github.com/search/repositories?q=language:javascript&sort=stars&order=desc'
  axios.get(url, {params:{
    page:pageNum
  }})
    .then(function (res){
      //console.log(res)
      callback(res)
    })
    .catch(function (error) {
       console.log(error);
    });
}
