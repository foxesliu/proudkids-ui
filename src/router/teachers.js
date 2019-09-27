import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)

export const chRouter = {
  menuId: 300,
  path: '/teachers',
  name: '中外教',
  component: Layout,
  redirect: '/teachers/evaluation',
  meta: {
    title: '中外教',
    icon: 'monitor'
  },
  children: [{
    menuId: 362,
    path: 'tutorApplyHistoryList',
    component: _import('teachers/evaluation/tutorApplyHistoryList'),
    name: '历史记录',
    meta: {title: '历史记录', icon: 'service'},
    hidden: true
  },
    {
      menuId: 362,
      path: 'applayHoliday',
      component: _import('teachers/evaluation/applayHoliday'),
      name: '申请假期',
      meta: {title: '申请假期', icon: 'service'},
      hidden: true
    },
    {
      menuId: 362,
      path: 'tutorUptime',
      component: _import('teachers/evaluation/tutorUptime'),
      name: '常规课设置可用时间',
      meta: {title: '常规课设置可用时间', icon: 'service'},
      hidden: true
    },


    {
      menuId: 395,
      path: 'evaluation',
      component: _import('teachers/evaluation/evaluation'),
      name: '评价',
      meta: {title: '评价', icon: 'service'},
      hidden: true
    },
    {
      menuId: 393,
      path: 'editEvaluation',
      component: _import('teachers/evaluation/editEvaluation'),
      name: '修改评价',
      meta: {title: '修改评价', icon: 'service'},
      hidden: true
    },
    {
      menuId: 330,
      path: 'classManage',
      component: _import('teachers/classManage/classManage'),
      name: '班级管理',
      meta: {title: '班级管理', icon: 'service'},
      hidden: true
    }, {
      menuId: 360,
      path: 'classing',
      component: _import('teachers/classManage/classing'),
      name: '进行中班级',
      meta: {title: '进行中班级', icon: 'service'},
      hidden: true
    }, {
      menuId: 361,
      path: 'courseware',
      component: _import('teachers/classManage/courseware'),
      name: '课件',
      meta: {title: '课件', icon: 'service'},
      hidden: true
    },
    {
      menuId: 320,
      path: 'replaceClass',
      component: _import('teachers/classManage/replaceClass'),
      name: '替课名单',
      meta: {title: '替课名单', icon: 'service'}
    },
    {
      menuId: 350,
      path: 'cramClass',
      component: _import('teachers/classManage/cramClass'),
      name: '补课名单',
      meta: {title: '补课名单', icon: 'service'}
    },
    {
      menuId: 350,
      path: 'classinfo',
      component: _import('teachers/classInfo/index'),
      name: '班级情况',
      meta: {title: '班级情况', icon: 'service'},
      hidden: true,
    },
    {
      menuId: 350,
      path: 'classinginfo',
      component: _import('teachers/classInfo/classinginfo'),
      name: '进行中的班级',
      meta: {title: '进行中的班级', icon: 'service'},
      hidden: true,
    },
    {
      menuId: 350,
      path: 'classedinfo',
      component: _import('teachers/classInfo/classedinfo'),
      name: '已上的班级情况',
      meta: {title: '已上的班级情况', icon: 'service'},
      hidden: true,
    },
    {
      menuId: 350,
      path: 'checkCourse',
      component: _import('teachers/classInfo/checkCourse'),
      name: '查看课件',
      meta: {title: '查看课件', icon: 'service'},
      hidden: true,
    },
    {
      menuId: 350,
      path: 'studentinginfo',
      component: _import('teachers/classInfo/studentIngInfo'),
      name: '学生上课情况-待上',
      meta: {title: '学生上课情况-待上', icon: 'service'},
      hidden: true
    },
    {
      menuId: 350,
      path: 'studentedinfo',
      component: _import('teachers/classInfo/studentEdInfo'),
      name: '学生上课情况-已上',
      meta: {title: '学生上课情况-已上', icon: 'service'},
      hidden: true,
    },
    {
      menuId: 350,
      path: 'subclass',
      component: _import('teachers/classInfo/subClass'),
      name: '替课名单',
      meta: {title: '替课名单', icon: 'service'},
      hidden: true,
    },

    {
      menuId: 395,
      path: 'evaluation',
      component: _import('teachers/evaluation/evaluation'),
      name: '评价',
      meta: {title: '评价', icon: 'service'},
      hidden: true
    },
    // {
    //   menuId: 396,
    //   path: 'kpi',
    //   component: _import('teachers/kpi/index'),
    //   name: '中教KPI',
    //   meta: {title: '中教KPI', icon: 'service'},
    //   hidden: false
    // },
    {
      menuId: 393,
      path: 'editEvaluation',
      component: _import('teachers/evaluation/editEvaluation'),
      name: '修改评价',
      meta: {title: '修改评价', icon: 'service'},
      hidden: true
    },
    {
      menuId: 330,
      path: 'classManage',
      component: _import('teachers/classManage/classManage'),
      name: '班级管理',
      meta: {title: '班级管理', icon: 'service'}
    }, {
      menuId: 360,
      path: 'classing',
      component: _import('teachers/classManage/classing'),
      name: '进行中班级',
      meta: {title: '进行中班级', icon: 'service'},
      hidden: true
    }, {
      menuId: 361,
      path: 'courseware',
      component: _import('teachers/classManage/courseware'),
      name: '课件',
      meta: {title: '课件', icon: 'service'},
      hidden: true
    },
    {
      menuId: 320,
      path: 'replaceClass',
      component: _import('teachers/classManage/replaceClass'),
      name: '替课名单',
      meta: {title: '替课名单', icon: 'service'},
      hidden: true,
    },
    {
      menuId: 350,
      path: 'cramClass',
      component: _import('teachers/classManage/cramClass'),
      name: '补课名单',
      meta: {title: '补课名单', icon: 'service'},
      hidden: true,
    },
    {
      menuId: 350,
      path: 'classinfo',
      component: _import('teachers/classInfo/index'),
      name: '班级情况',
      meta: {title: '班级情况', icon: 'service'},
      hidden: true,
    },
    {
      menuId: 350,
      path: 'classinginfo',
      component: _import('teachers/classInfo/classinginfo'),
      name: '班级情况',
      meta: {title: '班级情况', icon: 'service'},
      hidden: true,
    },
    {
      menuId: 350,
      path: 'classedinfo',
      component: _import('teachers/classInfo/classedinfo'),
      name: '班级情况',
      meta: {title: '班级情况', icon: 'service'},
      hidden: true,
    },
    {
      menuId: 350,
      path: 'checkCourse',
      component: _import('teachers/classInfo/checkCourse'),
      name: '班级情况',
      meta: {title: '班级情况', icon: 'service'},
      hidden: true,
    }
  ],
}

