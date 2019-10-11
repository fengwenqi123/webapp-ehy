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
  path: '/boatInfo',
  name: 'boatInfo',
  component: () => import('@/views/EHY/boatInfo'),
  meta: { title: '船舶详情' }
}]
export default ehy
