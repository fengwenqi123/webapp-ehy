import request from '@/utils/request'

// import qs from 'qs'
export function search(xm, sfzhm) {
  return request({
    url: '/collaboration/crew/findByname',
    method: 'GET',
    params: {
      xm, sfzhm
    }
  })
}
