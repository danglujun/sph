// 当前这个模块是为了api接口统一管理
import requests from './request'
import mockRequest from './mockAjax'

// 三级联动接口
// /api/product/getBaseCategoryList get 无参数
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')

export const reqBannerList = () => mockRequest.get('/banner')

export const reqFloorList = () => mockRequest.get('/floor')
