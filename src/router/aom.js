//张三丰的路由开始

import Layout from '../views/layout/Layout'

const _import = require('./_import_' + process.env.NODE_ENV)

export const sfRouter = {
    menuId: 160100,
    path: '/aom',
    name: '教务角色',
    component: Layout,
    redirect: '/aom/coursemanage-index',
    hidden: false,
    meta: {
        title: '课程管理',
        icon: 'monitor'
    },
    children: [{
            menuId: 160200,
            path: 'coursemanage-index',
            component: _import('aom/coursemanage/course'),
            name: '课程包管理',
            meta: { title: '课程包管理', icon: 'service' },
            hidden: false,
        },
        {
            menuId: 160300,
            path: 'coursemanage-ing',
            component: _import('aom/coursemanage/courseing'),
            name: '进行中的课程',
            meta: { title: '进行中的课程', icon: 'service' },
            hidden: true,
        },
        {
            menuId: 160400,
            path: 'coursemanage-ed',
            component: _import('aom/coursemanage/courseed'),
            name: '过期的课程',
            meta: { title: '过期的课程', icon: 'service' },
            hidden: true,
        },
        {
            menuId: 160500,
            path: 'coursemanage-lessonlist',
            component: _import('aom/coursemanage/lessonlist'),
            name: '进行中的课程列表',
            meta: { title: '进行中的课程列表', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 160700,
            path: 'coursemanage-addlesson',
            component: _import('aom/coursemanage/lessonadd'),
            name: '新增一个课节',
            meta: { title: '新增一个课节', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 160800,
            path: 'coursemanage-editlesson',
            component: _import('aom/coursemanage/lessonedit'),
            name: '编辑课节',
            meta: { title: '编辑课节', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 160800,
            path: 'coursemanage-question',
            component: _import('aom/coursemanage/question'),
            name: '题目列表',
            meta: { title: '题目列表', icon: 'service', noCache: false },
            hidden: true
        },
        {
            menuId: 160800,
            path: 'coursemanage-edit',
            component: _import('aom/coursemanage/editpage'),
            name: '编辑题目',
            meta: { title: '编辑题目', icon: 'service', noCache: false },
            hidden: true
        },
        {
            menuId: 160800,
            path: 'coursemanage-message',
            component: _import('aom/coursemanage/message'),
            name: '精美文字',
            meta: { title: '精美文字', icon: 'service', noCache: false },
            hidden: true
        },
        {
            menuId: 163500,
            path: 'coursemanage-beforeclass',
            component: _import('aom/coursemanage/beforeclass'),
            name: '预习材料',
            meta: { title: '预习材料', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 163600,
            path: 'coursemanage-afterclass',
            component: _import('aom/coursemanage/afterclass'),
            name: '复习材料',
            meta: { title: '复习材料', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 160900,
            path: 'classtype',
            component: _import('aom/classtype/index'),
            name: '班级类型',
            meta: { title: '班级类型', icon: 'service', noCache: false, hidden: true },
            hidden: false
        },
        {
            menuId: 161000,
            path: 'classtype-list',
            component: _import('aom/classtype/list'),
            name: '班级类型列表',
            meta: { title: '班级类型列表', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 161100,
            path: 'classtype-add',
            component: _import('aom/classtype/add'),
            name: '新增班级类型',
            meta: { title: '新增班级类型', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 161200,
            path: 'classtype-edit',
            component: _import('aom/classtype/edit'),
            name: '编辑课件',
            meta: { title: '编辑课件', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 160600,
            path: 'classtype-course',
            component: _import('aom/classtype/course'),
            name: '查看课件',
            meta: { title: '查看课件', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 161300,
            path: 'classmanage',
            component: _import('aom/classmanage/index'),
            name: '班级管理',
            meta: { title: '班级管理', icon: 'service', noCache: false, hidden: true },
            hidden: false
        },
        {
            menuId: 161400,
            path: 'classmanage-add',
            component: _import('aom/classmanage/add'),
            name: '添加班级',
            meta: { title: '添加班级', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 161500,
            path: 'classmanage-list',
            component: _import('aom/classmanage/list'),
            name: '班级管理列表',
            meta: { title: '班级管理列表', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 161600,
            path: 'classmanage-detail',
            component: _import('aom/classmanage/detail'),
            name: '班级详情 ',
            meta: { title: '班级详情 ', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 161700,
            path: 'classmanage-course',
            component: _import('aom/classmanage/course'),
            name: '课件列表',
            meta: { title: '课件列表', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 161800,
            path: 'classmanage-user-classsituation',
            component: _import('aom/classmanage/user-classsituation'),
            name: '学生上课情况 ',
            meta: { title: '学生上课情况 ', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 161820,
            path: 'classmanage-user-classsituation-beforeclass',
            component: _import('aom/classmanage/user-classsituation-beforeclass'),
            name: '预习材料 ',
            meta: { title: '预习材料 ', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 161810,
            path: 'classmanage-user-classsituation-evaluation',
            component: _import('aom/classmanage/user-classsituation-evaluation'),
            name: '查看评价 ',
            meta: { title: '查看评价 ', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 161900,
            path: 'user-detail',
            component: _import('aom/classmanage/user-detail'),
            name: '用户详情 ',
            meta: { title: '用户详情 ', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 162000,
            path: 'single-student-change-teacher',
            component: _import('aom/classmanage/single-student-change-teacher'),
            name: '单个学生换老师',
            meta: { title: '单个学生换老师', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 162100,
            path: 'single-student-change-teacher-result',
            component: _import('aom/classmanage/single-student-change-teacher-result'),
            name: '单个学生换老师-结果页',
            meta: { title: '单个学生换老师-结果页', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 162200,
            path: 'class-change-teacher',
            component: _import('aom/classmanage/class-change-teacher'),
            name: '班级更换老师',
            meta: { title: '班级更换老师', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 162300,
            path: 'class-change-teacher-result',
            component: _import('aom/classmanage/class-change-teacher-result'),
            name: '班级更换老师-结果页',
            meta: { title: '班级更换老师-结果页', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 162400,
            path: 'replaceclass',
            component: _import('aom/replaceclass/index'),
            name: '替换课程',
            meta: { title: '替换课程', icon: 'service', noCache: false, hidden: true },
            hidden: false
        },
        {
            menuId: 162500,
            path: 'evaluate',
            component: _import('aom/evaluate/index'),
            name: '评语管理',
            meta: { title: '评语管理', icon: 'service', noCache: false, hidden: true },
            hidden: false
        },
        {
            menuId: 162600,
            path: 'evaluate-detail',
            component: _import('aom/evaluate/detail'),
            name: '评语详情',
            meta: { title: '评语详情', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 162700,
            path: 'missedlist',
            component: _import('aom/missedlist/index'),
            name: '补课名单',
            meta: { title: '补课名单', icon: 'service', noCache: false, hidden: true },
            hidden: false
        },
        {
            menuId: 162800,
            path: 'stoplist',
            component: _import('aom/stoplist/index'),
            name: '停课名单 ',
            meta: { title: '停课名单 ', icon: 'service', noCache: false, hidden: true },
            hidden: false
        },
        {
            menuId: 162850,
            path: 'stoplist-list',
            component: _import('aom/stoplist/list'),
            name: '停课名单列表页',
            meta: { title: '停课名单列表页', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 162860,
            path: 'arrangeclass',
            component: _import('aom/stoplist/arrangeclass'),
            name: '排课',
            meta: { title: '排课', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 162900,
            path: 'class-situation',
            component: _import('aom/classmanage/class-situation'),
            name: '课程情况',
            meta: { title: '课程情况', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 163000,
            path: 'holiday',
            component: _import('aom/holiday/holiday'),
            name: '申请假期',
            meta: { title: '申请假期', icon: 'service', noCache: false, hidden: true },
            hidden: false
        },
        {
            menuId: 163100,
            path: 'holiday-list',
            component: _import('aom/holiday/list'),
            name: '申请假期-列表页',
            meta: { title: '申请假期-列表页', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 163200,
            path: 'availabletime',
            component: _import('aom/availabletime/index'),
            name: '可用时间',
            meta: { title: '可用时间', icon: 'service', noCache: false, hidden: true },
            hidden: false
        },
        {
            menuId: 163300,
            path: 'availabletime-detail',
            component: _import('aom/availabletime/detail'),
            name: '可用时间-详情页',
            meta: { title: '可用时间-详情页', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            //教务权限
            menuId: 163400,
            path: 'availabletime-usable',
            component: _import('aom/availabletime/usable'),
            name: '中教池可用时间',
            meta: { title: '中教池可用时间', icon: 'service', noCache: false, hidden: true },
            hidden: true
        },
        {
            menuId: 160200,
            path: 'homeWorkAndPreview',
            component: _import('aom/homeWorkAndPreview/courseList'),
            name: '预习与作业',
            meta: { title: '预习与作业', icon: 'service' },
            hidden: false,
            hidden: true
        }
    ]
};
//张三丰的路由结束