import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/mms/log/logPage',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return request({
    url: '/mms/log/' + id,
    method: 'delete'
  })
}

export function addObj(obj) {
  return request({
    url: '/admin/user/',
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

export function putObj(obj) {
  return request({
    url: '/admin/user/',
    method: 'put',
    data: obj
  })
}
