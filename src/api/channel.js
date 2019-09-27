import request from '@/utils/request'

//渠道统计
export function channelStatistics(query) {
    return request({
        url: '/sales/v1/channel/statistics/channelOfBills',
        method: 'get',
        params: query
    })
}

export function allChannel(query) {
    return request({
        url: '/sales/v1/channel/query/all/channel',
        method: 'get',
        params: query
    })
}

export function changeChannel(query) {
    return request({
        url: '/ruser/v1/ruserChannel/updateFirstREGChannel',
        method: 'post',
        params: query
    })
}

export function qianliaoChannelStatistics(userId, channelId, query) {
    return request({
        url: '/ruser/v1/ruserChannel/qianliao/channel/statistics/' + userId + '/' + channelId,
        method: 'get',
        params: query
    })
}

export function channelOfBillsCount(channelId, startSelectDate, endSelectDate) {
    return request({
        url: '/ruser/v1/ruserChannel/channelOfBillsCount/' + channelId,
        method: 'get',
        params: {
            startSelectDate: startSelectDate,
            endSelectDate: endSelectDate,
        }
    })
}

// ruserChannel/channelOfBillsCount/{channelId}

// /v1/channel/statistics/channelOfBills

//渠道详情
export function channelDetail(query) {
    return request({
        url: '/sales/v1/channel/query/BillsOfChannel',
        method: 'get',
        params: query
    })
}

//渠道添加
export function channelAdd(obj) {
    return request({
        url: '/sales/v1/channel/install',
        method: 'post',
        data: obj
    })
}

// /v1/ruserChannel/query/student/list/{channelId}
export function ruserChannelQueryStudentList(channelId, query) {
    return request({
        url: '/ruser/v1/ruserChannel/query/student/list/' + channelId,
        method: 'get',
        params: query
    })
}

//外部例子查询
export function externalCheck(query) {
    return request({
        url: '/sales/v1/bills/query/outside/bills',
        method: 'get',
        params: query
    })
}

//修改分配例子数
///v1/conf/update
export function externalUpdate(obj) {
    return request({
        url: '/sales/v1/conf/update/assignNum',
        method: 'post',
        data: obj
    });
}

export function getQueryChannelBillsCount(channelId, obj) {
    return request({
        url: '/ruser/v1/ruserChannel/queryChannelBillsCount/' + channelId,
        method: 'get',
        params: obj
    });
}