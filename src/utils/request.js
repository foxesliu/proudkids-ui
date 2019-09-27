import axios from 'axios'
import {Message} from 'element-ui'
import store from '../store'
import {getToken} from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 150000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (store.getters.token) {
    config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 1) {
      message(res.msg, 'error')
      return Promise.reject(res)
    }
    return response
  },
  error => {
    const res = error.response
    console.log(res.status)
    if (res.status === 478 || res.status === 403) {
      message(res.data.msg)
    } else if (res.status === 400) {
      message(res.data.error_description)
    } else if (res.status === 202) { //三方未绑定
      this.$router.push({path: '/'})
    } else if (res.status === 500 || res.status === 503) {
      message('服务器异常！请联系管理员！', 'error')
    } else if(res.code==1){
      message(res.data.msg,'error')
    }else{
      message(res.data.msg)
    }
    return Promise.reject(error)
  }
)


export function message(text, type) {
  Message({
    message: text,
    type: type,
    duration: 1 * 3000
  })
}


export default service
