import request from '@/utils/request'

//班级个数统计
export function getClassesCount(obj) {
  return request({
    url: '/aom/classes/count',
    method: 'get',
    params: obj
  });
}

/**
 * 班级信息检索
 * @param obj
 */
export function getClasses(obj) {
  return request({
    url: '/aom/classes',
    method: 'get',
    params: obj
  });
}

/**
 * 根据deptID获取外教
 * @param deptId 中教2 外教11
 */
export function getTeachersByDeptId(deptId) {
  return request({
    url: '/admin/dept/userDeptTree/' + deptId,
    method: 'get'
  });
}

//班级类型items，下拉菜单
export function getClassTypeItems(obj) {
  return request({
    url: '/aom/classType/items',
    method: 'get',
    params: obj
  });
}

/**
 * 每周上课时间
 */
export function getWeekTimeItems() {
  return request({
    url: '/aom/classType/weektimeItems',
    method: 'get'
  });
}

/**
 * 班级课节课件查询
 * @param classId
 */
export function getCourseListByClassId(classId, page, rows) {
  return request({
    url: '/aom/classes/coursewares',
    method: 'get',
    params: {classId: classId, page: page, rows: rows}
  });
}

/**
 * 替补课记录查询
 * @param obj
 */
export function classLessonReviseHistory(obj) {
  return request({
    url: '/aom/classLessonReviseHistory',
    method: 'get',
    params: obj
  });
}

/**
 * 停课
 * @param obj
 */
export function stopClassCourse(obj, phone) {
  return request({
    url: '/sales/ruser-orders/stopClassCourse/' + phone + '/',
    method: 'post',
    params: obj
  });
}


/**
 * 设置可用时间
 * @param obj
 */
export function availableTime(obj) {
  return request({
    url: '/aom/availableTime',
    method: 'post',
    data: obj
  });
}


/**
 * 查询可用时间
 * @param obj
 */
export function searchAvailableTime(obj) {
  return request({
    url: '/aom/availableTime/page',
    method: 'get',
    params: obj
  });
}

/**
 * 删除可用时间
 * @param obj
 */
export function deleteAvailableTime(id) {
  return request({
    url: '/aom/availableTime/' + id,
    method: 'DELETE'
  });
}

/**
 * 查询可用时间
 * @param obj
 */
export function tutorUptime(weekPoint, userId) {
  return request({
    url: '/aom/tutorUptime/' + weekPoint + '/' + userId,
    method: 'get'
  });
}


/**
 * 查询可用时间
 * @param obj
 */
export function tutorApplyHistory(obj) {
  return request({
    url: '/aom/tutorApplyHistory',
    method: 'post',
    data: obj
  });
}


export function getTutorApplyHistory(obj) {
  return request({
    url: '/aom/tutorApplyHistory/page',
    method: 'get',
    params: obj
  });
}

/**
 * 学生出席预习统计
 * @param obj
 */
export function studentAttendCount(obj) {
  return request({
    url: '/aom/classRuserDetail/studentAttendCount',
    method: 'get',
    params: obj
  });
}

/**
 * 学生出席预习情况查询
 * @param obj
 */
export function studentAttendInfo(obj) {
  return request({
    url: '/aom/classRuserDetail/studentAttendInfo',
    method: 'get',
    params: obj
  });
}

/**
 * 学生列表查询
 * @param obj
 */
export function ruserLessonList(obj) {
  return request({
    url: '/apps/phRuserLesson/page',
    method: 'get',
    params: obj
  });
}

/**
 * 学生额外布置查询
 * @param obj
 */
export function extraList(obj) {
  return request({
    url: '/apps/phRuserLesson/extra',
    method: 'get',
    params: obj
  });
}

/**
 * 给学生新增额外练习机会
 * @param obj
 */
export function extraTime(obj) {
  return request({
    url: '/apps/phRuserLesson/extra',
    method: 'post',
    params: obj
  });
}


/**
 * 预习作业统计数据查询
 * @param obj
 */
export function ruserStatistics(id) {
  return request({
    url: '/apps/phRuserLesson/' + id,
    method: 'get',
  });
}

/**
 * 评价模板
 * @param obj
 */
export function evaluateTemplate(obj) {
  return request({
    url: '/mms/commentTemplate',
    method: 'get',
    params: obj
  });
}


/**
 * 新增模板
 * @param obj
 */
export function addEvaluateTemplate(obj) {
  return request({
    url: '/mms/commentTemplate',
    method: 'post',
    data: obj
  });
}


/**
 * 删除模板
 * @param obj
 */
export function deleteTemplate(id) {
  return request({
    url: '/mms/commentTemplate/' + id,
    method: 'delete'
  });
}

/**
 * 学生信息修改
 * @param obj
 */
export function modifyStudentInfo(data) {
  return request({
    url: '/apps/phRuserLesson',
    method: 'put',
    data
  });
}

/**
 * 学生预习状态修改
 * @param obj
 */
export function modifyRuserLessonStat(params) {
  return request({
    url: '/apps/phRuserLesson/stat',
    method: 'put',
    params
  });
}

