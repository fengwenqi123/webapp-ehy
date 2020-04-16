import request from '@/utils/ehyLockRes'

// import qs from 'qs'

export function reportList(page, rows, state, shipName, startTime, endTime) {
  return request({
    url: '/controller/receiveQuery/queryApplyList',
    method: 'GET',
    params: {
      page,
      rows,
      state,
      shipName,
      startTime,
      endTime
    }
  })
}

export function submitApply(form) {
  return request({
    url: '/lockChamber/receive',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: form
  })
}

export function lockApplyKnow(title) {
  return request({
    url: '/controller/receiveQuery/queryNOOG',
    method: 'GET',
    params: { title }
  })
}

