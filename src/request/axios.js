import  axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = 'http://localhost:8080/'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
export  default  {
  //get请求
  get (url,param) {
    return new Promise((resolve,reject) => {
      axios.get(url, {
          params: param
        }
      ).then(res => {
        resolve(res.data)
      })
    })
  },

  //post请求
  post (url,param) {
    return new Promise((resolve,reject) => {
      axios.post(url,qs.stringify(param)
      ).then(res => {
        resolve(res.data)
      })
    })
  },
  //文件post请求
  postFile (url,param) {
    return new Promise((resolve,reject) => {
      let config ={headers:{
        'Content-Type': 'multipart/form-data;boundary = '+new Date().getTime()
      }};
      axios.post(url,param,config
      ).then(res => {
        resolve(res.data)
      })
    })
  },

}



