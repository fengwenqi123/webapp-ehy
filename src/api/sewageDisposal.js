import request from '@/utils/request'

import qs from 'qs'
// 收集点列表
export function recoveryInfo(shipName, code, currentLon, currentLat) {
  // alert(shipName)
  return request({
    url: '/sewage/sewageOutlet/findByCode',
    method: 'GET',
    params: {
      shipName, code, currentLon, currentLat
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
export function recoveryPointList(keyword) {
  return request({
    url: '/sewage/sewageSite/list',
    method: 'GET',
    params: {
      keyword
    }
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
export function allPoints(city, shipName) {
  return request({
    url: '/poi/shipPoint/sumByTokens',
    method: 'GET',
    params: {
      city, shipName
    }
  })
}

// 船舶在排污点定位信息
export function boatPosition(siteId, shipName) {
  return request({
    url: '/poi/sewage/getShipPositionInfo',
    method: 'GET',
    params: {
      siteId,
      shipName
    }
  })
}

// 上岸记录审核
export function portCheckStatus(id, auditStatus) {
  const data = qs.stringify({ id, auditStatus })
  return request({
    url: '/sewage/sewageInfo/updateAuditStatus',
    method: 'POST',
    data
  })
}

export function getSewagePoint(type, mold) {
  return request({
    url: '/poi/deductionRule/list',
    method: 'GET',
    params: {
      type,
      mold
    }
  })
}

// 排污一次获得的积分
export function getPointRecord(sewageId) {
  return request({
    url: '/poi/sewage/sewageScoreRecord',
    method: 'GET',
    params: {
      sewageId
    }
  })
}

