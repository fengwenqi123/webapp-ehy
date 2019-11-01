import request from '@/utils/request'

import qs from 'qs'
// 收集点列表
export function recoveryInfo(shipName, code) {
  // alert(shipName)
  return request({
    url: '/sewage/sewageOutlet/findByCode',
    method: 'GET',
    params: {
      shipName, code
    }
  })
}

export function discharge(form) {
  const data = qs.stringify(form)
  return request({
    url: '/sewage/sewageInfo/insertInfo',
    method: 'POST',
    data
  })
}
export function recoveryPointList() {
  return request({
    url: '/sewage/sewageSite/list',
    method: 'GET'
  })
}

export function outLetList(siteName) {
  return request({
    url: '/sewage/sewageOutlet/list',
    method: 'GET',
    params: {
      siteName
    }
  })
}
export function questionReport(form) {
  const data = qs.stringify(form)
  return request({
    url: '/sewage/recordLog/update',
    method: 'POST',
    data
  })
}

// 累计积分
export function points(time, shipName) {
  return request({
    url: '/poi/sewage/selectSum',
    method: 'GET',
    params: {
      time, shipName
    }
  })
}

// 总积分
export function allPoints() {
  return request({
    url: '/poi/shipPoint/sumByToken',
    method: 'GET'
  })
}

