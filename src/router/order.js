//张三丰的路由开始

import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
/*
{
  menuId: 1500778,
    path: '/onlineOrdersList',
  name: '在线订单查询3',
  component: Layout,
  redirect: '/detail/onlineOrdersList',
  hidden: false,
  meta: {
  title: '在线订单查询3',
    icon: 'monitor'
},
  children: [
    {
      menuId: 150001779,
      path: 'onlineOrdersList',
      component: _import('sale/detail/payCourse/onlineOrdersList'),
      name: '在线订单查询4',
      meta: {title: '在线订单查询4', icon: 'service'},
      hidden: false,
    },
  ]
}
*/

export const orderRouter = {
  menuId: 1500778,
  path: '/onlineOrdersList',
  name: '订单查询',
  component: Layout,
  redirect: '/order/online',
  hidden: false,
  meta: {
    title: '订单查询',
    icon: 'monitor'
  },
  children: [
    {
      menuId: 150001779,
      path: 'onlineOrdersList',
      component: _import('sale/detail/payCourse/onlineOrdersList'),
      name: '在线订单查询',
      meta: {title: '在线订单查询', icon: 'service'},
      hidden: false,
    },
    {
      menuId: 150001779,
      path: 'hexiaoOrdersList',
      component: _import('sale/detail/payCourse/hexiaoOrdersList'),
      name: '核销订单查询',
      meta: {title: '核销订单查询', icon: 'service'},
      hidden: false,
    }
  ]
};
//张三丰的路由结束
