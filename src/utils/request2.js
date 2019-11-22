import axios from 'axios'
import { Toast, Dialog } from 'vant'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://intra.huihangtech.com:11111', // 请求地址
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
    switch (res.code) {
      case 200:
        return response.data
      case 500:
        Dialog.alert({
          title: '提示',
          message: res.msg
        }).then(() => {
          Dialog.close()
        })
        return Promise.reject('error')
      case 502:
        return Promise.reject('error')
      case 503:
        Dialog.alert({
          title: '提示',
          message: '未登录，请重新登录!'
          // message: res.msg
        }).then(() => {
          Dialog.close()
        })
        return Promise.reject('error')
      case 401:
        Dialog.alert({
          title: '提示',
          message: '未授权'
          // message: res.msg
        }).then(() => {
          Dialog.close()
        })
        return Promise.reject('error')
      case 403:
        Dialog.alert({
          title: '提示',
          message: '非法请求'
          // message: res.msg
        }).then(() => {
          Dialog.close()
        })
        return Promise.reject('error')
      default:
        Dialog.alert({
          title: '提示',
          message: '未知错误'
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
