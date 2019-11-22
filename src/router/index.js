import Vue from 'vue'
import Router from 'vue-router'
import jinhua from './modules/jinhua'
import gyt from './modules/gyt'
import etc from './modules/etc'
import sewageDisposal from './modules/sewageDisposal'
import ehy from './modules/ehy'
import integralMall from './modules/integralMall'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 默认跳转到 recommend
      path: '/',
      redirect: '/exp'
    },
    ...jinhua,
    ...gyt,
    ...sewageDisposal,
    ...ehy,
    ...integralMall,
    ...etc,
    {
      path: '/exp',
      name: 'exp',
      component: () => import('@/views/exp/index')
    },
    {
      path: '/expList',
      name: 'expList',
      component: () => import('@/views/expList/index')
    },
    {
      path: '/expDetail',
      name: 'expDetail',
      component: () => import('@/views/expDetail/index')
    },
    {
      path: '/expQrcode',
      name: 'expQrcode',
      component: () => import('@/views/expQrcode/index')
    },
    {
      path: '/success',
      name: 'success',
      component: () => import('@/views/tips/success')
    },
    {
      path: '/error',
      name: 'error',
      component: () => import('@/views/tips/error')
    },
    {
      path: '/NewsDetail',
      name: 'NewsDetail',
      component: () => import('@/views/NewsDetail/index')
    },
    {
      path: '/expPay',
      name: 'expPay',
      component: () => import('@/views/expPay/index'),
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/disclaimer',
      name: 'disclaimer',
      component: () => import('@/views/disclaimer/index')
    },
    // 排污
    {
      path: '/point',
      name: 'point',
      component: () => import('@/views/sewage/point/index')
    },
    {
      path: '/pointDeatils',
      name: 'pointDeatils',
      component: () => import('@/views/sewage/pointDeatils/index')
    },
    {
      path: '/sewageList',
      name: 'sewageList',
      component: () => import('@/views/sewage/list/index')
    },
    {
      path: '/sewageDeatils',
      name: 'sewageDeatils',
      component: () => import('@/views/sewage/deatils/index')
    },
    {
      path: '/refuel',
      name: 'refuel',
      component: () => import('@/views/refuel/index'),
      meta: {
        title: '加油记录'
      }
    },
    {
      path: '/addRefuel',
      name: 'addRefuel',
      component: () => import('@/views/refuel/addRefuel'),
      meta: {
        title: '申请加油'
      }
    },
    {
      path: '/refuelInfo',
      name: 'refuelInfo',
      component: () => import('@/views/refuel/refuelInfo'),
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/goRefuelInfo',
      name: 'goRefuelInfo',
      component: () => import('@/views/refuel/goRefuelInfo'),
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/adminRefuel',
      name: 'adminRefuel',
      component: () => import('@/views/adminRefuel/index'),
      meta: {
        title: '加油'
      }
    },
    {
      path: '/addAdminRefuel',
      name: 'addAdminRefuel',
      component: () => import('@/views/adminRefuel/addRefuel'),
      meta: {
        title: '申请加油'
      }
    },
    {
      path: '/adminRefuelInfo',
      name: 'adminRefuelInfo',
      component: () => import('@/views/adminRefuel/refuelInfo'),
      meta: {
        title: '订单详情'
      }
    },
    {
      path: '/adminPayRefuelInfo',
      name: 'adminPayRefuelInfo',
      component: () => import('@/views/adminRefuel/payRefuel'),
      meta: {
        title: '退款详情'
      }
    },
    {
      path: '/insurance',
      name: 'insurance',
      component: () => import('@/views/insurance/index'),
      meta: {
        title: '保险列表'
      }
    },
    {
      path: '/addInsurance',
      name: 'addInsurance',
      component: () => import('@/views/insurance/addInsurance'),
      meta: {
        title: '预约保险'
      }
    },
    {
      path: '/insuranceInfo',
      name: 'insuranceInfo',
      component: () => import('@/views/insurance/insuranceInfo'),
      meta: {
        title: '保险详情'
      }
    },
    {
      path: '/lockManage',
      name: 'lockManage',
      component: () => import('@/views/GYT/lockManage/index'),
      meta: {
        title: '过闸管理'
      }
    },
    {
      path: '/lockManageIn',
      name: 'lockManageIn',
      component: () => import('@/views/GYT/lockManage/index_in.vue'),
      meta: {
        title: '过闸管理'
      }
    },
    {
      path: '/lockDetails',
      name: 'lockDetails',
      component: () => import('@/views/GYT/lockManage/lockDetails'),
      meta: {
        title: '过闸详情'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about/index'),
      meta: {
        title: '关于我们'
      }
    },
    {
      path: '/aboutContent',
      name: 'aboutContent',
      component: () => import('@/views/about/aboutContent'),
      meta: {
        title: '详情'
      }
    }
  ]
})
