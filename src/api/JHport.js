import request from '@/utils/request'
import JHrequest from '@/utils/JHrequest'
// import qs from 'qs'

// 开始排队
export function putGuoZhaPaiDuiStart(id) {
  return JHrequest({
    url: '/api/cjb/putGuoZhaPaiDuiStart',
    method: 'POST',
    params: {
      id
    }
  })
}
// 取消排队
export function putGuoZhaPaiDuiCancel(id) {
  return JHrequest({
    url: '/api/cjb/putGuoZhaPaiDuiCancel',
    method: 'POST',
    params: {
      id
    }
  })
}
// 判读是否有排闸信息
export function getPaiZhaChuanZhaByShipName(shipname) {
  return JHrequest({
    url: '/api/cjb/getPaiZhaChuanZhaByShipName',
    method: 'POST',
    params: {
      shipname
    }
  })
}

// 申报提交
export function postBaoGang(form) {
  const obj = JSON.stringify(form)
  const data = encodeURIComponent(obj)
  console.log(data)
  return JHrequest({
    url: '/api/cjb/postBaoGang',
    method: 'POST',
    data
  })
}

// 基本信息
export function getBasicInfo(shipname) {
  return JHrequest({
    url: '/api/cjb/getBasicInfo',
    method: 'POST',
    params: {
      shipname
    }
  })
}

// 根据船名查询船舶基本信息
export function getShipInfo(shipname) {
  return JHrequest({
    url: '/api/cjb/getShipInfo',
    method: 'POST',
    params: {
      shipname
    }
  })
}

//  根据船名获取是否有未结束报港
export function getBaoGangIdOfUnfinished(shipname) {
  return JHrequest({
    url: '/api/cjb/getBaoGangIdOfUnfinished',
    method: 'POST',
    params: {
      shipname
    }
  })
}
//  缴费过闸情况
export function getGuoZhaInfoByBaoGangId(id) {
  return JHrequest({
    url: '/api/cjb/getGuoZhaInfoByBaoGangId',
    method: 'POST',
    params: {
      id
    }
  })
}

//  取消申报
export function putBaoGangOfCancel(id) {
  return JHrequest({
    url: '/api/cjb/putBaoGangOfCancel',
    method: 'POST',
    params: {
      id
    }
  })
}

//  船闸列表
export function getChuanZhaByBaoGangId(id) {
  return JHrequest({
    url: '/api/cjb/getChuanZhaByBaoGangId',
    method: 'POST',
    params: {
      id
    }
  })
}
//  排闸图
export function getPaiZhaList(lockId, direction) {
  return JHrequest({
    url: '/api/cjb/getPaiZhaList',
    method: 'POST',
    params: {
      lockId,
      direction
    }
  })
}

//  过闸历史
export function getBangGangHistoryByShipName(userID, shipName, page, length, sfwxp) {
  return JHrequest({
    url: '/api/cjb/getBangGangHistoryByShipName',
    method: 'POST',
    params: {
      userID,
      shipName,
      page,
      length,
      sfwxp
    }
  })
}

//  获取accessToken
export function getAccessToken(appId, secret, code, grantType) {
  return request({
    url: '/member/oauth/accessToken',
    method: 'GET',
    params: {
      appId,
      secret,
      code,
      grantType
    }
  })
}

//  刷新accessToken
export function refreshToken(appId, refreshToken, grantType) {
  return request({
    url: '/member/oauth/refreshToken',
    method: 'GET',
    params: {
      appId,
      refreshToken,
      grantType
    }
  })
}
//  获取用户个人信息
export function getUserInfo(accessToken, openId) {
  return request({
    url: '/member/oauth/userInfo',
    method: 'GET',
    params: {
      accessToken,
      openId
    }
  })
}
