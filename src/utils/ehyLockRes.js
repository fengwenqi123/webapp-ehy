import axios from 'axios'
import { getToken } from '@/utils/cache'
import { Toast, Dialog } from 'vant'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://202.107.242.115:10095', // 请求地址
  // baseURL: 'http://cjb.huihangtech.com/api/', // 请求地址
  timeout: 10000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    Toast.loading({
      mask: true,
      message: '加载中...',
      duration: 0
    })
    if (getToken()) {
      config.headers['accessToken'] = getToken() // 让每个请求携带自定义token
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    Toast.clear()
    const res = response.data
    switch (res.resultCode.code) {
      case 1:
        return response.data
      default:
        Dialog.alert({
          title: '提示',
          message: res.resultCode.message
          // message: res.msg
        }).then(() => {
          Dialog.close()
        })
        return Promise.reject('error')
    }
  },
  // 错误反馈
  error => {
    Toast.clear()
    Dialog.alert({
      title: '提示',
      message: '请求超时'
      // message: error
    }).then(() => {
      Dialog.close()
    })
    return Promise.reject(error)
  }
)

export default service
