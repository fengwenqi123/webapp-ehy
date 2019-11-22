const etc = [
  {
    path: '/goLock',
    name: 'goLock',
    component: () => import('@/views/ETC/goLock/index'),
    meta: {
      title: '过闸ETC'
    }
  },
  {
    path: '/declare',
    name: 'declare',
    component: () => import('@/views/ETC/goLock/declare'),
    meta: {
      title: '过闸申报'
    }
  },
  {
    path: '/lockDetails',
    name: 'lockDetails',
    component: () => import('@/views/ETC/goLock/lockDetails'),
    meta: {
      title: '过闸详情'
    }
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/views/ETC/account/index'),
    meta: {
      title: 'ETC账户'
    }
  },
  {
    path: '/fees',
    name: 'fees',
    component: () => import('@/views/ETC/fees/index'),
    meta: {
      title: '规费ETC'
    }
  },
  {
    path: '/feesDeclare',
    name: 'feesDeclare',
    component: () => import('@/views/ETC/fees/feesDeclare'),
    meta: {
      title: '规费申报'
    }
  },
  {
    path: '/feesDetails',
    name: 'feesDetails',
    component: () => import('@/views/ETC/fees/feesDetails'),
    meta: {
      title: '规费详情'
    }
  },
]
export default etc
