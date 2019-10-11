import request from '@/utils/request'

import qs from 'qs'

export function refuelList(pageNum, pageSize, order, sort, keyword) {
  return request({
    url: 'order/itemRecord/selectByuserId',
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

export function refuelInfo(orderId) {
  return request({
    url: 'order/itemRecord/',
    method: 'GET',
    params: {
      orderId
    }
  })
}

export function refuelBoatList() {
  return request({
    url: 'insandref/oilTanker/list',
    method: 'GET',
    params: {}
  })
}

export function addRefuel(form) {
  const data = qs.stringify(form)
  return request({
    url: 'order/itemRecord/insertRecord',
    method: 'POST',
    data
  })
}

export function beforePay(id) {
  return request({
    url: 'order/orderInfo/' + id,
    method: 'GET',
    params: {}
  })
}
