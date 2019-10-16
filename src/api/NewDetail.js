import request from '@/utils/request'

// import qs from 'qs'

// 新闻列表
export function selectByUserId() {
  return request({
    url: '/news/news',
    method: 'GET'
  })
}
