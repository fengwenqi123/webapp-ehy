import request from '@/utils/requestNo'
// 排污收集点列表
export function sewagePoint(pageNum, pageSize, city, area, fomesType, currentLon, currentLat, classify) {
  return request({
    url: '/sewage/sewageSite/',
    method: 'GET',
    params: {
      pageNum, pageSize, city, area, fomesType, currentLon, currentLat, classify
    }
  })
}

// 生活污水排污记录
export function sewageReport(pageNum, pageSize, time, type, shipName, auditStatus, siteId) {
  return request({
    url: '/sewage/sewageInfo/getRecord',
    method: 'GET',
    params: {
      pageNum, pageSize, time, type, shipName, auditStatus, siteId
    }
  })
}

export function sewageReportPort(pageNum, pageSize, time, type, shipName, auditStatus, siteId) {
  return request({
    url: '/sewage/sewageInfo/',
    method: 'GET',
    params: {
      pageNum, pageSize, time, type, shipName, auditStatus, siteId
    }
  })
}
