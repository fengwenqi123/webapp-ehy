import storage from 'good-storage'

const Token = 'Token'
const userInfo = 'userInfo'
const boatName = 'boatName'

// 页面退出
export function getFinishWeb() {
  return Android.finishWeb()
}

// 获取城市
export function getCity() {
  return Android.getCity()
}

// 获取新闻详情id
export function getId() {
  return Android.getId()
}

// 调用支付
export function getAliPay(id) {
  return Android.aliPay(id)
}

// 调用扫码
export function getGoQr() {
  return Android.goQr()
}

// 扫码返回id
export function getGoQrId() {
  return Android.getQrId()
}

// 获取code
export function getCode() {
  return Android.getCode()
}

// 设置标题
export function setTitle(title) {
  return Android.setTitle(title)
}

// 获取手机当前的经纬度
export function getLng() {
  return Android.getLng()
}

export function getLat() {
  return Android.getLat()
}
//  获取订单id
export function getOrderId() {
  return Android.getOrderId()
}
// 获取token
export function getToken() {
  return Android.getAccount()
  // return 'Nwqt1YzwLUnLfsRziSA6F'
}

// 获取船名
export function getShipName() {
  return Android.getName()
}
// 获取船舶登记号
export function getCbdjh() {
  return Android.getCbdjh()
}
// 获取船舶识别号
export function getCbsbh() {
  return Android.getCbsbh()
}
// 是否从违章进去
export function isWz() {
  return Android.isWz()
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
