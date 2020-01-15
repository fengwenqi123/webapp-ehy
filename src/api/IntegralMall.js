import request from '@/utils/request'
import request1 from '@/utils/requestNo'

import qs from 'qs'

export function findIntegralByShipName(shipName) {
  return request({
    url: '/poi/shipPoint/findByShipName',
    method: 'GET',
    params: { shipName }
  })
}

export function orderList(pageNum, pageSize, status, starTime, endTime, order, keyword, time) {
  return request1({
    url: '/order/item/selectByuserId',
    method: 'GET',
    params: {
      pageNum, pageSize, status, starTime, endTime, order, keyword, time
    }
  })
}

export function addOrder(id, orderWay, type, address, number) {
  const data = qs.stringify({ id, orderWay, type, address, number })
  return request({
    url: '/order/orderInfo/order',
    method: 'POST',
    data
  })
}

export function confirmexchange(id, userShipName, integral, number) {
  const data = qs.stringify({ id, userShipName, integral, number })
  return request({
    url: '/order/item/confirmexchange',
    method: 'POST',
    data
  })
}

export function findOrderDetail(id) {
  return request({
    url: '/order/item/findByIdInfo',
    method: 'GET',
    params: { id }
  })
}
export function cancelexchange(orderId, userShipName, integral) {
  const data = qs.stringify({ orderId, userShipName, integral })
  return request({
    url: '/order/item/cancelexchange',
    method: 'POST',
    data
  })
}
export function IntegralTotal(starTime, endTime) {
  return request({
    url: '/order/item/total',
    method: 'GET',
    params: { starTime, endTime }
  })
}
