import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import ShopHome from '@/pages/Home'
import ShopLogin from '@/pages/Login'
import ShopRegister from '@/pages/Register'
import ShopSearch from '@/pages/Search'

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

export default new VueRouter({
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/home',
      component: ShopHome,
      meta: { show: true }
    },
    {
      path: '/login',
      component: ShopLogin,
      meta: { show: false }
    },
    {
      path: '/register',
      component: ShopRegister,
      meta: { show: false }
    },
    {
      path: '/search/:keyword',
      component: ShopSearch,
      meta: { show: true },
      name: 'search'
    }
  ]
})
