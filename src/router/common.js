import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)
export const asyncRouterMap1 = [ //需要动态权限判定的路由
    {
        menuId: 1,
        path: '/admin',
        component: Layout,
        name: '系统管理',
        hidden: false,
        redirect: '/admin/user',
        // icon: 'table',
        meta: {
            title: '系统管理',
            icon: 'table'
        },
        children: [{
                menuId: 2,
                path: 'user',
                component: _import('admin/user/index'),
                name: '用户管理',
                meta: {
                    title: '用户管理',
                    icon: 'user'
                }
            },
            {
                menuId: 3,
                path: 'menu',
                component: _import('admin/menu/index'),
                name: '菜单管理',
                meta: {
                    title: '菜单管理',
                    icon: 'tree'
                }
            },
            {
                menuId: 4,
                path: 'role',
                component: _import('admin/role/index'),
                name: '角色管理',
                meta: {
                    title: '角色管理',
                    icon: 'role'
                }
            },
            {
                menuId: 5,
                path: 'dept',
                component: _import('admin/dept/index'),
                name: '部门管理',
                meta: {
                    title: '部门管理',
                    icon: 'dept'
                }
            },

            {
                menuId: 6,
                path: 'dict',
                component: _import('admin/dict/index'),
                name: '字典管理',
                meta: {
                    title: '字典管理',
                    icon: 'dict'
                }
            },
            {
                menuId: 7,
                path: 'log',
                component: _import('admin/log/index'),
                name: '日志管理',
                meta: {
                    title: '日志管理',
                    icon: 'log'
                }
            }
        ]
    },
    {
        menuId: 8,
        path: '/monitor',
        component: Layout,
        name: '系统监控',
        redirect: '/monitor/service',
        hidden: false,
        // icon: 'table',
        meta: {
            title: '系统监控',
            icon: 'monitor'
        },
        children: [{
                menuId: 9,
                path: 'service',
                component: _import('admin/monitor/service'),
                name: '服务状态',
                meta: {
                    title: '服务状态',
                    icon: 'service'
                }
            },
            {
                menuId: 10,
                path: 'zipkin',
                component: _import('admin/monitor/zipkin'),
                name: 'zipkin监控',
                meta: {
                    title: 'zipkin监控',
                    icon: 'zipkin'
                }
            },
            {
                menuId: 11,
                path: 'pinpoint',
                component: _import('admin/monitor/pinpoint'),
                name: 'pinpoint监控',
                meta: {
                    title: 'pinpoint监控',
                    icon: 'pinpoint'
                }
            },
            {
                menuId: 12,
                path: 'cache',
                component: _import('admin/monitor/cache'),
                name: '缓存状态',
                meta: {
                    title: '缓存状态',
                    icon: 'cache'
                }
            },
            {
                menuId: 13,
                path: 'elk',
                component: _import('admin/monitor/elk'),
                name: 'ELK状态',
                meta: {
                    title: 'ELK状态',
                    icon: 'elk'
                }
            },
            {
                menuId: 14,
                path: 'swagger',
                component: _import('admin/monitor/swagger'),
                name: '接口文档',
                meta: {
                    title: '接口文档',
                    icon: 'swagger'
                }
            },
            {
                menuId: 15,
                path: 'daemon',
                component: _import('admin/monitor/daemon'),
                name: '任务监控',
                meta: {
                    title: '任务监控',
                    icon: 'daemon'
                }
            }
        ]
    },
    {
        menuId: 90803001,
        path: 'act',
        component: _import('sale/detail/act/act'),
        name: '行动',
        meta: { title: '行动', icon: 'service' },
        hidden: true
    },
    // {
    //   menuId: 180,
    //   path: 'experience',
    //   component: _import('sale/experience/index'),
    //   name: '未开始',
    //   meta: { title: '未开始', icon: 'service' }
    // },
    {
        menuId: 90803001,
        path: 'addExperience',
        component: _import('sale/experience/addExperience'),
        name: '选择体验课',
        meta: { title: '选择体验课', icon: 'service' },
        hidden: true
    },
    {
        menuId: 90803001,
        path: 'edit',
        component: _import('sale/detail/edit/edit'),
        name: '编辑',
        meta: { title: '编辑', icon: 'service' },
        hidden: true
    },
    {
        menuId: 90803001,
        path: 'classing',
        component: _import('sale/detail/classing/classing'),
        name: '进行中&待过的班级',
        meta: { title: '进行中&待过的班级', icon: 'service' },
        hidden: true
    },
    {
        menuId: 90803001,
        path: 'actLog',
        component: _import('sale/detail/actLog/actLog'),
        name: '行动日志',
        meta: { title: '行动日志', icon: 'service' },
        hidden: true
    },
    {
        menuId: 90803001,
        path: 'flowLog',
        component: _import('sale/detail/flowLog/flowLog'),
        name: '流转日志',
        meta: { title: '流转日志', icon: 'service' },
        hidden: true
    },
    {
        menuId: 90803001,
        path: 'joinchannel',
        component: _import('sale/detail/joinchannel/joinchannel'),
        name: '参与渠道1',
        meta: { title: '参与渠道1', icon: 'joinchannel' },
        hidden: true
    },
    {
        menuId: 90803001,
        path: 'channel',
        component: _import('sale/detail/channel/index'),
        name: '参与渠道',
        meta: { title: '参与渠道', icon: 'joinchannel' },
        hidden: true
    },
    {
        menuId: 90803001,
        path: 'invited',
        component: _import('sale/detail/invited/index'),
        name: '我邀请的人',
        meta: { title: '我邀请的人', icon: 'invited' },
        hidden: true
    },
    {
        menuId: 90803001,
        path: 'inviter',
        component: _import('sale/detail/joinchannel/inviter/inviter'),
        name: '查看邀请人',
        meta: { title: '查看邀请人', icon: 'inviter' },
        hidden: true,
    },
    {
        menuId: 90803001,
        path: 'payCourse',
        component: _import('sale/detail/payCourse/payCourse'),
        name: '购课',
        meta: { title: '购课', icon: 'payCourse' },
        hidden: true,
    },
    {
        menuId: 90803001,
        path: 'presentCourse',
        component: _import('sale/detail/presentCourse/presentCourse'),
        name: '赠课',
        meta: { title: '赠课', icon: 'presentCourse' },
        hidden: true,
    },
    {
        menuId: 90803001,
        path: 'classDetail',
        component: _import('sale/detail/classDetail/classDetail'),
        name: '班级详情',
        meta: { title: '班级详情', icon: 'presentCourse' },
        hidden: true,
    },
    {
        menuId: 90803001,
        path: 'classCourse',
        component: _import('sale/detail/classDetail/course'),
        name: '课件',
        meta: { title: '课件', icon: 'presentCourse' },
        hidden: true,
    },
    {
        menuId: 90803001,
        path: 'classSituation',
        component: _import('sale/detail/classDetail/classSituation'),
        name: '班级上课情况',
        meta: { title: '班级上课情况', icon: 'classSituation' },
        hidden: true,
    },
    {
        menuId: 90803001,
        path: 'ruserClassInfo',
        component: _import('sale/detail/ruserClassInfo/ruserClassInfo'),
        name: '学生上课情况',
        meta: { title: '学生上课情况', icon: 'ruserClassInfo' },
        hidden: true,
    },
    {
        menuId: 2019027,
        path: 'workDetail',
        component: _import('sale/detail/workDetail/workDetail'),
        name: '详情',
        meta: { title: '详情', icon: 'workDetail' },
        hidden: true,
    },
    {
        menuId: 90803001,
        path: 'evaluateTemplate',
        component: _import('sale/detail/workDetail/evaluateTemplate'),
        name: '中教评语素材库',
        meta: { title: '中教评语素材库', icon: 'evaluateTemplate' },
        hidden: true,
    },
    {
        menuId: 90803001,
        path: 'addEvaluateTemplate',
        component: _import('sale/detail/workDetail/addEvaluateTemplate'),
        name: '新增模板',
        meta: { title: '新增模板', icon: 'evaluateTemplate' },
        hidden: true,
    },
    {
        menuId: 908030017,
        path: 'ruserClassInfo-beforeclass',
        component: _import('aom/classmanage/user-classsituation-beforeclass'),
        name: '预习材料',
        meta: { title: '预习材料', icon: 'ruserClassInfo' },
        hidden: true,
    },
    {
        menuId: 90803001,
        path: 'ordersLog',
        component: _import('sale/detail/ordersLog/ordersLog'),
        name: '工单日志',
        meta: { title: '工单日志', icon: 'ordersLog' },
        hidden: true,
    },
    {
        menuId: 90803001,
        path: '/detail',
        component: Layout,
        name: '用户详情',
        redirect: '/detail/user',
        hidden: true,
        // icon: 'table',
        meta: {
            title: '用户详情',
            icon: 'monitor',
        },
        children: [{
                menuId: 90803001,
                path: 'user',
                component: _import('sale/detail/user/user'),
                name: '用户详情页',
                meta: {
                    title: '用户详情页',
                    icon: 'service'
                }
            },
            {
                menuId: 90803001,
                path: 'act',
                component: _import('sale/detail/act/act'),
                name: '行动',
                meta: {
                    title: '行动',
                    icon: 'service'
                },
                hidden: true
            },
            // {
            //   menuId: 180,
            //   path: 'experience',
            //   component: _import('sale/experience/index'),
            //   name: '未开始',
            //   meta: { title: '未开始', icon: 'service' }
            // },
            {
                menuId: 90803001,
                path: 'addExperience',
                component: _import('sale/experience/addExperience'),
                name: '选择体验课',
                meta: {
                    title: '选择体验课',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 90803001,
                path: 'edit',
                component: _import('sale/detail/edit/edit'),
                name: '编辑',
                meta: {
                    title: '编辑',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 90803001,
                path: 'classing',
                component: _import('sale/detail/classing/classing'),
                name: '进行中&待过的班级',
                meta: {
                    title: '进行中&待过的班级',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 90803001,
                path: 'actLog',
                component: _import('sale/detail/actLog/actLog'),
                name: '行动日志',
                meta: {
                    title: '行动日志',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 90803001,
                path: 'flowLog',
                component: _import('sale/detail/flowLog/flowLog'),
                name: '流转日志',
                meta: {
                    title: '流转日志',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 90803001,
                path: 'joinchannel',
                component: _import('sale/detail/joinchannel/joinchannel'),
                name: '参与渠道1',
                meta: {
                    title: '参与渠道1',
                    icon: 'joinchannel'
                },
                hidden: true
            },
            {
                menuId: 90803001,
                path: 'channel',
                component: _import('sale/detail/channel/index'),
                name: '参与渠道',
                meta: {
                    title: '参与渠道',
                    icon: 'joinchannel'
                },
                hidden: true
            },
            {
                menuId: 90803001,
                path: 'invited',
                component: _import('sale/detail/invited/index'),
                name: '我邀请的人',
                meta: {
                    title: '我邀请的人',
                    icon: 'invited'
                },
                hidden: true
            },
            {
                menuId: 90803001,
                path: 'inviter',
                component: _import('sale/detail/joinchannel/inviter/inviter'),
                name: '查看邀请人',
                meta: {
                    title: '查看邀请人',
                    icon: 'inviter'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'payCourse',
                component: _import('sale/detail/payCourse/payCourse'),
                name: '购课',
                meta: {
                    title: '购课',
                    icon: 'payCourse'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'presentCourse',
                component: _import('sale/detail/presentCourse/presentCourse'),
                name: '赠课',
                meta: {
                    title: '赠课',
                    icon: 'presentCourse'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'classDetail',
                component: _import('sale/detail/classDetail/classDetail'),
                name: '班级详情',
                meta: {
                    title: '班级详情',
                    icon: 'presentCourse'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'classCourse',
                component: _import('sale/detail/classDetail/course'),
                name: '课件',
                meta: {
                    title: '课件',
                    icon: 'presentCourse'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'classSituation',
                component: _import('sale/detail/classDetail/classSituation'),
                name: '班级上课情况',
                meta: {
                    title: '班级上课情况',
                    icon: 'classSituation'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'ruserClassInfo',
                component: _import('sale/detail/ruserClassInfo/ruserClassInfo'),
                name: '学生上课情况',
                meta: {
                    title: '学生上课情况',
                    icon: 'ruserClassInfo'
                },
                hidden: true,
            },
            {
                menuId: 908030017,
                path: 'ruserClassInfo-beforeclass',
                component: _import('aom/classmanage/user-classsituation-beforeclass'),
                name: '预习材料',
                meta: {
                    title: '预习材料',
                    icon: 'ruserClassInfo'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'ordersLog',
                component: _import('sale/detail/ordersLog/ordersLog'),
                name: '工单日志',
                meta: {
                    title: '工单日志',
                    icon: 'ordersLog'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'refundCourse',
                component: _import('sale/detail/refundCourse/refundCourse'),
                name: '退课',
                meta: {
                    title: '退课',
                    icon: 'refundCourse'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'evaluation',
                component: _import('sale/detail/evaluation/evaluation'),
                name: '查看评价',
                meta: {
                    title: '查看评价',
                    icon: 'evaluation'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'payCourseHistoryOrder',
                component: _import('sale/detail/payCourseHistoryOrder/payCourseHistoryOrder'),
                name: '购课历史工单',
                meta: {
                    title: '购课历史工单',
                    icon: 'payCourseHistoryOrder'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'presentCourseHistoryOrder',
                component: _import('sale/detail/presentCourseHistoryOrder/presentCourseHistoryOrder'),
                name: '赠课历史工单',
                meta: {
                    title: '赠课历史工单',
                    icon: 'presentCourseHistoryOrder'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'refundCourseHistoryOrder',
                component: _import('sale/detail/refundCourseHistoryOrder/refundCourseHistoryOrder'),
                name: '退课历史工单',
                meta: {
                    title: '退课历史工单',
                    icon: 'refundCourseHistoryOrder'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'continuedCourse',
                component: _import('sale/detail/continuedCourse/continuedCourse'),
                name: '续课',
                meta: {
                    title: '续课',
                    icon: 'continuedCourse'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'continuedCourseHistoryOrder',
                component: _import('sale/detail/continuedCourseHistoryOrder/continuedCourseHistoryOrder'),
                name: '续课历史工单',
                meta: {
                    title: '续课历史工单',
                    icon: 'continuedCourseHistoryOrder'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'suspendClass',
                component: _import('sale/detail/suspendClass/suspendClass'),
                name: '停课',
                meta: {
                    title: '停课',
                    icon: 'suspendClass'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'suspendHistoryOrder',
                component: _import('sale/detail/suspendClass/suspendHistoryOrder'),
                name: '停课历史工单',
                meta: {
                    title: '停课历史工单',
                    icon: 'suspendCourseHistoryOrder'
                },
                hidden: true,
            },
            {
                menuId: 90803001,
                path: 'onLineOrder',
                component: _import('sale/detail/payCourse/onLineOrder'),
                name: '在线订单',
                meta: {
                    title: '在线订单',
                    icon: 'onLIneOrder'
                },
                hidden: true,
            }
            // { menuId: 72, path: 'act', component: _import('sale/detail/act/act'), name: 'acaa', meta: { title: 'acaa', icon: 'service' }, hidden: true }},
            // { path: 'act', component: _import('sale/detail/act/act'), name: '行动', meta: { title: '行动', icon: '', noCache: true }}
        ]
    },
    {
        menuId: 100,
        path: '/sale',
        component: Layout,
        name: '销售角色',
        redirect: '/sale/salePermission',
        hidden: false,
        // icon: 'table',
        meta: {
            title: '销售角色 ',
            icon: 'monitor'
        },
        children: [{
                menuId: 101,
                path: 'salePermission',
                component: _import('sale/salePermission/index'),
                name: '销售权限',
                meta: {
                    title: '销售权限',
                    icon: 'service'
                }
            },
            {
                menuId: 150,
                path: 'exampleRemind',
                component: _import('sale/exampleRemind/index'),
                name: '提醒例子',
                meta: {
                    title: '提醒例子',
                    icon: 'service'
                }
            },
            {
                menuId: 160,
                path: 'exampleManual',
                component: _import('sale/exampleManual/index'),
                name: '手动添加',
                meta: {
                    title: '手动添加',
                    icon: 'service'
                }
            },
            {
                menuId: 1901,
                path: 'exampleStatic',
                component: _import('sale/exampleStatic/index'),
                name: '情况统计',
                meta: {
                    title: '情况统计',
                    icon: 'service'
                }
            },
            {
                menuId: 180,
                path: 'exampleSearch',
                component: _import('sale/exampleSearch/index'),
                name: '例子查询中心',
                meta: {
                    title: '例子查询中心',
                    icon: 'service'
                }
            },
            {
                menuId: 1902,
                path: 'experienceClass',
                component: _import('sale/experience/index'),
                name: '销售-体验课',
                meta: {
                    title: '销售-体验课',
                    icon: 'service'
                }
            },
            {
                menuId: 1902,
                path: 'noStart',
                component: _import('sale/experience/experience'),
                name: '未开始',
                meta: {
                    title: '未开始',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 1902,
                path: 'experienceList',
                component: _import('sale/experience/experience'),
                name: '体验课',
                meta: {
                    title: '体验课',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 1902,
                path: 'ended',
                component: _import('sale/experience/experience'),
                name: '已结束',
                meta: {
                    title: '已结束',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 1904,
                path: 'classmanageDetail',
                component: _import('sale/experience/classmanageDetail'),
                name: '班级详情',
                meta: {
                    title: '班级详情',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 1905,
                path: 'referrallist',
                component: _import('sale/namelist/referrallist'),
                name: '转介绍名单',
                meta: {
                    title: '转介绍名单',
                    icon: 'service'
                },
                // hidden: true
            },
            {
                menuId: 1906,
                path: 'registerlist',
                component: _import('sale/namelist/registerlist'),
                name: '最新登录名单',
                meta: {
                    title: '最新登录名单',
                    icon: 'service'
                },
                // hidden: true
            },
            {
                menuId: 101,
                path: 'salePermissionDo',
                component: _import('sale/salePermission/salePermissionDo/exampleNew'),
                name: '新例子',
                meta: {
                    title: '新例子',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 101,
                path: 'salePermissionDo1',
                component: _import('sale/salePermission/salePermissionDo/exampleNew'),
                name: '旧例子',
                meta: {
                    title: '旧例子',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 101,
                path: 'salePermissionDo2',
                component: _import('sale/salePermission/salePermissionDo/exampleNew'),
                name: '报废例子',
                meta: {
                    title: '报废例子',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 101,
                path: 'salePermissionDo3',
                component: _import('sale/salePermission/salePermissionDo/exampleNew'),
                name: '付费排课学生',
                meta: {
                    title: '付费排课学生',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 101,
                path: 'salePermissionDo4',
                component: _import('sale/salePermission/salePermissionDo/exampleNew'),
                name: '不续费学生',
                meta: {
                    title: '不续费学生',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 150,
                path: 'unStart',
                component: _import('sale/salePermission/salePermissionDo/exampleNew'),
                name: '未开始例子',
                meta: {
                    title: '未开始例子',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 101,
                path: 'exampleDetailStatic',
                component: _import('sale/exampleStatic/exampleDetailStatic/exampleDetailStatic'),
                name: '例子情况统计',
                meta: {
                    title: '例子情况统计',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 101,
                path: 'exampleConditionsearch',
                component: _import('sale/exampleConditionsearch/index'),
                name: '例子情况查询',
                meta: {
                    title: '例子情况查询',
                    icon: 'service'
                },
                hidden: false
            },
            {
                menuId: 101,
                path: 'exampleConditionsearch-detail',
                component: _import('sale/exampleConditionsearch/detail'),
                name: '例子情况查询-详情页',
                meta: {
                    title: '例子情况查询-详情页',
                    icon: 'service'
                },
                hidden: true
            }
        ]
    },
    {
        menuId: 200,
        path: '/channel',
        name: '渠道角色',
        component: Layout,
        redirect: '/channel/statistics',
        meta: {
            title: '渠道角色',
            icon: 'monitor'
        },
        children: [{
                menuId: 201,
                path: 'channelManage',
                component: _import('channel/channelManage/index'),
                name: '渠道管理',
                meta: {
                    title: '渠道管理',
                    icon: 'dept'
                }
            },
            {
                menuId: 210,
                path: 'statistics',
                component: _import('channel/statistics/index'),
                name: '渠道统计',
                meta: {
                    title: '渠道统计',
                    icon: 'service'
                }
            },
            {
                menuId: 220,
                path: 'externalDistribution',
                component: _import('channel/externalDistribution/index'),
                name: '外部例子分配',
                meta: {
                    title: '外部例子分配',
                    icon: 'service'
                }
            },
            {
                menuId: 210,
                path: 'channelDetail',
                component: _import('channel/statistics/channelDetail'),
                name: '渠道详情',
                meta: {
                    title: '渠道详情',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 210,
                path: 'channelTotal',
                component: _import('channel/statistics/channelTotal'),
                name: '渠道学生统计页',
                meta: {
                    title: '渠道学生统计页',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 210,
                path: 'studentStatus',
                component: _import('channel/studentStatus/index'),
                name: '学生状态页',
                meta: {
                    title: '渠道学生状态页',
                    icon: 'service'
                },
                hidden: true
            }
        ]
    }, {
        menuId: 1300,
        path: '/availabletime',
        name: '设置可用时间',
        component: Layout,
        redirect: '/teachers/evaluation',
        meta: {
            title: '常规课设置可用时间',
            icon: 'monitor'
        },
        children: [{
                menuId: 1301,
                path: 'availabletime',
                component: _import('teachers/evaluation/availabletime'),
                name: '设置可用时间',
                meta: {
                    title: '设置可用时间',
                    icon: 'service'
                }
            },
            {
                menuId: 99991,
                path: 'setCAvailabletime',
                component: _import('teachers/evaluation/setavailabletime'),
                name: '设置中教可用时间',
                meta: {
                    title: '设置中教可用时间',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 99992,
                path: 'setEAvailabletime',
                component: _import('teachers/evaluation/setavailabletime'),
                name: '设置外教可用时间',
                meta: {
                    title: '设置外教可用时间',
                    icon: 'service'
                },
                hidden: true
            }
        ]
    },
    {
        menuId: 400,
        path: '/applicationCenter',
        name: '应用中心',
        component: Layout,
        redirect: '/sale/salePermission',
        meta: {
            title: '应用中心',
            icon: 'monitor'
        },
        children: [{
                menuId: 190,
                path: 'applicationCenter',
                component: _import('sale/applicationCenter/applicationCenter'),
                name: '分销系统',
                meta: {
                    title: '分销系统',
                    icon: 'service'
                }
            },
            {
                menuId: 99991,
                path: 'setCAvailabletime',
                component: _import('teachers/evaluation/setavailabletime'),
                name: '设置中教可用时间',
                meta: {
                    title: '设置中教可用时间',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 99992,
                path: 'setEAvailabletime',
                component: _import('teachers/evaluation/setavailabletime'),
                name: '设置外教可用时间',
                meta: {
                    title: '设置外教可用时间',
                    icon: 'service'
                },
                hidden: true
            }
        ]
    },
    {
        menuId: 600,
        path: '/workorder',
        name: '工单部分',
        component: Layout,
        redirect: '/financemanage/index',
        meta: {
            title: '工单部分',
            icon: 'monitor'
        },
        children: [{
                menuId: 612,
                path: 'financemanage',
                component: _import('workorder/financemanage/index'),
                name: '财务工单管理',
                meta: {
                    title: '财务工单管理',
                    icon: 'service'
                }
            }, {
                menuId: 613,
                path: 'financedetails',
                component: _import('workorder/financemanage/details'),
                name: '财务工单管理>详情',
                meta: {
                    title: '财务工单管理',
                    icon: 'service'
                },
                hidden: true
            }, {
                menuId: 621,
                path: 'educationmanage',
                component: _import('workorder/educationmanage/index'),
                name: '教务工单管理',
                meta: {
                    title: '教务工单管理',
                    icon: 'service'
                }
            }, {
                menuId: 622,
                path: 'educationdetail',
                component: _import('workorder/educationmanage/details'),
                name: '教务工单详情',
                meta: {
                    title: '教务工单详情',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 640,
                path: 'returnorder',
                component: _import('workorder/returnorder/index'),
                name: '退课工单',
                meta: {
                    title: '退课工单',
                    icon: 'service'
                },

            },
            {
                menuId: 642,
                path: 'returncomfirm',
                component: _import('workorder/returnorder/comfirmlist'),
                name: '退课审核',
                meta: {
                    title: '退课审核',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 643,
                path: 'returndetail',
                component: _import('workorder/returnorder/returndetail'),
                name: '退课待审核详情',
                meta: {
                    title: '退课待审核详情',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 643,
                path: 'returnbills',
                component: _import('workorder/returnorder/billList'),
                name: '退课工单列表',
                meta: {
                    title: '退课工单列表',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 643,
                path: 'returnbillsdetail',
                component: _import('workorder/returnorder/billListdetail'),
                name: '退课工单详情',
                meta: {
                    title: '退课工单详情',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 650,
                path: 'freeorder',
                component: _import('workorder/freeorder/index'),
                name: '赠课工单',
                meta: {
                    title: '赠课工单',
                    icon: 'service'
                },

            },
            {
                menuId: 652,
                path: 'freecomfirmlist',
                component: _import('workorder/freeorder/comfirmlist'),
                name: '赠课审核',
                meta: {
                    title: '赠课审核',
                    icon: 'service'
                },
                hidden: true
            },

            {
                menuId: 653,
                path: 'freedetail',
                component: _import('workorder/freeorder/freedetail'),
                name: '赠课待审核详情',
                meta: {
                    title: '赠课待审核详情',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 653,
                path: 'freebills',
                component: _import('workorder/freeorder/billList'),
                name: '赠课工单列表',
                meta: {
                    title: '赠课工单列表',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 653,
                path: 'freebillsdetail',
                component: _import('workorder/freeorder/billListdetail'),
                name: '赠课工单详情',
                meta: {
                    title: '赠课工单详情',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 660,
                path: 'stoporder',
                component: _import('workorder/stoporder/index'),
                name: '停课工单',
                meta: {
                    title: '停课工单',
                    icon: 'service'
                },

            },
            {
                menuId: 661,
                path: 'stopconfirm',
                component: _import('workorder/stoporder/comfirmlist'),
                name: '停课工单待审核',
                meta: {
                    title: '停课工单待审核',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 662,
                path: 'stopdetail',
                component: _import('workorder/stoporder/stopdetail'),
                name: '停课待审核详情',
                meta: {
                    title: '停课待审核详情',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 662,
                path: 'stopbills',
                component: _import('workorder/stoporder/billList'),
                name: '停课工单列表',
                meta: {
                    title: '停课工单列表',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 662,
                path: 'stopbillsdetail',
                component: _import('workorder/stoporder/billListdetail'),
                name: '停课工单详情',
                meta: {
                    title: '停课工详情',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 800,
                path: 'buyorder',
                component: _import('workorder/buyorder/index'),
                name: '购课工单',
                meta: {
                    title: '购课工单',
                    icon: 'service'
                }
            }, {
                menuId: 812,
                path: 'confirm',
                component: _import('workorder/tobeconfirm/index'),
                name: '待审核',
                meta: {
                    title: '待审核',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 814,
                path: 'orderlistdetail',
                component: _import('workorder/buyorder/orderlistdetail'),
                name: '购课待审核详情',
                meta: {
                    title: '购课待审核详情',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 815,
                path: 'billList',
                component: _import('workorder/buyorder/billList'),
                name: '购课工单列表',
                meta: {
                    title: '购课工单列表',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 816,
                path: 'billListdetail',
                component: _import('workorder/buyorder/billListdetail'),
                name: '购课工单详情',
                meta: {
                    title: '购课工单详情',
                    icon: 'service'
                },
                hidden: true
            },

            {
                menuId: 821,
                path: 'sethandle',
                component: _import('workorder/buyorder/sethandle'),
                name: '教务排班操作',
                meta: {
                    title: '教务排班操作',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 801,
                path: 'renewal',
                component: _import('workorder/renewal/index'),
                name: '续课工单',
                meta: {
                    title: '续课工单',
                    icon: 'service'
                }
            },
            {
                menuId: 841,
                path: 'renewalcomfirmlist',
                component: _import('workorder/renewal/comfirmlist'),
                name: '续课待审核',
                meta: {
                    title: '续课审核',
                    icon: 'service'
                },
                hidden: true
            },

            {
                menuId: 842,
                path: 'renewaldetail',
                component: _import('workorder/renewal/renewaldetail'),
                name: '续课待审核详情',
                meta: {
                    title: '续课待审核详情',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 842,
                path: 'handle',
                component: _import('workorder/renewal/handle'),
                name: '续课工单操作',
                meta: {
                    title: '续课工单操作',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 842,
                path: 'renewalbills',
                component: _import('workorder/renewal/billList'),
                name: '续课工单类表',
                meta: {
                    title: '续课工单类表',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 842,
                path: 'renewalbillsdetail',
                component: _import('workorder/renewal/billListdetail'),
                name: '续课工单详情',
                meta: {
                    title: '续课工单详情',
                    icon: 'service'
                },
                hidden: true
            }
        ]
    },
    {
        menuId: 667600,
        path: '/goodsmanage',
        name: '商品管理',
        component: Layout,
        redirect: '/goodsmanage/list',
        meta: {
            title: '商品管理',
            icon: 'monitor'
        },
        children: [{
                menuId: 667612,
                path: 'list',
                component: _import('goodsmanage/list'),
                name: '列表',
                meta: {
                    title: '商品管理 列表',
                    icon: 'service'
                }
            },
            {
                menuId: 667612,
                path: 'add',
                component: _import('goodsmanage/add'),
                name: '新增',
                meta: {
                    title: '商品管理 新增',
                    icon: 'service'
                },
                hidden: true
            },
            {
                menuId: 667612,
                path: 'edit',
                component: _import('goodsmanage/edit'),
                name: '编辑',
                meta: {
                    title: '商品管理 编辑',
                    icon: 'service'
                },
                hidden: true
            },
        ]
    }
];
