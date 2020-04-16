import request from '@/utils/request1'

// import qs from 'qs'

export function list(name, keyword, order, sort, code, enName, pinyin, status) {
  return request({
    url: '/report/port/list',
    method: 'GET',
    params: {
      name,
      keyword,
      order,
      sort,
      code,
      enName,
      pinyin,
      status
    }
  })
}
