import { asyncRouterMap, constantRouterMap } from '@/router'
import { fetchUserTree } from '@/api/menu'

/**
 * 动态权限判断
 * @param menuIds  用户拥有的菜单列表
 * @param route   菜单选择
 * @returns {boolean}
 */
function hasPermission(menuIds, route) {
  let result = false
  //console.log(menuIds)
  //console.log(route)
  menuIds.filter(menuId => {
    //console.log('route.menuId：'+route.menuId)
    if (menuId === route.menuId) {
      result = true
    }
  })
  return result
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, menuIds) {
  //console.log(asyncRouterMap)
  const accessedRouters = asyncRouterMap.filter(route => {
    //console.log(route)
    if (hasPermission(menuIds, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, menuIds)
      }
      return true
    }
    return false
  })
  //console.log(accessedRouters)
  return accessedRouters
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      //console.log(routers)
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
      //console.log(state.routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        //console.log(data);
        const { roles } = data
        let accessedRouters
        fetchUserTree().then(response => {
          //console.log(response)
          if (roles.indexOf('admin') >= 0) {
            accessedRouters = asyncRouterMap
          } else {
            accessedRouters = filterAsyncRouter(asyncRouterMap, response.data)
          }
          commit('SET_ROUTERS', accessedRouters)
          resolve()
        })
      })
    }
  }
}

export default permission
