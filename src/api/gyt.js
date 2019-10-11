import request from '@/utils/request1'
// import requestNotify from '@/utils/request-notify'

import qs from 'qs'

export function detailByShipName(shipName) {
  return request({
    url: '/police/userzf/detailByShipName',
    method: 'GET',
    params: {
      shipName
    }
  })
}

export function report(form) {
  const data = qs.stringify(form)
  return request({
    url: '/report/report',
    method: 'POST',
    data
  })
}

export function myLock(shipname) {
  return request({
    url: '/police/gate/queue',
    method: 'GET',
    params: {
      shipname
    }
  })
}

export function allLock(shipname) {
  return request({
    url: '/police/gate/wait',
    method: 'GET',
    params: {
      shipname
    }
  })
}

export function getAccessToken(form) {
  return request({
    url: '/police/gate/wait',
    method: 'GET',
    params: form
  })
}