/**
 * 发送批注回复通知
 * @param obj
 */
export function responseNotice(params) {
  return request({
    url: '/apps/phRuserLesson/responseNotice',
    method: 'post',
    params
  });
}

/**
 * 发送批改报告通知
 * @param obj
 */
export function correctNotice(params) {
  return request({
    url: '/apps/phRuserLesson/correctNotice',
    method: 'post',
    params
  });
}


/**
 * 中教所发送的批注回复、批改报告消息历史记录
 * @param obj
 */
export function historyList(ruserLessonId, params) {
  return request({
    url: '/mms/ruserActionLog/historyMsgRecord/' + ruserLessonId,
    method: 'get',
    params
  });
}

/**
 * 预习作业章节列表
 * @param obj
 */
export function ruserLessonSectionList(ruserLessonId) {
  return request({
    url: '/apps/phRuserLessonSection/list/' + ruserLessonId,
    method: 'get'
  });
}


/**
 * 学生答题正误批改
 * @param obj
 */
export function ruserLessonCorrect(params) {
  return request({
    url: '/apps/phRuserLessonSection/correct',
    method: 'put',
    params
  });
}


/**
 * 老师对学生答题进行评分
 * @param obj
 */
export function ruserLessonScore(params) {
  return request({
    url: '/apps/phRuserLessonSection/score',
    method: 'put',
    params
  });
}


/**
 * 获取当前页列表数据
 * @param obj
 */
export function currentRuserLessonList(ruserLessId, sectionId) {
  return request({
    url: '/apps/phRuserLessonSection/content/' + ruserLessId + '/' + sectionId,
    method: 'get',
  });
}


/**
 * 当前页不同状态批注/提问数量
 * @param obj
 */
export function qaCount(ruserLessId, sectionId) {
  return request({
    url: '/apps/phRuserLessonSection/qaCount/' + ruserLessId + '/' + sectionId,
    method: 'get',
  });
}


/**
 * 当前页不同状态批注/提问数量
 * @param obj
 */
export function teacherQaCount(ruserLessId) {
  return request({
    url: '/apps/phRuserLesson/qaCount/' + ruserLessId,
    method: 'get',
  });
}

/**
 * 文件上传
 * @param obj
 */
export function upload(obj) {
  return request({
    url: '/apps/file/upload',
    method: 'post',
    data: obj
  });
}


/**
 * 文件上传
 * @param obj
 */
export function uploadImg(obj) {
  return request({
    url: '/zuul/apps/ph/material/uploadMaterial',
    method: 'post',
    data: obj
  });
}


/**
 * 新增批注
 * @param obj
 */
export function addQaResponse(obj) {
  return request({
    url: '/apps/phRuserLessonQa',
    method: 'post',
    data: obj
  });
}


/**
 * 回复批注
 * @param obj
 */
export function response(obj) {
  return request({
    url: '/apps/phRuserLessonQa/qaResponse',
    method: 'post',
    data: obj
  });
}


/**
 * 提问/批注内容详情列表查询
 * @param obj
 */
export function phRuserLessonQaList(obj) {
  return request({
    url: '/apps/phRuserLessonQa',
    method: 'get',
    params: obj
  });
}

/**
 * 批注提问内容列表
 * @param obj
 */
export function phRuserContentList(qaId) {
  return request({
    url: '/mms/ruserLessonQa/mms/contentList/' + qaId,
    method: 'get',
  });
}

/**
 * 获取学生头像
 * @param obj
 */
export function getRuserInfo(ruserId) {
  return request({
    url: '/ruser/v1/ruser/ruser-info/' + ruserId,
    method: 'get',
  });
}


/**
 * 学生预习作业信息修改
 * @param obj
 */
export function modifyRuserLesson(data) {
  return request({
    url: '/apps/phRuserLesson',
    method: 'put',
    data
  });
}


/**
 * 提问、批注确认已读提交
 * @param obj
 */
export function readStat(params) {
  return request({
    url: '/apps/phRuserLessonQa/readStat',
    method: 'put',
    params
  });
}


/**
 * 预习作业消息提醒
 * @param obj
 */
export function messageRemind(obj) {
  return request({
    url: '/mms/ruserLessonQa/mms/page',
    method: 'get',
    params: obj
  });
}

/**
 * 根据id获取提问、批注主要信息
 * @param obj
 */
export function pwDetail(id) {
  return request({
    url: '/apps/phRuserLessonQa/' + id,
    method: 'get'
  });
}


/**
 * 老师提示、学生作答内容提交
 * @param obj
 */
export function phRuserLessonAnswerContent(obj) {
  return request({
    url: '/apps/phRuserLessonAnswer/',
    method: 'post',
    data: obj
  });
}


/**
 * 获取code
 * @param obj
 */

export function code(obj) {
  return request({
    url: '/apps/wechat/qrcodeBase64',
    method: 'get',
    params: obj
  });
}

/**
 * 获取code
 * @param obj
 */

export function registRusers(obj) {
  return request({
    url: '/ruser/v1/ruserChannel/registRusers',
    method: 'get',
    params: obj
  });
}