export const foRouter = {
  menuId: 300,
  path: '/teachers',
  name: 'Course',
  component: Layout,
  redirect: '/teachers/evaluation',
  meta: {
    title: 'Course',
    icon: 'monitor'
  },
  children: [{
    menuId: 362,
    path: 'tutorApplyHistoryList',
    component: _import('teachers/evaluation/tutorApplyHistoryList'),
    name: 'tutorApplyHistoryList',
    meta: {title: 'tutorApplyHistoryList', icon: 'service'},
    hidden: true
  },
    {
      menuId: 362,
      path: 'applayHoliday',
      component: _import('teachers/evaluation/applayHoliday'),
      name: 'applayHoliday',
      meta: {title: 'applayHoliday', icon: 'service'},
      hidden: true
    },
    {
      menuId: 362,
      path: 'tutorUptime',
      component: _import('teachers/evaluation/tutorUptime'),
      name: 'tutorUptime',
      meta: {title: 'tutorUptime', icon: 'service'},
      hidden: true
    },

    {
      menuId: 395,
      path: 'evaluation',
      component: _import('teachers/evaluation/evaluation'),
      name: 'evaluation',
      meta: {title: 'evaluation', icon: 'service'},
      hidden: true
    },
    {
      menuId: 393,
      path: 'editEvaluation',
      component: _import('teachers/evaluation/editEvaluation'),
      name: 'editEvaluation',
      meta: {title: 'editEvaluation', icon: 'service'},
      hidden: true
    },
    {
      menuId: 330,
      path: 'classManage',
      component: _import('teachers/classManage/classManage'),
      name: 'Class Mgt',
      meta: {title: 'Class Mgt', icon: 'service'}
    }, {
      menuId: 360,
      path: 'classing',
      component: _import('teachers/classManage/classing'),
      name: 'classing',
      meta: {title: 'classing', icon: 'service'},
      hidden: true
    }, {
      menuId: 361,
      path: 'courseware',
      component: _import('teachers/classManage/courseware'),
      name: 'courseware',
      meta: {title: 'courseware', icon: 'service'},
      hidden: true
    },
    {
      menuId: 320,
      path: 'replaceClass',
      component: _import('teachers/classManage/replaceClass'),
      name: 'Sub',
      meta: {title: 'Sub', icon: 'service'}
    },
    {
      menuId: 350,
      path: 'cramClass',
      component: _import('teachers/classManage/cramClass'),
      name: 'Make-up',
      meta: {title: 'Make-up', icon: 'service'}
    },
    {
      menuId: 350,
      path: 'classinfo',
      component: _import('teachers/classInfo/index'),
      name: '班级情况',
      meta: {title: '班级情况', icon: 'service'},
      hidden: true
    }
  ]
};

