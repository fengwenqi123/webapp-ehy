import request from '@/utils/request'

// import qs from 'qs'
export function getAccessToken(form) {
  return request({
    url: '/member/oauth/accessToken',
    method: 'GET',
    params: form
  })
}

export function getUserInfo(accessToken, openId) {
  console.log(openId)
  return request({
    url: '/member/oauth/userInfo',
    method: 'GET',
    params: {
      accessToken,
      openId
    }
  })
}

export function getUser(tags) {
  return request({
    url: '/member/memShip/selectByToken',
    params: {
      tags
    }
  })
}

export function getUserInfos() {
  return request({
    url: '/member/user/my',
    params: {}
  })
}
