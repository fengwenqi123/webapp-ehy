/* eslint-disable object-curly-spacing */
import axios from 'axios'
import { getToken } from '@/utils/cache'
import { Toast } from 'vant'

// 创建axios实例
const service = axios.create({
  // baseURL: 'http://47.97.203.213/api', // 版本列表
  baseURL: 'https://api.cjbe88.com', // 版本列表
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers['accessToken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return response.data
    } else if (res.code === 500) {
      Toast.fail('请求错误')
      return Promise.reject('error')
    } else if (res.code === 503) {
      Toast.fail('未登录')
      return Promise.reject('error')
    } else if (res.code === 401) {
      Toast.fail('未授权')
      return Promise.reject('error')
    } else if (res.code === 403) {
      Toast.fail('非法请求')
      return Promise.reject('error')
    } else {
      Toast.fail(res.msg)
      return Promise.reject('error')
    }
  },
  error => {
    Toast.fail('请求超时')
    return Promise.reject(error)
  }
)

export default service
