import request from '@/utils/request'

// import qs from 'qs'
// 收集点列表
export function sewageSite(pageNum, pageSize) {
  return request({
    url: '/sewage/sewageSite',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}
// 收集点详情
export function siteDeatils(siteId) {
  return request({
    url: 'sewage/sewageInfo/findBySiteId',
    method: 'GET',
    params: {
      siteId
    }
  })
}

// 排污信息列表
export function sewageInfo(pageNum, pageSize) {
  return request({
    url: 'sewage/sewageInfo/selectBy',
    method: 'GET',
    params: {
      pageNum,
      pageSize
    }
  })
}

// 排污详情
export function sewageDeatils(id) {
  return request({
    url: 'sewage/sewageInfo/findByoutlet',
    method: 'GET',
    params: {
      id
    }
  })
}

// 结束排污
export function closeSewage(outletId, id) {
  return request({
    url: 'sewage/sewageInfo/closeSewage',
    method: 'GET',
    params: {
      outletId,
      id
    }
  })
}
