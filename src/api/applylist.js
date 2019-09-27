import request from '@/utils/request'

//外教简历列表
export function applyList(query) {
    return request({
        url: '/ruser/en/website/query/foreignTutor',
        method: 'get',
        params: query
    })
}
//当天班级上课详情
export function TclassLesson(query) {

    return request({
        url: '/aom/classLessonDetail/today',
        method: 'get',
        params: query
    })
}
//当天班级上课详情
export function makeUpCount(query) {
    return request({
        url: '/aom/classLessonReviseHistory/today/makeUpCount',
        method: 'get',
        params: query
    })
}