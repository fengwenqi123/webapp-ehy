import request from '@/utils/request'

import qs from 'qs'
// 收集点列表
export function recoveryInfo(shipName, code) {
  alert(shipName)
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
// 排污收集点列表
export function sewagePoint(pageNum, pageSize, city, area, fomesType, currentLon, currentLat) {
  return request({
    url: '/sewage/sewageSite/',
    method: 'GET',
    params: {
      pageNum, pageSize, city, area, fomesType, currentLon, currentLat
    }
  })
}

// 排污记录
export function sewageReport(pageNum, pageSize, time, type) {
  return request({
    url: '/sewage/sewageInfo/getRecord',
    method: 'GET',
    params: {
      pageNum, pageSize, time, type
    }
  })
}

//
export function points() {
  return request({
    url: '/poi/sewage/selectSum',
    method: 'GET'
  })
}

