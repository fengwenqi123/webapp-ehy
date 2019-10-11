import request from '@/utils/request1'
import requestNoalert from '@/utils/request-noalert'

import qs from 'qs'

export function list(form) {
  return requestNoalert({
    url: '/report/report',
    method: 'GET',
    params: form
  })
}

export function cancelbg(id) {
  const data = qs.stringify({
    id
  })
  return request({
    url: '/report/report/disuse',
    method: 'PUT',
    data
  })
}
