const ehy = [
  {
    path: '/ehyWater',
    name: 'ehyWater',
    component: () => import('@/views/EHY/water/index'),
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
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/EHY/register'),
    meta: { title: '注册' }
  },
  {
    path: '/competencyCertificate',
    name: 'competencyCertificate',
    component: () => import('@/views/EHY/competencyCertificate'),
    meta: { title: '船员适任证' }
  },
  {
    path: '/cerDetails',
    name: 'cerDetails',
    component: () => import('@/views/EHY/competencyCertificate/cerDetails'),
    meta: { title: '认证详情' }
  },
  {
    path: '/lockReport',
    name: 'lockReport',
    component: () => import('@/views/lockReport'),
    meta: { title: '自查申报记录' }
  },
  {
    path: '/lockReportOne',
    name: 'lockReportOne',
    component: () => import('@/views/lockReport/reportOne'),
    meta: { title: '自查申报' }
  },
  {
    path: '/lockReportTwo',
    name: 'lockReportTwo',
    component: () => import('@/views/lockReport/reportTwo'),
    meta: { title: '自查申报' }
  },
  {
    path: '/lockReportDetail',
    name: 'lockReportDetail',
    component: () => import('@/views/lockReport/detail'),
    meta: { title: '申报详情' }
  },
  {
    path: '/lockApply',
    name: 'lockApply',
    component: () => import('@/views/lockApply'),
    meta: { title: '过闸申报历史' }
  },
  {
    path: '/lockAddReport',
    name: 'lockAddReport',
    component: () => import('@/views/lockApply/addReport'),
    meta: { title: '船舶过闸申报' }
  },
  {
    path: '/lockReportInfo',
    name: 'lockReportInfo',
    component: () => import('@/views/lockApply/reportInfo'),
    meta: { title: '申报详情' }
  },
  {
    path: '/lockReportHistory',
    name: 'lockReportHistory',
    component: () => import('@/views/lockApply/reportHistory'),
    meta: { title: '申报历史列表' }
  }
]
export default ehy
