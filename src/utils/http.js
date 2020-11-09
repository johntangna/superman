import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from 'utils/authority'
/* 创建axios实例 */
const service = axios.create({
  baseURL : process.env.VUE_APP_BASE_URL,
  timeout : 5000 //请求的超时时间
})

service.interceptors.request.use(
  config =>{
    if(store.getters.token){
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error =>{
    console.error(error)
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    /* 导出 追加文件流返回类型判断*/
    const headers = response.headers
    //console.log(headers['content-type'])  将打印的值，也将后台返回的相应头设置成相同的，我的就是'application/octet-stream;charset=UTF-8',然后返回response
    if (headers['content-type'] == 'application/octet-stream;charset=UTF-8') return response;
    const res = response.data
    //20000返回状态码为正确状态返回码
    if(res.code !== 20000){
      Message({
        type : 'error',
        message : res.message,
        duration : 5 * 1000
      })
      //50008为非法token，50012为其他人登录，50014过期token
      if(res.code === 50008 || res.code === 50012 || res.code === 50014){
      }
      return Promise.reject('error')
    } else {
      return res
    }
  },
  error =>{
    console.error('error')
    Message({
      type : 'error',
      message : error.message,
      duration : 5 * 1000
    })
    return Promise.reject('error')
  }
)

export default service