export const evaluateRouter = {
  menuId: 90803002,
  path: '/detail',
  component: Layout,
  name: '评价模板',
  redirect: '/monitor/service',
  hidden: false,
  // icon: 'table',
  meta: {
    title: '评价模板',
    icon: 'monitor'
  },
  children: [{
    menuId: 2019031,
    path: 'evaluateTemplate',
    component: _import('sale/detail/workDetail/evaluateTemplate'),
    name: '评价模板',
    meta: {
      title: '评价模板',
      icon: 'service'
    }
  }, {
    menuId: 2019031,
    path: 'addEvaluateTemplate',
    component: _import('sale/detail/workDetail/addEvaluateTemplate'),
    name: '新增模板',
    meta: {
      title: '新增模板',
      icon: 'service'
    }
  },
    {
      menuId: 2019040,
      path: 'workDetail',
      component: _import('sale/detail/workDetail/workDetail'),
      name: '学生作业详情',
      hidden: true,
      meta: {
        title: '学生作业详情',
        icon: 'service'
      }
    },
    {
      menuId: 2019031,
      path: 'currentPage',
      component: _import('sale/detail/workDetail/currentPage'),
      name: '数据题-当前页',
      hidden: true,
      meta: {
        title: '数据题-当前页',
        icon: 'service'
      }
    },
    {
      menuId: 2019031,
      path: 'correctText',
      component: _import('sale/detail/workDetail/correctText'),
      name: '回复批注文本',
      hidden: true,
      meta: {
        title: '回复批注文本',
        icon: 'service'
      }
    },
    {
      menuId: 2019031,
      path: 'correctRecord',
      component: _import('sale/detail/workDetail/correctRecord'),
      name: '回复批注录音',
      hidden: true,
      meta: {
        title: '回复批注录音',
        icon: 'service'
      }
    },
    {
      menuId: 2019031,
      path: 'draw',
      component: _import('sale/detail/workDetail/draw'),
      name: '画板详情',
      hidden: true,
      meta: {
        title: '画板详情',
        icon: 'service'
      }
    },
    // {
    //   menuId: 2019031,
    //   path: 'mark',
    //   component: _import('sale/detail/workDetail/mark'),
    //   name: 'mark标记',
    //   hidden: true,
    //   meta: {
    //     title: '画板详情',
    //     icon: 'service'
    //   }
    // },
    // {
    //   menuId: 2019039,
    //   path: 'currentPage',
    //   component: _import('sale/detail/workDetail/components/currentTabs'),
    //   name: '数据题-当前页',
    //   hidden: true,
    //   meta: {
    //     title: '数据题-当前页',
    //     icon: 'service'
    //   }
    // }
  ]
}
