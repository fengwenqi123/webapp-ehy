/* eslint-disable object-curly-spacing */
import axios from 'axios'
import {
  getToken
} from '@/utils/cache'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://115.239.194.18:8081', // 金华
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers['accessToken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(

  response => {
    const res = response.data
    if (res.status !== 200) {
      if (res.status === 500 || res.code === 500) {
        return Promise.reject(res)
      } else {
        return Promise.reject('error')
      }
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default service
