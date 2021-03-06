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
    meta: { title: '污水回收成功' }
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
    path: '/successRubbish',
    name: 'success',
    component: () => import('@/views/sewageDisposal/rubbishSewage/success'),
    meta: { title: '生活垃圾回收成功' }
  },
  {
    path: '/successRubbishAuto',
    name: 'successRubbishAuto',
    component: () => import('@/views/sewageDisposal/rubbishSewage/successRubbishAuto'),
    meta: { title: '生活垃圾回收成功' }
  },
  {
    path: '/rubbishRecord',
    name: 'rubbishRecord',
    component: () => import('@/views/sewageDisposal/rubbishRecord'),
    meta: { title: '生活垃圾排放' }
  },
  {
    path: '/rubbishSewageOutLet',
    name: 'rubbishSewageOutLet',
    component: () => import('@/views/sewageDisposal/rubbishRecord/outLetList'),
    meta: { title: '生活垃圾排污口' }
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
  },
  {
    path: '/portCheck',
    name: 'portCheck',
    component: () => import('@/views/sewageDisposal/portCheck'),
    meta: { title: '污染物接收确认' }
  },
  {
    path: '/portCheckInfo',
    name: 'portCheckInfo',
    component: () => import('@/views/sewageDisposal/portCheck/info'),
    meta: { title: '污染物接收确认' }
  },
  {
    path: '/pointHelp',
    name: 'pointHelp',
    component: () => import('@/views/sewageDisposal/sewageIntegral/help'),
    meta: { title: '排污积分说明' }
  },
  {
    path: '/bill',
    name: 'bill',
    component: () => import('@/views/sewageDisposal/landRecord/bill'),
    meta: { title: '电子单据' }
  }
]
export default sewageDisposal
