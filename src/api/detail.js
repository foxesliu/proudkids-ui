import request from '@/utils/request'

// 查询学生信息
export function ruserDetail(query) {
    return request({
        url: '/sales/ruser/ruserDetail',
        method: 'get',
        params: query
    })
}

// 编辑学生信息
export function editRuser(obj) {
    return request({
        url: '/sales/ruser/edit-ruser',
        method: 'post',
        data: obj
    })
}

// 行动日志
export function ruserAction(phone, obj) {
    return request({
        url: '/sales/ruser/ruser-action/' + phone,
        method: 'get',
        params: obj
    })
}

//工单日志
export function ruserOrdersFlow(phone, obj) {
    return request({
        url: '/sales/ruser-orders/flow/' + phone,
        method: 'get',
        params: obj
    })
}

//历史工单
export function ruserOrdersHistoryDetail(phone, flowId, obj) {
    return request({
        url: '/sales/ruser-orders/flow/audit-detail/' + phone + '/' + flowId,
        method: 'get',
        params: obj
    })
}

//編輯行動
export function editAct(obj) {
    return request({
        url: '/sales/ruser/ruser-action',
        method: 'post',
        params: obj
    })
}

// 流转日志
export function ruserFlow(phone, obj) {
    return request({
        url: '/sales/ruser/ruser-assign/' + phone,
        method: 'get',
        params: obj
    })
}

// 参加渠道
export function joinChannel(query) {
    return request({
        url: '/sales/ruser/ruser-channels',
        method: 'get',
        params: query
    })
}

// 邀请查询
export function viewInvitedSearch(query) {
    return request({
        url: '/sales/thirdparty/card/viewInvited',
        method: 'get',
        params: query
    })
}

// 获取每周上课时间表
export function getWeektimeItems(query) {
    return request({
        url: '/aom/classType/weektimeItems',
        method: 'get',
        params: query
    })
}

// 获取班级类型
export function getclassType(query) {
    return request({
        url: '/aom/classType/items',
        method: 'get',
        params: query
    })
}

//检查订单号
export function checkOrder(orderNo) {
    return request({
        url: '/sales/ruser-orders/checkOrder/' + orderNo,
        method: 'put'
    })
}
//购课
export function payClass(obj, classTypeId, orderType) {
    return request({
        url: '/sales/ruser-orders/insert-ruser-order?classTypeId=' + classTypeId + '&orderType=' + orderType,
        method: 'post',
        data: obj
    })
}

//续课
export function continuedCourse(phone, classId, obj) {
    return request({
        url: '/sales/ruser-orders/buyClassCourse/' + phone + '/' + classId,
        method: 'post',
        params: obj
    })
}

//赠课
export function presentCourse(phone, obj) {
    return request({
        url: '/sales/ruser-orders/presentCourse/' + phone + '/',
        method: 'post',
        params: obj
    })
}

//退课
export function refundCourse(phone, classId, obj) {
    return request({
        url: '/sales/ruser-orders/refundCourse/' + phone + '/' + classId,
        method: 'post',
        params: obj
    })
}



//班级详情
export function classInfo(id, obj) {
    return request({
        url: '/aom/classes/' + id,
        method: 'get',
        params: obj
    })
}

//班级学生列表查询
export function classRuserList(classId, obj) {
    return request({
        url: '/aom/classRuserRef/currentRusers/' + classId,
        method: 'get',
        params: obj
    })
}

//学生待上课
export function ruserAvailableClass(obj) {
    return request({
        url: '/aom/classRuserDetail/lessons/',
        method: 'get',
        params: obj
    })
}
//
// //学生已上课
// export function rusernoAvailableClass(obj) {
//   return request({
//     url: '/aom/classRuserRef/ruserLessons/noAvailable',
//     method: 'get',
//     params: obj
//   })
// }

//查询学生班级信息
export function ruserClassInfoList(phone, isCurrent, obj) {
    return request({
        url: '/aom/ruser-statistics/classes/' + phone + '/' + isCurrent,
        method: 'get',
        params: obj
    })
}



//查询某节课的评价
export function ruserLessonEvaluation(phone, id) {
    return request({
        url: '/aom/ruserLessonEvaluation/lesson/' + phone + '/' + id,
        method: 'get',
    })
}
export function checkLessonEvaluation(evaluateId) {
    return request({
        url: '/aom/ruserLessonEvaluation/query/RuserEvaluation/' + evaluateId,
        method: 'get',
    })
}

// 获取某一评价内容分页
export function evaluationPage(type_id) {
    return request({
        url: '/aom/evaluation/page/',
        method: 'get',
        params: { type_id: type_id }
    });
}

// 修改评价
export function editEvaluationPage(obj) {
    return request({
        url: '/aom/ruserLessonEvaluation',
        method: 'put',
        data: obj
    });
}

//添加评价
export function ruserEvaluation(obj) {
    return request({
        url: '/aom/ruserLessonEvaluation/',
        method: 'post',
        data: obj
    })
}

export function ruserOrdersAvailable(obj) {
    return request({
        url: '/sales/ruser-orders/available',
        method: 'put',
        params: obj
    })
}

// 根据学生ID查询学生参与的渠道
export function getChannelsByRuserid(ruserid, obj) {
    return request({
        url: '/sales/v1/channel/queryRuserJoinChannel/' + ruserid,
        method: 'get',
        params: obj
    });
}

// 根据学生ID查询邀请的人
export function getInviteByRuserid(ruserid, obj) {
    return request({
        url: '/ruser/v1/ruserChannel/queryInviteByRuserId/' + ruserid,
        method: 'get',
        params: obj
    });
}