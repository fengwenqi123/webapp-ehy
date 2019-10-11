export default [{
  path: '/port',
  name: 'port',
  component: () => import('@/views/jinhua/port/index')
},
{
  path: '/portRegister',
  name: 'portRegister',
  component: () => import('@/views/jinhua/register/index')
},
{
  path: '/portSuccess',
  name: 'portSuccess',
  component: () => import('@/views/jinhua/success/index')
},
{
  path: '/portPay',
  name: 'portPay',
  component: () => import('@/views/jinhua/pay/index')
},
{
  path: '/portInfo',
  name: 'portInfo',
  component: () => import('@/views/jinhua/info/index')
},
{
  path: '/portHistory',
  name: 'portHistory',
  component: () => import('@/views/jinhua/history/index')
}
]
