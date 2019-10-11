import request from '@/utils/request'

import qs from 'qs'

export function insuranceList(pageNum, pageSize, order, sort, keyword) {
  return request({
    url: 'insandref/insinsurance',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      keyword
    }
  })
}

export function addInsurance(form) {
  const data = qs.stringify(form)
  return request({
    url: 'insandref/insinsurance/save ',
    method: 'POST',
    data
  })
}
