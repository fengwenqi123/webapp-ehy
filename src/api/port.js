import request from '@/utils/request'
import request1 from '@/utils/request1'

import qs from 'qs'
// 申报提交
export function postBaoGang(form) {
  const obj = qs.stringify(form)
  const data = encodeURIComponent(obj)
  console.log(data)
  return request1({
    url: '/api/cjb/postBaoGang',
    method: 'POST',
    data
  })
}

// 基本信息
export function getBasicInfo(shipname) {
  return request1({
    url: '/api/cjb/getBasicInfo',
    method: 'POST',
    params: {
      shipname
    }
  })
}

// 根据船名查询船舶基本信息
export function getShipInfo(shipname) {
  return request1({
    url: '/api/cjb/getShipInfo',
    method: 'POST',
    params: {
      shipname
    }
  })
}
//  取消申报
export function putBaoGangOfCancel(id) {
  return request1({
    url: '/api/cjb/putBaoGangOfCancel',
    method: 'POST',
    params: {
      id
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
