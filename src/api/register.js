import request from '@/utils/request'
import qs from 'qs'
// 收集点列表
export function getSms(type, loginName) {
  return request({
    url: 'member/user/sendSmsCode',
    method: 'GET',
    params: {
      type, loginName
    }
  })
}
export function getRegister(form) {
  const data = qs.stringify(form)
  return request({
    url: '/member/user/eRegister',
    method: 'POST',
    data
  })
}
