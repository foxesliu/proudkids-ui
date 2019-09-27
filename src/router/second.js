import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
export const secondRouter = [{
        menuId: 1100,
        path: '/chTeachManage',
        component: Layout,
        name: '中外教管理',
        redirect: '/sale/chTeachPool',
        hidden: false,
        // icon: 'table',
        meta: {
            title: '中外教管理 ',
            icon: 'monitor'
        },
        children: [{
                menuId: 1101,
                path: 'chTeachPool:2',
                component: _import('chTeachManage/chTeachPool/index'),
                name: '中教池',
                meta: { title: '中教池', icon: 'service' }
            },
            {
              menuId: 396,
              path: 'kpi',
              component: _import('teachers/kpi/index'),
              name: '中教KPI',
              meta: {title: '中教KPI', icon: 'service'},
              hidden: false
            },
            {
                menuId: 1103,
                path: 'ehTeachPool:11',
                component: _import('chTeachManage/chTeachPool/index'),
                name: '外教池',
                meta: { title: '外教池', icon: 'service' }
            },
            {
                menuId: 1102,
                path: 'teacherInfo',
                component: _import('chTeachManage/chTeachPool/teacherInfo/index'),
                name: '教师资料',
                meta: { title: '教师资料', icon: 'service' },
                hidden: true
            },
            {
                menuId: 1130,
                path: 'courseInfo',
                component: _import('chTeachManage/chTeachPool/courseInfo/index'),
                name: '课程',
                meta: { title: '课程', icon: 'service' },
                hidden: true
            },
            {
                menuId: 1131,
                path: 'improving',
                component: _import('chTeachManage/chTeachPool/courseInfo/brilliant'),
                name: '可提高课程',
                meta: { title: '可提高课程', icon: 'service' },
                hidden: true
            },
            {
                menuId: 1131,
                path: 'brilliant',
                component: _import('chTeachManage/chTeachPool/courseInfo/brilliant'),
                name: '精彩课程',
                meta: { title: '精彩课程', icon: 'service' },
                hidden: true
            },
            {
                menuId: 1141,
                path: 'applylist',
                component: _import('applylist/index'),
                name: '外教申请',
                meta: { title: '外教申请', icon: 'service' },

            },
            {
                menuId: 1141,
                path: 'applydetail',
                component: _import('applylist/applydetail'),
                name: '简历详情',
                meta: { title: '简历详情', icon: 'service' },
                hidden: true
            },
            {
                menuId: 1151,
                path: 'today',
                component: _import('chTeachManage/today/index'),
                name: 'today',
                meta: { title: 'today', icon: 'service' },

            },
            {
                menuId: 1180,
                path: 'historyList',
                component: _import('chTeachManage/historyList/index'),
                name: 'historyList',
                meta: { title: 'historyList', icon: 'service' },
                hidden: true
            },
            {
                menuId: 1161,
                path: 'evaluation1',
                component: _import('teachers/evaluation/evaluation'),
                name: '评价',
                meta: { title: '评价', icon: 'service' },
                hidden: true
            },
            {
                menuId: 1171,
                path: 'editEvaluation1',
                component: _import('teachers/evaluation/editEvaluation'),
                name: '修改评价',
                meta: { title: '修改评价', icon: 'service' },
                hidden: true
            },
        ]
    },
    {
        menuId: 1200,
        path: '/timeManage',
        component: Layout,
        name: '时间管理',
        redirect: '/sale/salePermission',
        hidden: false,
        // icon: 'table',
        meta: {
            title: '销售角色 ',
            icon: 'monitor'
        },
        children: []
    }
];

export const secondRouterEn = [{
        menuId: 1100,
        path: '/chTeachManage',
        component: Layout,
        name: 'CT/FT',
        redirect: '/sale/chTeachPool',
        hidden: false,
        // icon: 'table',
        meta: {
            title: 'CT/FT',
            icon: 'monitor'
        },
        children: [{
                menuId: 1101,
                path: 'chTeachPool:2',
                component: _import('chTeachManage/chTeachPool/index'),
                name: '中教池',
                meta: { title: '中教池', icon: 'service' }
            },
            {
                menuId: 1103,
                path: 'ehTeachPool:11',
                component: _import('chTeachManage/chTeachPool/index'),
                name: 'FT Profiles',
                meta: { title: 'FT Profiles', icon: 'service' }
            },
            {
                menuId: 1102,
                path: 'teacherInfo',
                component: _import('chTeachManage/chTeachPool/teacherInfo/index'),
                name: '教师资料',
                meta: { title: '教师资料', icon: 'service' },
                hidden: true
            },
            {
                menuId: 1130,
                path: 'courseInfo',
                component: _import('chTeachManage/chTeachPool/courseInfo/index'),
                name: '课程',
                meta: { title: '课程', icon: 'service' },
                hidden: true
            },
            {
                menuId: 1131,
                path: 'improving',
                component: _import('chTeachManage/chTeachPool/courseInfo/brilliant'),
                name: '可提高课程',
                meta: { title: '可提高课程', icon: 'service' },
                hidden: true
            },
            {
                menuId: 1131,
                path: 'brilliant',
                component: _import('chTeachManage/chTeachPool/courseInfo/brilliant'),
                name: '精彩课程',
                meta: { title: '精彩课程', icon: 'service' },
                hidden: true
            },
            {
                menuId: 1151,
                path: 'today',
                component: _import('chTeachManage/today/index'),
                name: 'today',
                meta: { title: 'today', icon: 'service' },

            },
            {
                menuId: 1161,
                path: 'evaluation1',
                component: _import('teachers/evaluation/evaluation'),
                name: '评价',
                meta: { title: '评价', icon: 'service' },
                hidden: true
            },
            {
                menuId: 1171,
                path: 'editEvaluation1',
                component: _import('teachers/evaluation/editEvaluation'),
                name: '修改评价',
                meta: { title: '修改评价', icon: 'service' },
                hidden: true
            },
            {
                menuId: 1141,
                path: 'applylist',
                component: _import('applylist/index'),
                name: '外教申请',
                meta: { title: '外教申请', icon: 'service' },

            },
            {
                menuId: 1141,
                path: 'applydetail',
                component: _import('applylist/applydetail'),
                name: '简历详情',
                meta: { title: '简历详情', icon: 'service' },
                hidden: true
            }
        ]
    },
    {
        menuId: 1200,
        path: '/timeManage',
        component: Layout,
        name: '时间管理',
        redirect: '/sale/salePermission',
        hidden: false,
        // icon: 'table',
        meta: {
            title: '销售角色 ',
            icon: 'monitor'
        },
        children: []
    }
];
