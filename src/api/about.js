import request from '@/utils/request'

// import qs from 'qs'

export function list(form) {
  return request({
    url: '/info/article/list',
    method: 'GET',
    params: form
  })
}
