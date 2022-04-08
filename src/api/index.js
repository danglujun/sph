// 当前这个模块是为了api接口统一管理
import requests from './request'
import mockRequest from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')

export const reqBannerList = () => mockRequest.get('/banner')

export const reqFloorList = () => mockRequest.get('/floor')

// 获取搜索模块的数据，给服务器传递一个默认参数（至少是一个空对象）
export const reqSearchInfo = params =>
  requests({
    url: '/list',
    method: 'POST',
    data: params
  })

// 获取商品详情的数据
export const reqGoodsInfo = skuId =>
  requests({
    url: `/item/${skuId}`,
    method: 'GET'
  })

// 将商品添加到购物车中，或者更新某个商品的个数
export const reqAddOrUpdateShopCart = (skuId, skuNum) =>
  requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'POST'
  })

// 获取购物车列表数据
export const reqCartList = () => requests.get('/cart/cartList')

// 删除购物车商品
export const reqDeleteCartById = skuId =>
  requests({
    url: `/cart/deleteCart/${skuId}`,
    method: 'DELETE'
  })

// 修改商品的选中状态
export const reqUpdateChecked = (skuId, isChecked) =>
  requests({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: 'GET'
  })

// 获取验证码
export const reqGetCode = phone =>
  requests({
    url: `/user/passport/sendCode/${phone}`,
    method: 'GET'
  })

// 注册
export const reqUserRegister = data =>
  requests({
    url: '/user/passport/register',
    method: 'POST',
    data
  })

// 登录
export const reqUserLogin = data =>
  requests({
    url: '/user/passport/login',
    method: 'POST',
    data
  })

// 获取用户信息（需要带着用户的token向服务器要数据）
export const reqUserInfo = () => requests.get('/user/passport/auth/getUserInfo')

// 退出登录
export const reqLogout = () => requests.get('/user/passport/logout')

// 获取用户地址
export const reqAddressInfo = () => requests.get('/user/userAddress/auth/findUserAddressList')

// 获取订单交易页信息
export const reqOrderInfo = () => requests.get('/order/auth/trade')

// 提交订单
export const reqSubmitOrder = (tradeNo, data) =>
  requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'POST',
    data
  })

// 获取订单支付信息
export const reqPayInfo = orderId =>
  requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'GET'
  })

// 查询支付订单状态
export const reqPayStatus = orderId =>
  requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'GET'
  })

// 获取我的订单列表
export const reqMyOrderList = (page, limit) =>
  requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'GET'
  })
