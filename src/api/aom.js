import request from '@/utils/request';

/*************************************************************
 * 课程管理 开始
 */

/**
 * 根据类型获取课程的课件数量
 * @param type =》进行中1，已过期0
 */
export function courseCount(type) {
    return request({
        url: '/aom/course/count?status=' + type,
        method: 'get'
    });
}

/**
 * 根据类型获取课程的课件列表
 * @param type =》进行中1，已过期0
 */
export function getCourseListByStatus(type) {
    return request({
        url: '/aom/course?status=' + type,
        method: 'get'
    });
}

/**
 * 新增课程
 * @param obj =》 {name:'123'...}
 */
export function addCourse(obj) {
    return request({
        url: '/aom/course/',
        method: 'post',
        data: obj
    });
}

/**
 * 修改课程
 * @param obj 比如关闭课程{courseId:0,status:1}
 */
export function editCourse(obj) {
    return request({
        url: '/aom/course/',
        method: 'put',
        data: obj
    });
}

/**
 * 根据填写信息对课程相关属性进行修改
 * @param courseId
 * @param status
 */
export function setCourseStatus(courseId, status) {
    return request({
        url: '/aom/course',
        method: 'put',
        data: { courseId: courseId, status: status }
    });
}

/*************************************************************
 * 课程管理 结束
 */

/*************************************************************
 * lesson管理 开始
 */

/**
 * 通过courseId查询该课程的lesson信息
 * @param courseId
 */
export function findByCourseId(courseId) {
    return request({
        url: '/aom/lesson/findByCourseId/' + courseId,
        method: 'get'
    });
}

/**
 * 根据lesson的id查询这一lesson以及相关课件的信息
 */
export function findLessonById(id) {
    return request({
        url: '/aom/lesson/' + id,
        method: 'get'
    });
}

/**
 * 新增一个课节Lesson
 * @param obj =>{courseId:courseId,...}
 */
export function addLesson(obj) {
    return request({
        url: '/aom/lesson/',
        method: 'post',
        data: obj
    });
}

/**
 * 根据LessonID获取lesson信息
 * @param lessonId
 */
export function getLessonById(lessonId) {
    return request({
        url: '/aom/lesson/' + lessonId,
        method: 'get'
    });
}

/**
 * 根据LessonID获取lesson信息
 * @param lessonId
 */
export function getLessonByIdType(lessonId, type) {
    return request({
        url: '/aom/lesson/coursewares/' + lessonId + '/' + type,
        method: 'get'
    });
}

/**
 * 编辑Lesson
 * @param lessonId
 * @param obj
 */
export function editLesson(lessonId, obj) {
    return request({
        url: '/aom/lesson/',
        method: 'put',
        data: obj
    });
}

/**
 * 课件上传
 * @param obj
 */
export function coursewareUpload(obj) {
    return request({
        url: '/aom/lesson/courseware/upload',
        method: 'post',
        data: obj
    });
}

/**
 * 课件删除
 * @param id
 */
export function courseDelete(id) {
    return request({
        url: '/aom/lesson/courseware/' + id,
        method: 'delete'
    });
}

/*************************************************************
 * lesson管理 结束
 */

/*************************************************************
 * 班级类型管理 开始
 */

/**
 * 查询班级类型的数量
 * @param status
 * @param type
 */
export function getClassTypeCountByStatusType(status, type) {
    return request({
        url: '/aom/classType/count',
        method: 'get',
        params: { status: status, type: type }
    });
}

/**
 * 班级类型items，下拉菜单
 * @param obj
 */
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
 * 班级类型检索
 * @param obj
 */
export function getClassType(obj) {
    return request({
        url: '/aom/classType',
        method: 'get',
        params: obj
    });
}

/**
 * 添加班级类型
 * @param obj
 */
export function addClassType(obj) {
    return request({
        url: '/aom/classType',
        method: 'post',
        data: obj
    });
}

/**
 * 编辑班级类型
 * @param obj
 */
export function editClassType(obj) {
    return request({
        url: '/aom/classType',
        method: 'put',
        data: obj
    });
}

/**
 * 新增非授课时间
 * @param obj
 */
export function addClassTypeRestConfig(obj) {
    return request({
        url: '/aom/classTypeRestConfig',
        method: 'post',
        data: obj
    });
}

/**
 * 删除非授课时间
 * @param id
 */
export function deleteClassTypeRestConfig(id) {
    return request({
        url: '/aom/classTypeRestConfig/' + id,
        method: 'delete'
    });
}

