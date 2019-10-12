import request from '@/utils/request'

import qs from 'qs'
export function search(xm, sfzhm) {
  return request({
    url: '/collaboration/crew/findByname',
    method: 'GET',
    params: {
      xm, sfzhm
    }
  })
}

export function jrzList(page, row, cyxm) {
  const data = qs.stringify({ page, row, cyxm })
  return request({
    url: '/check/dataForward/data/rzcyxx',
    method: 'POST',
    data
  })
}
