import request from '@/utils/request1'

// import qs from 'qs'

export function list(order, sort, code, name, enName, pinyin, status, keyword) {
  return request({
    url: '/report/port/list',
    method: 'GET',
    params: {
      order,
      sort,
      code,
      name,
      enName,
      pinyin,
      status,
      keyword
    }
  })
}