/**
 * 删除班级类型
 * @param classTypeId 根据ID删除
 */
export function deleteClassType(classTypeId) {
    return request({
        url: '/aom/classType/' + classTypeId,
        method: 'delete'
    });
}

/**
 * 班级类型查询（获取某一个班级类型）
 * @param classTypeId
 */
export function getOneClassType(classTypeId) {
    return request({
        url: '/aom/classType/' + classTypeId,
        method: 'get'
    });
}

/**
 * 班级类型Lesson列表查询
 * @param classTypeId
 */
export function getLessonSByClassTypeId(classTypeId) {
    return request({
        url: '/aom/classType/lessons',
        method: 'get',
        params: { classTypeId: classTypeId, page: 1, rows: 1000 }
    });
}

/*************************************************************
 * 班级类型管理 结束
 */

/*************************************************************
 * 班级管理 开始
 */

/**
 * 班级学生列表查询
 * @param classId
 */
export function getStudentsByClassId(classId) {
    return request({
        url: '/aom/classRuserRef/currentRusers/' + classId,
        method: 'get'
    });
}

/**
 * 根据班级id、学生id获取该班级所查询学生的信息
 * @param classId
 * @param ruserId
 */
export function getOneStudentInfoByClassIdRuserId(classId, ruserId) {
    return request({
        url: '/aom/classRuserRef/ruserInfo/' + classId + '/' + ruserId,
        method: 'get'
    });
}

/**
 * 班级个数统计
 * @param obj
 */
export function getClassesCount(obj) {
    return request({
        url: '/aom/classes/count',
        method: 'get',
        params: obj
    });
}

/**
 * 学生加入班级
 * @param obj
 */
export function joinClass(obj) {
    return request({
        url: '/aom/classRuserRef/joinClass',
        method: 'post',
        params: obj
    });
}

/**
 * 新增班级
 * @param obj
 */
