import { reqBannerList, reqCategoryList, reqFloorList } from '@/api'

const state = {
  categoryList: [],
  bannerList: [],
  floorList: []
}

const actions = {
  // 通过api里面的接口函数调用，向服务器发请求，获取服务器数据
  async categoryList({ commit }) {
    let res = await reqCategoryList()
    if (res.code == 200) {
      commit('CATEGORYLIST', res.data)
    }
  },
  async getBannerList({ commit }) {
    let res = await reqBannerList()
    if (res.code == 200) {
      commit('GETBANNERLIST', res.data)
    }
  },
  async getFloorList({ commit }) {
    let res = await reqFloorList()
    if (res.code == 200) {
      commit('GETFLOORLIST', res.data)
    }
  }
}

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
}

const getters = {}

export default {
  state,
  actions,
  mutations,
  getters
}
