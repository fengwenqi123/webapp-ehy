import request from '@/utils/requestNo'

// import qs from 'qs'

export function list(pageNum, pageSize, order, sort, keyword, categoryName, brandName) {
  return request({
    url: '/mall/goodsInfo/appGoodsList',
    method: 'GET',
    params: { pageNum, pageSize, order, sort, keyword, categoryName, brandName }
  })
}

export function GoodsDetail(goodsId) {
  return request({
    url: '/mall/goodsInfo/findGoodsDetailById',
    method: 'GET',
    params: { goodsId }
  })
}

export function place(categoryId) {
  return request({
    url: '/mall/place/findPlaceByCategory',
    method: 'GET',
    params: { categoryId }
  })
}
