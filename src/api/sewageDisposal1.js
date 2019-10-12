import request from '@/utils/requestNo'

// 排污点列表
export function pwList(pageNum, pageSize, time, type) {
  return request({
    url: '/poi/sewage',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      time,
      type
    }
  })
}
