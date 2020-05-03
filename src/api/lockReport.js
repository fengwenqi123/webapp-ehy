import request from '@/utils/request'
import requestNo from '@/utils/requestNo'
export function commonPorts() {
  return request({
    url: '/activity/portForApplication/commonPorts',
    method: 'GET'
  })
}

export function reportList(pageNum, pageSize, order, sort, shipName) {
  return requestNo({
    url: '/safety/navigationSelfCheck',
    method: 'GET',
    params: {
      pageNum,
      pageSize,
      order,
      sort,
      shipName
    }
  })
}

export function submitReport(form) {
  return request({
    url: '/safety/navigationSelfCheck',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    data: form
  })
}

// export function submitReport(pageNum, pageSize, province, city) {
//   return request({
//     url: '/environment/hydrology',
//     method: 'GET',
//     params: {
//       pageNum,
//       pageSize,
//       province,
//       city
//     }
//   })
// }
