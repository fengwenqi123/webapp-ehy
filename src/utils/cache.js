import storage from 'good-storage'
/* eslint-disable no-undef */
const Token = 'Token'
const userInfo = 'userInfo'
const boatName = 'boatName'
const outletList = 'outletList'
const isProd = process.env.NODE_ENV === 'production'
// 页面退出
export function getFinishWeb() {
  return isProd ? Android.finishWeb() : null
}

// 获取码头
export function getWharfId() {
  return isProd ? Android.getWharfId() : null
}

// 获取城市
export function getCity() {
  return isProd ? Android.getCity() : null
}

// 获取新闻详情id
export function getId() {
  return isProd ? Android.getId() : null
}

// 调用支付
export function getAliPay(id) {
  return isProd ? Android.aliPay(id) : null
}

// 调用扫码
export function getGoQr() {
  return isProd ? Android.goQr() : null
}

// 扫码返回id
export function getGoQrId() {
  return isProd ? Android.getQrId() : null
}

// 获取code
export function getCode() {
  return isProd ? Android.getCode() : null
}

// 设置标题
export function setTitle(title) {
  return isProd ? Android.setTitle(title) : null
}

// 获取手机当前的经纬度
export function getLng() {
  /* eslint-disable*/
  return isProd ? Android.getLng() : null
}

export function getLat() {
  return isProd ? Android.getLat() : null
}
//  获取订单id
export function getOrderId() {
  return isProd ? Android.getOrderId() : null
}
// 获取token
export function getToken() {
  return isProd ? Android.getAccount() : 'QKPE9Gaw2HQDKBt2aLBfUv'
}

// 获取船名
export function getShipName() {
  return isProd ? Android.getName() : null
}
// 获取船舶登记号
export function getCbdjh() {
  return isProd ? Android.getCbdjh() : null
}
// 获取船舶识别号
export function getCbsbh() {
  return isProd ? Android.getCbsbh() : null
}
// 是否从违章进去
export function isWz() {
  return isProd ? Android.isWz() : null
}
// 是否支付
export function pay(orderId, je) {
  return isProd ? Android.pay(orderId, je) : null
}

export function getDefaultShip() {
  return isProd ? Android.getDefaultShip() : null
}

export function setToken(token) {
  return storage.set(Token, token)
}

export function getUser() {
  return storage.get(userInfo, [])
}

export function setUser(user) {
  return storage.set(userInfo, user)
}

export function setBoat(boat) {
  return storage.set(boatName, boat)
}

export function getBoat() {
  return storage.get(boatName, [])
}

export function setOutlet(outlet) {
  return storage.set(outletList, outlet)
}

export function getOutlet() {
  return storage.get(outletList, [])
}
