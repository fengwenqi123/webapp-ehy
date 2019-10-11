import request from '@/utils/request'

// import qs from 'qs'

export function getNewsById(id) {
  return request({
    url: '/news/news/' + id,
    method: 'GET'
  })
}
