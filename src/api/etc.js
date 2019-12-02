import request from '@/utils/request2'
// import qs from 'qs'
export function lists(type) {
  return request({
    url: '/rfid/etc/report/list',
    method: 'GET',
    params: {
      type
    }
  })
}
export function shipLockList() {
  return request({
    url: '/rfid/etc/base/lock',
    method: 'GET'
  })
}
export function channel() {
  return request({
    url: '/rfid/etc/base/channel',
    method: 'GET'
  })
}
export function goodsLists() {
  return request({
    url: '/rfid/etc/base/goods',
    method: 'GET'
  })
}
export function postBaoGang(form) {
  return request({
    url: '/rfid/etc/report',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'post',
    data: form
  })
}
