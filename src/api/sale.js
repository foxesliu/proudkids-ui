import request from '@/utils/request'

// 手动添加例子
export function exaManualAdd(obj) {
  return request({
    url: '/ruser/v1/ruserChannel/install',
    method: 'post',
    data: obj
  })
}

// 例子流转
export function exaFlow(obj) {
  return request({
    url: '/ruser/v1/ruserChannel/circulation',
    method: 'post',
    data: obj
  })
}

// 新/旧/报废
export function exaCheckAll(query) {
  return request({
    url: '/ruser/v1/ruserChannel/query/bills',
    method: 'get',
    params: query
  })
}

//付费排课例子查询
export function exaCheckPay(query) {
  return request({
    url: '/ruser/v1/ruserChannel/query/pay/bills',
    method: 'get',
    params: query
  })
}

//不续费例子查询
export function exaCheckFree(query) {
  return request({
    url: '/ruser/v1/ruserChannel/query/renews/bills',
    method: 'get',
    params: query
  })
}

//销售权限后台统计
export function saleStatistics(query) {
  return request({
    url: '/ruser/v1/ruserChannel/query/sell/bills/statistics',
    method: 'get',
    params: query
  })
}

//班级类型名称查询
export function checkClassType(query) {
  return request({
    url: '/aom/classType/items',
    method: 'get',
    params: query
  })
}

//提醒例子的例子数
export function checkRemindNum(query) {
  return request({
    url: '/sales/v1/bills/statistics/remind/bills',
    method: 'get',
    params: query
  })
}

//提醒联系例子列表
export function checkREmindList(query) {
  return request({
    url: '/sales/v1/bills/query/bills/byRemind',
    method: 'get',
    params: query
  })
}

//例子查询中心
export function exaSearchCenter(query) {
  return request({
    url: '/ruser/v1/ruserChannel/center/query/bills',
    method: 'get',
    params: query
  })
}

//例子情况统计1
export function exaStatistics1(query) {
  return request({
    url: '/ruser/v1/ruserChannel/statistics',
    method: 'get',
    params: query
  })
}


//例子情况统计2

export function exaStatistics2(query) {
  return request({
    url: '/ruser/v1/ruserChannel/query/kindof/Bills',
    method: 'get',
    params: query
  })
}

//渠道来源统计
export function exaStatistics3(query) {
  return request({
    url: '/ruser/v1/ruserChannel/query/channelCount/ofBills',
    method: 'get',
    params: query
  })
}

//付费例子统计
export function exaStatistics4(query) {
  return request({
    url: '/ruser/v1/ruserChannel/CountBillByOrders',
    method: 'get',
    params: query
  })
}

//获取所有渠道
export function getAllChannel() {
  return request({
    url: '/sales/v1/channel/query/all/channel',
    method: 'get'
  })
}

//根据权限查询渠道
export function getChannelByAuthor(roleId, userId) {
  return request({
    url: '/sales//v1/channel',
    method: 'get',
    params: {
      roleId: roleId, userId: userId
    }
  })
}


//在线订单
export function payGoods() {
  return request({
    url: '/pay/v1/payGoods/list',
    method: 'get'
  })
}

//订单查询
export function getOrderList(query) {
  return request({
    url: '/sales/ruser-orders/selectOrders',
    method: 'get',
    params: query
  })
}

//在线订单查询
export function payOrdersQueryOrder(query) {
  return request({
    url: '/pay/v1/payOrders/query/order',
    method: 'get',
    params: query
  })
}

//核销订单查询
export function ruserOrdersSelectOrders(query) {
  return request({
    url: '/sales/ruser-orders/selectOrders',
    method: 'get',
    params: query
  })
}

//商品列表查询
export function payGoodsList() {
  return request({
    url: '/pay/v1/payGoods/list',
    method: 'get'
  })
}

//根据父级ID查询子集 GET
export function queryInviteBills(ruserId, channelName) {
  return request({
    url: '/ruser/v1/ruserChannel/query/inviteBills/byPid/' + ruserId + '/' + channelName,
    method: 'get',
  })
}

//分销查询

export function queryInviteList(query) {
  return request({
    url: '/ruser/v1/ruserChannel/query/inviteBills',
    method: 'get',
    params: query
  })
}

//渠道查询

export function queryChannel() {
  return request({
    url: '/sales/v1/channel/query/all/channel',
    method: 'get'
  })
}

//获取体验课数量
export function getExperienceCount(query) {
  return request({
    url: '/aom/classRuserDetail/count',
    method: 'get',
    params: query
  })
}

//学生体验课查询
export function queryExperienceList(query) {
  return request({
    url: '/aom/classRuserDetail/experience',
    method: 'get',
    params: query
  })
}

//转介绍名单查询
export function queryRuserChannel(query) {
  return request({
    url: '/ruser/v1/ruserChannel/page',
    method: 'get',
    params: query
  })
}

//注册登陆查询
export function queryLoginLog(query) {
  return request({
    url: '/mms/ruserLoginLog/page',
    method: 'get',
    params: query
  })
}

