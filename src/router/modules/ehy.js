const ehy = [{
  path: '/ehyWater',
  name: 'ehyWater',
  component: () =>
    import('@/views/EHY/water/index'),
  meta: {
    title: 'E航运水位'
  }
},
{
  path: '/boatList',
  name: 'boatList',
  component: () => import('@/views/EHY/boatInfo/boatList'),
  meta: { title: '船舶列表' }
},
{
  path: '/addShip',
  name: 'addShip',
  component: () => import('@/views/EHY/boatInfo/addShip'),
  meta: { title: '新增船舶' }
},
{
  path: '/boatInfo',
  name: 'boatInfo',
  component: () => import('@/views/EHY/boatInfo'),
  meta: { title: '船舶详情' }
},
{
  path: '/breakRulesInfo',
  name: 'breakRulesInfo',
  component: () => import('@/views/EHY/boatInfo/breakRulesInfo'),
  meta: { title: '违章详情' }
}]
export default ehy
