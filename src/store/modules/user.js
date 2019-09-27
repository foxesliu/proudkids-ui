import {login, mobileLogin, logout, getInfo} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    phone: '',
    userId: '',
    deptId: '',
    avatar: '',
    permissions: [],
    roles: [],
    roleIds: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_REFRESH_TOKEN: (state, rfToken) => {
      state.refresh_token = rfToken
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_ID: (state, userId) => {
      state.userId = userId
    },
    SET_DEPT_ID: (state, deptId) => {
      state.deptId = deptId
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_ROLEIDS: (state, roleIds) => {
      state.roleIds = roleIds
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions
    }
  },

  actions: {
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password, userInfo.randomStr, userInfo.code).then(response => {
          const data = response.data
          console.log(data)
          setToken(data.access_token)
          commit('SET_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 手机登录
    MobileLogin({commit}, userInfo) {
      const mobile = userInfo.mobile.trim()
      return new Promise((resolve, reject) => {
        mobileLogin(mobile, userInfo.smsCode).then(response => {
          const data = response.data
          setToken(data.access_token)
          commit('SET_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 手机登录
    SocialLogin({commit}, params) {
      return new Promise((resolve, reject) => {
        setToken(params.access_token)
        commit('SET_TOKEN', params.access_token)
        commit('SET_REFRESH_TOKEN', params.refresh_token)
        resolve()
      })
    },
    // 获取用户信息
    GetInfo({commit, state}) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data.data
          commit('SET_ROLES', data.roles)
          commit('SET_ROLEIDS', data.roleIds)
          commit('SET_NAME', data.sysUser.name)
          commit('SET_PHONE', data.sysUser.phone)
          commit('SET_ID', data.sysUser.userId)
          commit('SET_DEPT_ID', data.sysUser.deptId)
          commit('SET_AVATAR', data.sysUser.avatar)
          commit('SET_INTRODUCTION', data.sysUser.introduction)
          const permissions = {}
          for (let i = 0; i < data.permissions.length; i++) {
            permissions[data.permissions[i]] = true
          }
          commit('SET_PERMISSIONS', permissions)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout(state.token, state.refresh_token).then(() => {
          sessionStorage.clear()
          commit('SET_TOKEN', '')
          commit('SET_REFRESH_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRole({commit}, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data.data
          commit('SET_ROLES', data.role)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }


  }
}

export default user
