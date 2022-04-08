import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
// 封装游客临时身份模块uuid
import { getUUID } from '@/utils/uuid_token'

const state = {
  goodsInfo: {},
  // 游客临时身份
  uuid_token: getUUID()
}

const actions = {
  async getGoodsInfo({ commit }, skuId) {
    let res = await reqGoodsInfo(skuId)
    if (res.code == 200) {
      commit('GETGOODSINFO', res.data)
    }
  },
  async addOrUpdateShopCart({ skuId, skuNum }) {
    let res = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 服务器加入购物车成功
    if (res.code == 200) {
      return 'OK'
    } else {
      // 加入购物车失败
      return Promise.reject(new Error('fail'))
    }
  }
}

const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}

const getters = {
  categoryView(state) {
    return state.goodsInfo.categoryView || {}
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {}
  },
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
