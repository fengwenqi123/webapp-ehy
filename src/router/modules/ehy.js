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
}, {
  path: '/register',
  name: 'register',
  component: () => import('@/views/EHY/register'),
  meta: { title: '注册' }
}, {
  path: '/competencyCertificate',
  name: 'competencyCertificate',
  component: () => import('@/views/EHY/competencyCertificate'),
  meta: { title: '船员查询' }
}, {
  path: '/cerDetails',
  name: 'cerDetails',
  component: () => import('@/views/EHY/competencyCertificate/cerDetails'),
  meta: { title: '认证详情' }
}]
export default ehy
