import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/admin/user/userPage',
    method: 'get',
    params: query
  })
}

export function checkOldUser(phone) {
  return request({
    url: '/admin/user/findUserByMobile/' + phone,
    method: 'get'
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/user/install',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj(obj) {
  return request({
    url: '/admin/user',
    method: 'put',
    data: obj
  })
}

//根据部门id查询用户列表
export function getUserList(query) {
  return request({
    url: '/admin/user/query/users/byDeptIds',
    method: 'get',
    params: query
  })
}

//重置密码
export function resetPassword(data) {
  return request({
    url: '/admin/user/resetPasswd/'+data,
    method: 'post',
  })
}
