const integralMall = [
  {
    path: '/integralMall',
    name: 'integralMall',
    component: () => import('@/views/IntegralMall/home/index'),
    meta: {
      title: '积分商城',
      keepAlive: 'true'
    }
  },
  {
    path: '/exchangeList',
    name: 'exchangeList',
    component: () => import('@/views/IntegralMall/exchangeList/index'),
    meta: {
      title: '兑换账单',
      keepAlive: 'true'
    }
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: () => import('@/views/IntegralMall/orderList/index'),
    meta: {
      title: '我的订单',
      keepAlive: 'true'
    }
  },
  {
    path: '/CommodityDetails',
    name: 'CommodityDetails',
    component: () => import('@/views/IntegralMall/CommodityDetails/index'),
    meta: {
      title: '商品详情',
      keepAlive: 'true'
    }
  },
  {
    path: '/ConfirmationOrder',
    name: 'ConfirmationOrder',
    component: () => import('@/views/IntegralMall/ConfirmationOrder/index'),
    meta: {
      title: '确认订单',
      keepAlive: 'true'
    }
  },
  {
    path: '/orderDetails',
    name: 'orderDetails',
    component: () => import('@/views/IntegralMall/orderDetails/index'),
    meta: {
      title: '订单详情',
      keepAlive: 'true'
    }
  }

]
export default integralMall
