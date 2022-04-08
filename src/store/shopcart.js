import { reqCartList, reqDeleteCartById, reqUpdateChecked } from '@/api'

const state = {
  cartList: []
}

const actions = {
  // 获取购物车列表数据
  async getCartList({ commit }) {
    let res = await reqCartList()
    if (res.code == 200) {
      commit('GETCARTLIST', res.data)
    }
  },
  // 删除购物车列表数据
  async deleteCartById(skuId) {
    let res = await reqDeleteCartById(skuId)
    if (res.code == 200) {
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 更新商品选中状态
  async updateChecked({ skuId, isChecked }) {
    let res = await reqUpdateChecked(skuId, isChecked)
    if (res.code == 200) {
      return 'OK'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 删除全部选中商品
  deleteAllCheckedCart({ dispatch, getters }) {
    // context：小仓库，身上有commit、dispatch、getters、state
    // 购物车中全部的商品是一个数组
    let promiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartById', item.skuId) : ''
      // 将每一次返回的promise添加到数组中
      promiseAll.push(promise)
    })
    // Promise.all([p1,p2,p3]):p1|p2|p3每一个都是Promise对象，如果有一个Promise失败，都失败；如果都成功，返回成功
    return Promise.all(promiseAll)
  },
  // 全选按钮的更改
  updateAllCheckedCart({ dispatch, state }, isChecked) {
    let promiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let promise = dispatch('updateChecked', { skuId: item.skuId, isChecked })
      promiseAll.push(promise)
    })
    return Promise.all(promiseAll)
  }
}

const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}

const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  }
}

export default {
  state,
  actions,
  mutations,
  getters
}
