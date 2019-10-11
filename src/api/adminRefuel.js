import request from '@/utils/request'

import qs from 'qs'

export function refuelList(pageNum, pageSize, order, sort, keyword, status) {
  return request({
    url: 'order/itemRecord/selectByuserIdApp',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      keyword,
      status
    }
  })
}

export function addRefuel(id, capacity, price, payWay) {
  const data = qs.stringify({ id, capacity, price, payWay })
  return request({
    url: 'order/itemRecord/updateTotals',
    method: 'POST',
    data
  })
}
// 加油人员新增
export function addPersonRefuel(shipName, telephone, contacts, capacity, price, refuelingPoint) {
  const data = qs.stringify({ shipName, telephone, contacts, capacity, price, refuelingPoint })
  return request({
    url: 'order/itemRecord/insertFromPersonnel',
    method: 'POST',
    data
  })
}

export function oilMoney(status, name, capacity, money) {
  const data = qs.stringify({
    status,
    name,
    capacity,
    money
  })
  return request({
    url: 'insandref/oilTanker/calculate',
    method: 'POST',
    data
  })
}

// 退款
export function payBack(id, description) {
  const data = qs.stringify({
    id,
    description
  })
  return request({
    url: 'order/itemRecord/refund',
    method: 'POST',
    data
  })
}
