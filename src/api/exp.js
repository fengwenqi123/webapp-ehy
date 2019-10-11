import request from '@/utils/request'

// import qs from 'qs'

export function expList(pageNum, pageSize, accessToken) {
  return request({
    url: '/express/express/listByPhone',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      accessToken
    }
  })
}

export function getUser(accessToken) {
  return request({
    url: '/login/user/online',
    method: 'GET',
    params: {
      accessToken
    }
  })
}

// 快递列表跳转订单详情接口
export function findExpressorderInfo(orderId) {
  return request({
    url: '/order/ExpressorderInfo/findExpressorderInfo',
    method: 'GET',
    params: {
      orderId
    }
  })
}

// 订单列表
export function Orderlist(pageNum, pageSize, type, status) {
  return request({
    url: '/order/ExpressorderInfo/FullOrderlist',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      type,
      status
    }
  })
}

// 根据ID查询订单信息
export function orderInfo(id) {
  return request({
    url: '/order/orderInfo/' + id,
    method: 'GET'
  })
}
