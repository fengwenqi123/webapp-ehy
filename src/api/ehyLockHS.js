import request from '@/utils/ehyLockResHS'
import requestNo from '@/utils/ehyLockResHSno'
// import qs from 'qs'

export function submitApply(form) {
  return request({
    url: 'gatecontrol/gateControlDeclaration/declare',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: form
  })
}

export function reportInfo(id) {
  return request({
    url: 'gatecontrol/gateControlDeclaration/' + id,
    method: 'GET'
  })
}

export function reportList(pageNum, pageSize, shipName, status, statMonth) {
  return requestNo({
    url: 'gatecontrol/gateControlDeclaration',
    method: 'GET',
    params: {
      pageNum, pageSize, shipName, status, statMonth
    }
  })
}

