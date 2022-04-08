import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import routes from './routes'
import store from '@/store'

// 先把VueRouter原型对象上的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push、replace
// 第一个参数，告诉原来的push方法，你往哪里跳转；第二个参数是成功的回调；第三个参数是失败的回调（push、replace的返回值是一个promise实例对象，必须有成功和失败的回调）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    // call和apply区别
    // 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    // 不同点：call和apply传递参数，call传递参数用逗号隔开；apply方法执行，传递数组
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    )
  }
}

let router = new VueRouter({
  routes,
  // 滚动行为
  scrollBehavior() {
    // 返回的这个y=0，代表跳转后的新页面滚动条在最顶部
    return { y: 0 }
  }
})

// 全局守卫
router.beforeEach(async (to, _, next) => {
  next()
  // 用户登录了才会有token，未登录一定不会有token
  let token = store.state.user.token
  let name = store.state.user.userInfo.name
  // 用户已经登录了
  if (token) {
    // 如果用户已经登录了，禁止去登录页面
    if (to.path == '/login') {
      next('/')
    } else {
      // 登录了，但去的不是login
      // 如果用户名已有
      if (name) {
        next()
      } else {
        // 没有用户信息，派发action让仓库存储用户信息再跳转
        try {
          // 获取用户信息成功后放行
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效了获取不到用户信息，先清除过期token,再重新登录
          await store.dispatch('logout')
          next('/login')
        }
      }
    }
  } else {
    // 未登录：不能去交易相关、支付相关（pay|paysuccess）、个人中心
    // 未登录去上面这些路由--登录
    let toPath = to.path
    if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
      // 把未登录的时候想去而没有去成的信息，存储与地址栏中（路由）
      next('/login?redirect=' + toPath)
    } else {
      // 去的不是上面的这些路由（home|search|detail）--放行
      next()
    }
  }
})

export default router
