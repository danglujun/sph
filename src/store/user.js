import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}

const actions = {
  // 获取验证码
  async getCode({ commit }, phone) {
    let res = await reqGetCode(phone)
    if (res.code == 200) {
      commit('GETCODE', res.data)
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 用户注册
  async userRegister(user) {
    let res = await reqUserRegister(user)
    if (res.code == 200) {
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 用户登录
  async userLogin({ commit }, data) {
    let res = await reqUserLogin(data)
    // 服务器下发token
    if (res.code == 200) {
      commit('USERLOGIN', res.data.token)
      // 持久化存储token
      setToken(res.data.token)
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 获取用户信息
  async getUserInfo({ commit }) {
    let res = await reqUserInfo()
    if (res.code == 200) {
      commit('GETUSERINFO', res.data)
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 退出登录
  async logout({ commit }) {
    let res = await reqLogout()
    if (res.code == 200) {
      commit('LOGOUT')
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  }
}

const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo
  },
  LOGOUT(state) {
    state.userInfo = ''
    state.token = ''
    removeToken()
  }
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
