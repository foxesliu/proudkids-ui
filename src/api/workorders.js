import request from '@/utils/request'

// 审核购课工单
export function buyBills(userId, taskId, stat, params) {
    return request({
        url: '/bills/workflow/auditPurchase' + '/' + userId + '/' + taskId + '/' + stat,
        method: 'post',
        params: params
    })
}


// 审核赠课、退费、续费工单
export function typesBills(userId, taskId, stat, query) {
    return request({
        url: '/bills/workflow/auditGrc' + '/' + userId + '/' + taskId + '/' + stat,
        method: 'post',
        params: query
    })
}

// 审核停课工单
export function isStopBills(userId, taskId, stat, query) {
    return request({
        url: '/bills/workflow/auditSuspend' + '/' + userId + '/' + taskId + '/' + stat,
        method: 'post',
        params: query
    })
}


// 分页查看待审核购课工单
export function CheckConfirmBuyOrder(userId, billType, page, limit, obj) {
    return request({
        url: '/bills/workflow/purchaseList' + '/' + userId + '/' + billType + '/' + page + '/' + limit,
        method: 'get',
        params: obj
    })
}


// 分页查看待审核购课工单
export function CheckConfirmBill(userId, billType, page, limit,obj) {
    return request({
        url: '/bills/workflow/grcList' + '/' + userId + '/' + billType + '/' + page + '/' + limit,
        method: 'get',
        params: obj
    })
}
//分页查看停课工单
export function stopBills(userId, billType, page, limit) {
    return request({
        url: '/bills/workflow/suspendList' + '/' + userId + '/' + billType + '/' + page + '/' + limit,
        method: 'get',
        // query: obj
    })
}



// 查看待审核的赠课、退费、续费工单
export function ConfirmFreeBackRenewBill(userId, billType) {
    return request({
        url: '/bills/workflow/auditPurchase' + '/' + userId + '/' + billType,
        method: 'get',

    })
}


// 按财务、教务查询人员管理大区信息
export function UserTypeSearchList(type) {
    return request({
        url: '/bills/billsAuditConfig/list' + '/' + type,
        method: 'get',
        // query: obj
    })
}

// 根据userId查询大区管理详情
export function UserIdSearchList(userId) {
    return request({
        url: '/bills/billsAuditConfig/detail' + '/' + userId,
        method: 'get',
        // query: obj
    })
}

// 点击取消员工大区管理
export function removeAuthority(id) {
    return request({
        url: '/bills/billsAuditConfig/delete' + '/' + id,
        method: 'delete',
        // query: obj
    })
}

// 点击添加员工大区管理
export function addAutority(query) {
    return request({
        url: '/bills/billsAuditConfig/add',
        method: 'post',
        data: query
    })
}



// 分页查看工单列表
export function CheckWorkOrder(query) {
    return request({
        url: '/bills/billsFlowHistory/billPage',
        method: 'get',
        params: query
    })
}

// 根据userId、type查询不同类型工单数目
export function ListNums(userId, type) {
    return request({
        url: '/bills/billsFlowHistory/list' + '/' + userId + '/' + type,
        method: 'get',
        // data: obj
    })
}



// 查看工单详情接口
export function BillsDetails(billsFlowId) {
    return request({
        url: '/bills/billsFlowHistory' + '/' + billsFlowId,
        method: 'get',
        // query: obj
    })
}