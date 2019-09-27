import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)

export const messageRouter = {
  menuId: 1600778,
  path: '/message',
  name: 'Message',
  component: Layout,
  redirect: '/message/feedback',
  hidden: false,
  meta: {
    title: 'Feedback',
    icon: 'monitor'
  },
  children: [
    {
      menuId: 160001779,
      path: 'feedback',
      component: _import('aom/report/index'),
      name: 'Feedback',
      meta: {title: 'Feedback', icon: 'service'},
      hidden: false,
    },
    {
      menuId: 160001780,
      path: 'feedback-add',
      component: _import('aom/report/detail'),
      name: 'Feedback Add',
      meta: {title: 'Feedback Add', icon: 'service'},
      hidden: true,
    },
    {
      menuId: 160001781,
      path: 'message-remind',
      component: _import('teachers/message/message'),
      name: '消息提醒',
      meta: {title: '预习和作业消息提醒', icon: 'service'},
      hidden: false,
    }
  ]
};

