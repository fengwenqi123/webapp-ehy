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

// 违章
export function breakRules(pageNum, pageSize, shipName) {
  return request({
    url: 'collaboration/violation ',
    method: 'GET',
    params: {
      pageNum, pageSize, shipName
    }
  })
}

