const sewageDisposal = [
  {
    path: '/sewageDisposal',
    name: 'sewageDisposal',
    component: () => import('@/views/sewageDisposal/home'),
    meta: { title: '污染物上岸' }
  },
  {
    path: '/unableToLand',
    name: 'unableToLand',
    component: () => import('@/views/sewageDisposal/unableToLand'),
    meta: { title: '无法上岸问题上报' }
  },
  {
    path: '/shipIntegral',
    name: 'shipIntegral',
    component: () => import('@/views/sewageDisposal/shipIntegral'),
    meta: { title: '综合积分' }
  },
  {
    path: '/sewageIntegral',
    name: 'sewageIntegral',
    component: () => import('@/views/sewageDisposal/sewageIntegral'),
    meta: { title: '排污积分' }
  },
  {
    path: '/sewagePointSearch',
    name: 'sewagePointSearch',
    component: () => import('@/views/sewageDisposal/sewagePointSearch'),
    meta: { title: '排污点查询' }
  },
  {
    path: '/lifeWaterRecord',
    name: 'lifeWaterRecord',
    component: () => import('@/views/sewageDisposal/lifeWaterRecord'),
    meta: { title: '生活污水排放' }
  },
  {
    path: '/lifeWaterRecordInfo',
    name: 'lifeWaterRecordInfo',
    component: () => import('@/views/sewageDisposal/landRecord/info'),
    meta: { title: '生活污水排放记录' }
  },
  {
    path: '/lifeSewageOutLet',
    name: 'lifeSewageOutLet',
    component: () => import('@/views/sewageDisposal/lifeWaterRecord/outLetList'),
    meta: { title: '生活污水排污口' }
  },
  {
    path: '/lifeSewage',
    name: 'lifeSewage',
    component: () => import('@/views/sewageDisposal/lifeSewage'),
    meta: { title: '生活污水回收' }
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('@/views/sewageDisposal/lifeSewage/success'),
    meta: { title: '回收成功' }
  },
  {
    path: '/successWaterAuto',
    name: 'successWaterAuto',
    component: () => import('@/views/sewageDisposal/lifeSewage/successWaterAuto'),
    meta: { title: '污水回收成功' }
  },

  {
    path: '/rubbishSewage',
    name: 'rubbishSewage',
    component: () => import('@/views/sewageDisposal/rubbishSewage'),
    meta: { title: '生活垃圾投放' }
  },
  {
    path: '/oilSewage',
    name: 'oilSewage',
    component: () => import('@/views/sewageDisposal/oilSewage'),
    meta: { title: '油污水回收' }
  },
  {
    path: '/fail',
    name: 'fail',
    component: () => import('@/views/sewageDisposal/result/fail'),
    meta: { title: '申请失败' }
  },
  {
    path: '/unrecognized',
    name: 'unrecognized',
    component: () => import('@/views/sewageDisposal/result/unrecognized'),
    meta: { title: '无法识别' }
  },
  {
    path: '/landRecord',
    name: 'landRecord',
    component: () => import('@/views/sewageDisposal/landRecord'),
    meta: { title: '上岸记录' }
  }
]
export default sewageDisposal
