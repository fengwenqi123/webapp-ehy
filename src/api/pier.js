import request from '@/utils/request1'

// import qs from 'qs'

export function list(form) {
  return request({
    url: '/report/pier/list',
    method: 'GET',
    params: form
  })
}
export function findPierById(id) {
  return request({
    url: '/report/pier/' + id,
    method: 'GET'
  })
}
