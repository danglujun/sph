import { reqSearchInfo } from '@/api'

const state = {
  searchInfo: {}
}

const actions = {
  async getSearchInfo({ commit }, params = {}) {
    let res = await reqSearchInfo(params)
    if (res.code === 200) {
      commit('GETSEARCHINFO', res.data)
    }
  }
}

const mutations = {
  GETSEARCHINFO(state, searchInfo) {
    state.searchInfo = searchInfo
    // console.log(searchInfo)
  }
}

// 简化仓库中的数据
const getters = {
  attrsList(state) {
    return state.searchInfo.attrsList || []
  },
  goodsList(state) {
    return state.searchInfo.goodsList || []
  },
  trademarkList(state) {
    return state.searchInfo.trademarkList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