export function addNewClass(obj) {
    return request({
        url: '/aom/classes',
        method: 'post',
        data: obj
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
 * 单个班级查询
 * @param classId
 */
export function getOneClass(classId) {
    return request({
        url: '/aom/classes/' + classId,
        method: 'get'
    });
}

/**
 * 班级信息修改
 * @param obj
 */
export function editOneClass(obj) {
    return request({
        url: '/aom/classes/',
        method: 'put',
        data: obj
    })
}

/**
 * 班级课节课件查询
 * @param classId
 */
export function getCourseListByClassId(classId, page, rows) {
    return request({
        url: '/aom/classes/coursewares',
        method: 'get',
        params: { classId: classId, page: page, rows: rows }
    });
}

/**
 * 班级更换老师
 * classId: classId,
 * chineseTutor: chineseTutor,
 * foreignTutor: foreignTutor,
 * fromDate: fromDate,
 * toChinese: toChinese,
 * toTutor: toTutor
 */
export function classChangeTutor(obj) {
    return request({
        url: '/aom/classes/changeTutor',
        method: 'post',
        params: obj
    });
}

/**
 * 班级换老师结果查看
 * @param id
 */
export function getInfoByClassReplaceTeacher(id) {
    return request({
        url: '/aom/classReplaceHistory/classChangeTutorResult/' + id,
        method: 'get'
    });
}

/**
 * 学生更换班级或老师
 */
export function studentReplaceClassOrTeacher(obj) {
    return request({
        url: '/aom/classRuserRef/changeRuserClass',
        method: 'post',
        params: obj
    });
}

export function getInfoByStudentReplaceTeacher(id) {
    return request({
        url: '/aom/classReplaceHistory/' + id,
        method: 'get'
    });
}

/**
 * 重新替课
 * @param reviseHistoryId
 * @param subTutorId
 */
export function classLessonReviseHistoryReSubTutor(reviseHistoryId, subTutorId) {
    return request({
        url: '/aom/classLessonReviseHistory/reSubTutor/',
        method: 'put',
        params: {
            reviseHistoryId: reviseHistoryId,
            subTutorId: subTutorId
        }
    })
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
 * 补课记录删除
 * @param id
 */
export function deleteClassLessonReviseHistory(id) {
    return request({
        url: '/aom/classLessonReviseHistory/' + id,
        method: 'delete'
    });
}

/**
 * 班级类型修改
 * @param obj
 */
export function changeClassType(obj) {
    return request({
        url: '/aom/classes/classType',
        method: 'put',
        params: obj
    });
}

/**
 * 班级名称修改
 * @param id
 * @param name
 */
export function changeClassName(id, name) {
    return request({
        url: '/aom/classes/' + id + '/' + name,
        method: 'put'
    });
}

/**
 * 班级移除学生
 */
export function classDeleteStudent(classId, ruserId, operatorId) {
    return request({
        url: '/aom/classes/student',
        method: 'delete',
        params: { classId: classId, ruserId: ruserId, operatorId: operatorId }
    });
}

/**
 * 班级替课
 * @param classLessonId
 * @param subTutorId
 */
export function classLessonDetailSubTutor(classLessonId, subTutorId) {
    return request({
        url: '/aom/classLessonDetail/subTutor',
        method: 'post',
        params: { classLessonId: classLessonId, subTutorId: subTutorId }
    });
}

/**
 * 班级补课
 * @param obj {lessonDetailId: lessonDetailId, lessonDate: lessonDate, timePoint: timePoint, tutorId: tutorId}
 */
export function lessonMake(obj) {
    return request({
        url: '/aom/classLessonReviseHistory/lessonMake',
        method: 'post',
        params: obj
    });
}

/**
 * 班级补课教师修改
 * @param obj
 */
export function historyLessonMake(obj) {
    return request({
        url: '/aom/classLessonReviseHistory/lessonMake',
        method: 'put',
        params: obj
    });
}

/**
 * EEO课节删除
 * @param id
 */
export function deleteEeoClass(id) {
    return request({
        url: '/aom/classLessonDetail/eeoClass/' + id,
        method: 'delete'
    });
}

/*************************************************************
 * 班级管理 结束
 */

/*************************************************************
 * 课程情况查询 开始
 */

/**
 * 班级课节查询
 * @param obj
 */
export function getLessonList(obj) {
    return request({
        url: '/aom/classLessonDetail/lessons',
        method: 'get',
        params: obj
    });
}

/**
 * 学生课节查询
 * @param ruserId
 * @param classId
 * @param type 0：待上课 1：已上课
 */
export function getAvailableLessons(ruserId, classId, type) {
    return request({
        url: '/aom/classRuserDetail/lessons',
        method: 'get',
        params: {
            ruserId: ruserId,
            classId: classId,
            type: type,
            page: 1,
            rows: 1000
        }
    });
}

/**
 * 根据学生班级关联id查询该学生的已上课情况（已消耗的课时）
 * @param refId
 */
export function getNoAvailableLessons(refId) {
    return request({
        url: '/aom/classRuserDetail/lessons',
        method: 'get',
        params: {
            refId: refId,
            page: 1,
            rows: 1000
        }
    });
}

/*************************************************************
 * 课程情况查询 结束
 */

/*************************************************************
 * 评价管理 开始
 */

/**
 * 查询评价的所有类别
 */
export function getEvaluationList() {
    return request({
        url: '/aom/evaluation/allType',
        method: 'get'
    });
}

/**
 * 获取某一评价内容分页
 * @param type_id
 */
export function getEvaluationSonList(type_id) {
    return request({
        url: '/aom/evaluation/page',
        method: 'get',
        params: {
            type_id: type_id,
            // page:page,
            // limit:limit
        }
    })
}

/**
 * 通过评价ID查询学生某节课程的评价
 * @param evaluateId
 * @constructor
 */
export function ruserEvaluation(evaluateId) {
    return request({
        url: '/aom/ruserLessonEvaluation/query/RuserEvaluation/' + evaluateId,
        method: 'get'
    })
}

/*************************************************************
 * 评价管理 结束
 */

/*************************************************************
 * 停课模块 开始
 */

/**
 * 停课单个数统计
 * @param obj
 */
export function getClassRuserSuspendCount(obj) {
    return request({
        url: '/aom/classRuserSuspend/count',
        method: 'get',
        params: obj
    });
}

/**
 * 停课单列表分页查询
 */
export function getClassRuserSuspend(obj) {
    return request({
        url: '/aom/classRuserSuspend',
        method: 'get',
        params: obj
    });
}

/*************************************************************
 * 停课模块 结束
 */

/*************************************************************
 * 申请假期 开始
 */

/**
 * 请假记录个数统计
 */
export function getTutorApplyHistoryCount(obj) {
    return request({
        url: '/aom/tutorApplyHistory/count',
        method: 'get',
        params: obj
    });
}

/**
 * 请假记录查询
 */
export function getTutorApplyHistory(obj) {
    return request({
        url: '/aom/tutorApplyHistory/page',
        method: 'get',
        params: obj
    });
}

/**
 * 处理状态修改
 * @param id
 * @param stat
 */
export function tutorApplyHistory(id, stat) {
    return request({
        url: '/aom/tutorApplyHistory/stat/' + id + '/' + stat,
        method: 'put'
    });
}

/*************************************************************
 * 申请假期 结束
 */

/*************************************************************
 * 可用时间班级查询 开始
 */

/**
 * 排课老师人数总体统计
 * @param obj
 */
export function classAssignStatistics(obj) {
    return request({
        url: '/aom/tutorUptime/classAssign/statistics',
        method: 'get',
        params: obj
    });
}

/**
 * 已排课老师列表
 */
export function assignedTutors(obj) {
    return request({
        url: '/aom/tutorUptime/timeslot/assignedTutors',
        method: 'get',
        params: obj
    });
}

/**
 * 未排课老师列表
 */
export function notAssignedTutors(obj) {
    return request({
        url: '/aom/tutorUptime/timeslot/notAssignedTutors',
        method: 'get',
        params: obj
    });
}

/*************************************************************
 * 可用时间班级查询 结束
 */

/*************************************************************
 * 教务可用时间处理 开始
 */

/**
 * 查询老师的可用时间
 */
export function tutorUptimeWeekPoint(weekPoint, userId, originTimeGe,type) {
    return request({
        url: '/aom/tutorUptime/' + weekPoint + '/' + userId + '?originTimeGe=' + originTimeGe+'&type='+type,
        method: 'get'
    });
}


/**
 * 将某个时间段设置为可用
 */
export function tutorUptimeAvailable(userId, availableTimeId) {
    return request({
        url: '/aom/tutorUptime/available/' + userId + '/' + availableTimeId,
        method: 'put'
    });
}

/**
 * 将老师的某个时间段设置为不可用
 */
export function tutorUptimeDisavailable(tutorUptimeId) {
    return request({
        url: '/aom/tutorUptime/disavailable/' + tutorUptimeId,
        method: 'put'
    });
}

/*************************************************************
 * 教务可用时间处理 结束
 */

/*************************************************************
 * 预习资料管理 开始
 */

/**
 * 获取课节下面的page列表
 */
export function lessonPreviewPreviewList(lessonId) {
    return request({
        url: '/aom/lessonPreview/previewList/' + lessonId,
        method: 'get'
    });
}

/**
 * lesson下面预习资料新增后保存
 */
export function addLessonPreview(obj) {
    return request({
        url: '/aom/lessonPreview',
        method: 'post',
        data: obj
    });
}

/**
 * lesson下面预习资料修改后保存
 */
export function editLessonPreview(obj) {
    return request({
        url: '/aom/lessonPreview',
        method: 'put',
        data: obj
    });
}

/**
 * 预习资料单个page删除
 * @param id
 */
export function deleteLessonPreview(id) {
    return request({
        url: '/aom/lessonPreview/' + id,
        method: 'delete'
    });
}

/**
 * 预习资料单个page查询
 */
export function getOneLessonPreview(id) {
    return request({
        url: '/aom/lessonPreview/' + id,
        method: 'get'
    });
}

export function uploadLessonPreview(obj) {
    return request({
        url: '/zuul/aom/lessonPreview/upload',
        method: 'post',
        data: obj
    });
}


/**
 * 预习资料excel导入
 */
export function excelImport(obj) {
    return request({
        url: '/aom/lessonPreview/excelImport ',
        method: 'post',
        data: obj
    });
}

/**
 * 获取学生课节下面的预习记录
 */
export function previewHistory(ruserId, lessonId) {
    return request({
        url: '/aom/lessonPreview/previewHistory/' + ruserId + '/' + lessonId,
        method: 'get'
    });
}

/**
 * 复习资料分页查询
 */
export function getLessonReview(lessonId, page, rows) {
    return request({
        url: '/aom/lessonReview/page',
        method: 'get',
        params: { lessonId: lessonId, page: page, rows: rows }
    });
}

/**
 *
 复习资料语音文件上传
 */
export function uploadLessonReview(file) {
    return request({
        url: '/aom/lessonReview/upload',
        method: 'post',
        data: file
    });
}

/**
 * 复习资料删除
 */
export function deleteLessonReview(id) {
    return request({
        url: '/aom/lessonReview/' + id,
        method: 'delete'
    });
}

/*************************************************************
 * 预习资料管理 结束
 */


/*************************************************************
 * 非柱子接口 开始
 */

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

/**
 * 根据deptID中外教课程列表
 * @param deptId 中教2 外教11
 */
export function getChTeacherLesson(query) {
    return request({
        url: '/aom/v1/tutor/tutor/list',
        method: 'get',
        params: query
    });
}

/**
 * 根据deptID中外教课程列表
 * @param deptId 中教2 外教11
 */
export function getTeacherDetails(query, type) {
    return request({
        url: '/aom/v1/tutor/tutor/Info/' + query + '/' + type,
        method: 'get',
    });
}

/**
 * 根据deptID中外教课程列表
 * @param deptId 中教2 外教11
 */
export function getTeacherCourses(query) {
    return request({
        url: '/aom/v1/tutor/teacher/classes/list',
        method: 'get',
        params: query
    });
}

/**
 * 根据班级老师查课节
 */
export function getCourseLessons(query) {
    return request({
        url: '/aom/v1/tutor/query/classlesson',
        method: 'get',
        params: query
    });
}

/**
 * 新增可提高课程
 */
export function addCourseLessons(query) {
    return request({
        url: '/aom/v1/courseEvaluationHistory',
        method: 'post',
        data: query
    });
}

/**
 * 更新教师资料
 */
export function editTeacherDetails(obj) {
    return request({
        url: '/aom/v1/tutor/edit',
        method: 'put',
        data: obj
    });
}

/**
 * 精彩/可提高课程查询
 */
export function getBrilliantCourses(userId, type, query) {
    return request({
        url: '/aom/v1/courseEvaluationHistory/history/' + userId + '/' + type,
        method: 'get',
        params: query
    });
}

/*************************************************************
 * 非柱子接口 结束
 */

/*************************************************************
 * 首页 消息中心 开始
 */

/**
 * 获取登录用户信息
 */
export function getUserInfo() {
    return request({
        url: '/admin/user/info',
        method: 'get'
    });
}

/**
 * 登录首页，统计待审核分类工单
 */
export function countIndexBill(userId) {
    return request({
        url: '/bills/billsFlowHistory/countIndexBill/' + userId,
        method: 'get'
    });
}

/**
 * 根据登录用户，查询消息
 */
export function mmsMessageLog(userId, roleId, page, limit) {
    return request({
        url: '/mms/mmsMessageLog/messageLogs/' + userId + '/' + roleId + '?page=' + page + '&limit=' + limit,
        method: 'get'
    });
}

/**
 * 根据登录用户，查询今天的消息
 */
export function mmsMessageLogToday(userId, roleId) {
    return request({
        url: '/mms/mmsMessageLog/messageLogs/today/' + userId + '/' + roleId,
        method: 'get'
    });
}

/**
 * 查询某个人的销售例子情况
 */
export function sellBillsStatistics(userIds) {
    return request({
        url: '/ruser/v1/ruserChannel/query/sell/bills/statistics',
        method: 'get',
        params: { userIds: userIds }
    });
}

/**
 * 停课工单 替课工单数量统计
 */
export function subAndMakeUpClass(userId) {
    return request({
        url: '/aom/classLessonReviseHistory/statistics/subAndMakeUpClass/' + userId,
        method: 'get'
    });
}

/*************************************************************
 * 首页 消息中心 结束
 */

/**
 * 反馈信息查询
 * @param query
 */
export function getFeedbacks(query) {
    return request({
        url: '/aom/feedback/feedbacks',
        method: 'get',
        params: query
    });
}

export function editFeedback(obj) {
    return request({
        url: '/aom/feedback',
        method: 'put',
        data: obj
    });
}

export function addFeedback(obj) {
    return request({
        url: '/aom/feedback',
        method: 'post',
        params: obj
    });
}

// 当天班级课节详情
export function classLessonDetailToday(startTimeStamp) {
    return request({
        url: '/aom/classLessonDetail/today',
        method: 'get',
        params: {
            startTimeStamp: startTimeStamp,
            page: 1,
            rows: 10000
        }
    });
}

// 商品管理
export function getPayGoodsList() {
    return request({
        url: '/pay/v1/payGoods/list',
        method: 'get'
    });
}

export function addPayGoods(obj) {
    return request({
        url: '/pay/v1/payGoods',
        method: 'post',
        data: obj
    });
}

export function editPayGoods(obj) {
    return request({
        url: '/pay/v1/payGoods',
        method: 'put',
        data: obj
    });
}

export function deletePayGoods(id) {
    return request({
        url: '/pay/v1/payGoods/' + id,
        method: 'delete'
    });
}

/*************************************************************
 * CMS 开始
 */

export function getCmsCate() {
    return request({
        url: '/admin/cmsArctype',
        method: 'get'
    });
}

export function editCmsCate(obj) {
    return request({
        url: '/admin/cmsArctype',
        method: 'put',
        data: obj
    });
}

export function addCmsCate(obj) {
    return request({
        url: '/admin/cmsArctype',
        method: 'post',
        data: obj
    });
}

export function delCmsCate(id) {
    return request({
        url: '/admin/cmsArctype/' + id,
        method: 'delete'
    });
}

export function getCmsFlag() {
    return request({
        url: '/admin/cmsFlag',
        method: 'get'
    });
}

export function getCmsArticle(obj) {
    return request({
        url: '/admin/cmsArticle/page',
        method: 'get',
        params: obj
    });
}

export function getOneCmsArticle(id) {
    return request({
        url: '/admin/cmsArticle/' + id,
        method: 'get'
    });
}

export function delOneCmsArticle(id) {
    return request({
        url: '/admin/cmsArticle/' + id,
        method: 'delete'
    })
}

export function editOneCmsArticle(obj) {
    return request({
        url: '/admin/cmsArticle',
        method: 'put',
        data: obj
    });
}

export function addCmsArticle(obj) {
    return request({
        url: '/admin/cmsArticle',
        method: 'post',
        data: obj
    });
}

export function generate() {
    return request({
        url: '/admin/generate',
        method: 'get'
    });
}


/*************************************************************
 * CMS 结束
 */

/*************************************************************
 * 例子统计 开始
 */
export function getActLogsChannels(obj) {
    return request({
        url: '/mms/actLogs/channels',
        method: 'get',
        params: obj
    });
}
export function getActLogsRuserCount(obj) {
    return request({
        url: '/mms/actLogs/ruserCount',
        method: 'get',
        params: obj
    });
};
/*************************************************************
 * 例子统计 结束
 */

/****************************
 * 作业预习
 *  */
export function addByPageNum(obj) {
    return request({
        url: '/apps/ph/lessonSection/addByPageNum',
        method: 'post',
        params: obj,
    });
};

/***************
 * 查询当前课节下题目列表和统计数据
 */
export function getLessonSectionByPamas(obj) {
    return request({
        url: '/apps/ph/lessonSection/getLessonSectionByPamas',
        method: 'get',
        params: obj,
    });
};

/***************
 * 增加页数
 */
export function addItem(obj) {
    return request({
        url: '/apps/ph/lessonSection/addItem',
        method: 'post',
        params: obj,
    });
};


/***************
 * 根据lessSecId查询题目详细内容
 */
export function questionDdtail(id) {
    return request({
        url: '/apps/ph/lessonSection/getSectionDetail?lessSecId=' + id,
        method: 'get',
    });
};

/***************
 * 上线
 */
export function upDateLesson(obj) {
    return request({
        url: '/apps/ph/lessonSection/updateLessonStat',
        method: 'post',
        params: obj,
    });
};

/*******
 * 更新题目类型
 */
export function upDateLessonType(obj) {
    return request({
        url: '/apps/ph/lessonSection/updateLessonType',
        method: 'post',
        params: obj,
    });
};
/*******
 * 删除题目页
 */
export function deleteLessonPage(id) {
    return request({
        url: '/apps/ph/lessonSection/deleteSection/' + id,
        method: 'delete'
    });
};
/*******
 * 获取素材库内容
 */
export function getMaterialsByType(obj) {
    return request({
        url: '/apps/ph/material/getMaterialsByType',
        method: 'get',
        params: obj,
    });
};
/*******
 * 上传素材
 */
export function uploadMaterial(obj) {
    return request({
        url: '/zuul/apps/ph/material/uploadMaterial',
        method: 'post',
        params: obj,
    });
};

/*******
 * 删除素材
 */
export function deleteMaterial(id) {
    return request({
        url: '/apps/ph/material/deleteMaterial/' + id,
        method: 'delete'
    });
};

/*******
 * 编辑题目内容
 */
export function editLessonId(id, data) {
    return request({
        url: '/apps/ph/lessonSectionContent/editByLessSecId?lessSecId=' + id,
        method: 'post',
        data: data,
    });
};

export function getText(obj) {
    return request({
        url: '/mms/ph/wonderfulWords/findByLessonId',
        method: 'get',
        params: obj,
    });
};

export function saveText(obj) {
    return request({
        url: '/mms/ph/wonderfulWords/saveOrUpdata',
        method: 'post',
        data: obj
    });
};