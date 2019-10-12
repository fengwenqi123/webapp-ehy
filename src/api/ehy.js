import request from '@/utils/request'

// import qs from 'qs'
// 水位
export function waterList() {
  return request({
    url: '/environment/hydrology/?province=浙江&city=湖州',
    method: 'GET'
  })
}

// 船舶列表
export function boatList(tags) {
  return request({
    url: 'member/memShip/selectByToken',
    method: 'GET',
    params: {
      tags
    }
  })
}

// 船舶基本信息
export function shipInfo(cbsbh) {
  return request({
    url: '/collaboration/shipExtend/findByCbsbh?cbsbh=' + cbsbh,
    method: 'GET'
  })
}

// 证书
export function certificate(cbdjh) {
  return request({
    url: '/collaboration/certificateAllExtend/list?cbdjh=' + cbdjh,
    method: 'GET'
  })
}
