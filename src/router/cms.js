//张三丰的路由开始

import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)

export const cmsRouter = {
  menuId: 789160100,
  path: '/cms',
  name: 'CMS',
  component: Layout,
  redirect: '/cms/cate',
  hidden: false,
  meta: {
    title: '频道管理',
    icon: 'monitor'
  },
  children: [
    {
      menuId: 789160200,
      path: 'cate',
      component: _import('cms/cate/index'),
      name: '频道管理',
      meta: {title: '频道管理', icon: 'service'},
      hidden: false,
    },
    {
      menuId: 789160200,
      path: 'article',
      component: _import('cms/article/index'),
      name: '文章管理',
      meta: {title: '文章管理', icon: 'service'},
      hidden: false,
    },
    {
      menuId: 789160200,
      path: 'article-add',
      component: _import('cms/article/add'),
      name: '文章添加',
      meta: {title: '文章添加', icon: 'service'},
      hidden: true,
    },
    {
      menuId: 789160200,
      path: 'article-edit',
      component: _import('cms/article/edit'),
      name: '文章编辑',
      meta: {title: '文章编辑', icon: 'service'},
      hidden: true,
    },
  ]
};
//张三丰的路由结束
