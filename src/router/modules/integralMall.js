const integralMall = [
  {
    path: '/integralMall',
    name: 'integralMall',
    component: () => import('@/views/IntegralMall/home/index'),
    meta: {
      title: '积分商城'
    }
  },
  {
    path: '/exchangeList',
    name: 'exchangeList',
    component: () => import('@/views/IntegralMall/exchangeList/index'),
    meta: {
      title: '兑换账单'
    }
  },
  {
    path: '/orderList',
    name: 'orderList',
    component: () => import('@/views/IntegralMall/orderList/index'),
    meta: {
      title: '我的订单'
    }
  },
  {
    path: '/CommodityDetails',
    name: 'CommodityDetails',
    component: () => import('@/views/IntegralMall/CommodityDetails/index'),
    meta: {
      title: '商品详情'
    }
  },
  {
    path: '/ConfirmationOrder',
    name: 'ConfirmationOrder',
    component: () => import('@/views/IntegralMall/ConfirmationOrder/index'),
    meta: {
      title: '确认订单'
    }
  },
  {
    path: '/orderDetails',
    name: 'orderDetails',
    component: () => import('@/views/IntegralMall/orderDetails/index'),
    meta: {
      title: '订单详情'
    }
  }

]
export default integralMall
