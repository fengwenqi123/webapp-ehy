import fly from '@/utils/request'

// 获取天气
export function findByName(name) {
  return fly.request(
    '/gis/weather/findByName',
    {
      name
    },
    {
      method: 'get'
    }
  )
}
