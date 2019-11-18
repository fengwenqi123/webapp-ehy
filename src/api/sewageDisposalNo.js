import request from '@/utils/requestNo'
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

// 生活污水排污记录
export function sewageReport(pageNum, pageSize, time, type, shipName, auditStatus) {
  return request({
    url: '/sewage/sewageInfo/getRecord',
    method: 'GET',
    params: {
      pageNum, pageSize, time, type, shipName, auditStatus
    }
  })
}
