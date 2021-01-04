import fly from '@/utils/request'
import qs from 'qs'

// 水位信息
export function hydrology(province, city, pageNum, pageSize) {
  return fly.request(
    '/environment/hydrology',
    {
      province,
      city,
      pageNum,
      pageSize
    },
    {
      method: 'get'
    }
  )
}

// 水位信息
export function findByCity(province, city) {
  return fly.request(
    '/environment/hydrology/findByCity',
    {
      province,
      city
    },
    {
      method: 'GET'
    }
  )
}

// 船舶列表
export function selectByToken(tags) {
  return fly.request(
    '/member/memShip/selectByToken',
    {
      tags
    },
    {
      method: 'GET'
    }
  )
}

// 船舶信息
export function shipInfo(cbsbh) {
  return fly.request(
    '/collaboration/shipExtend/findByCbsbh',
    {
      cbsbh
    },
    {
      method: 'GET'
    }
  )
}
// 船舶信息
export function certificate(cbdjh) {
  return fly.request(
    '/collaboration/certificateAllExtend/list',
    {
      cbdjh
    },
    {
      method: 'GET'
    }
  )
}

// 感知
export function latestPosByShipName(dataType, shipName) {
  return fly.request(
    '/gps/position/latestPosByShipName',
    {
      dataType,
      shipName
    },
    {
      method: 'GET'
    }
  )
}

// 违章
export function violation(pageNum, pageSize, shipName) {
  return fly.request(
    '/collaboration/violation',
    {
      pageNum,
      pageSize,
      shipName
    },
    {
      method: 'GET'
    }
  )
}

// 绑定船舶
export function submitAuthen(
  shipName,
  cbdjh,
  cbsbh,
  certificateImg,
  insuranceImg
) {
  const data = qs.stringify({
    shipName,
    cbdjh,
    cbsbh,
    certificateImg,
    insuranceImg
  })
  return fly.request('/member/memShip/submitAuthen', data, {
    method: 'POST'
  })
}

// 解绑船舶
export function removeShip(id) {
  const data = qs.stringify({
    id
  })
  return fly.request('/member/memShip/remove', data, {
    method: 'PUT'
  })
}

// 城市绑定
export function updateAddress(province, city) {
  const data = qs.stringify({
    province: province,
    city: city
  })

  return fly.request('/member/user/updateAddress', data, {
    method: 'POST'
  })
}
