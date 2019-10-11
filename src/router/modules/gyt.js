const gyt = [
  {
    path: '/gyt',
    name: 'gyt',
    component: () =>
      import('@/views/GYT/index'),
    meta: { title: '港易通首页' }
  },
  {
    path: '/selfBg',
    name: 'selfBg',
    component: () =>
      import('@/views/GYT/selfBg/index'),
    meta: { title: '自助报港' }
  },
  {
    path: '/qyList',
    name: 'qyList',
    component: () =>
      import('@/views/GYT/qyList'),
    meta: { title: '起运港' }
  },
  {
    path: '/mdList',
    name: 'mdList',
    component: () =>
      import('@/views/GYT/mdList'),
    meta: { title: '目的港' }
  },
  {
    path: '/pierList',
    name: 'pierList',
    component: () =>
      import('@/views/GYT/pierList'),
    meta: { title: '作业码头' }
  },
  {
    path: '/goodsList',
    name: 'goodsList',
    component: () =>
      import('@/views/GYT/goodsList'),
    meta: { title: '货种' }
  },
  {
    path: '/boxBg',
    name: 'boxBg',
    component: () =>
      import('@/views/GYT/boxBg/index'),
    meta: { title: '集装箱报港' }
  },
  {
    path: '/boxInfo',
    name: 'boxInfo',
    component: () =>
      import('@/views/GYT/boxBg/boxInfo'),
    meta: { title: '新建集装箱' }
  },
  {
    path: '/editBoxInfo',
    name: 'editBoxInfo',
    component: () =>
      import('@/views/GYT/boxBg/editBoxInfo'),
    meta: { title: '编辑集装箱' }
  },
  {
    path: '/bgHistory',
    name: 'bgHistory',
    component: () =>
      import('@/views/GYT/bgHistory/index'),
    meta: { title: '报港历史' }
  }
]
export default gyt
