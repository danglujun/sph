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
