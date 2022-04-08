import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
  address: [],
  order: {}
}

const actions = {
  // 获取用户地址
  async getAddressInfo({ commit }) {
    let res = await reqAddressInfo()
    if (res.code == 200) {
      commit('GETADDRESSINFO', res.data)
    }
  },
  // 获取订单交易页信息
  async getOrderInfo({ commit }) {
    let res = await reqOrderInfo()
    if (res.code == 200) {
      commit('GETORDERINFO', res.data)
    }
  }
}

const mutations = {
  GETADDRESSINFO(state, address) {
    state.address = address
  },
  GETORDERINFO(state, order) {
    state.order = order
  }
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
