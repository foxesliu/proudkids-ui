import Vue from 'vue'
import Router from 'vue-router'

import {sfRouter} from './aom.js';
import {cmsRouter} from './cms.js';
import {orderRouter} from './order.js';
import {messageRouter} from './message.js';
import {chRouter, foRouter,evaluateRouter} from './teachers.js';
import {secondRouter, secondRouterEn} from "./second.js";
import {asyncRouterMap1} from './common.js';

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)
console.log(navigator.language)
/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', name: '登录', component: _import('login/index'), hidden: true},
  {path: '/404', name: '404', component: _import('404'), hidden: true},
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'Home',
      meta: {title: 'Home', icon: 'dashboard', noCache: true}
    },
      {
        path: 'upload',
        component: _import('admin/user/info'),
        name: '修改信息',
        meta: {title: '修改信息', icon: '', noCache: true}
      }
    ]
  }
];

export default new Router({
  // mode: 'history', // 后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

asyncRouterMap1.push(sfRouter);
asyncRouterMap1.push(cmsRouter);
asyncRouterMap1.push(orderRouter);
asyncRouterMap1.push(messageRouter);
let asyncRouterMap2 = [];
if (navigator.language.toLowerCase() === 'zh-cn') {
  console.log('中文系统');
  asyncRouterMap1.push(chRouter);
  asyncRouterMap1.push(evaluateRouter);
  asyncRouterMap2 = [asyncRouterMap2, ...asyncRouterMap1, ...secondRouter];
} else {
  console.log('英文系统');
  asyncRouterMap1.push(foRouter);
  asyncRouterMap1.push(evaluateRouter);
  asyncRouterMap2 = [asyncRouterMap2, ...asyncRouterMap1, ...secondRouterEn];
}

export const asyncRouterMap = asyncRouterMap2;
