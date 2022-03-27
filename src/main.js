import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 将三级联动注册为全局组件
import TypeNav from '@/components/TypeNav'
import ShopCarousel from '@/components/Carousel'
import ShopPagination from '@/components/Pagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(ShopCarousel.name, ShopCarousel)
Vue.component(ShopPagination.name, ShopPagination)

import store from '@/store'

Vue.config.productionTip = false

// 引入mockServer.js
import '@/mock/mockServer'
// 引入swiper样式
import 'swiper/css/swiper.css'

new Vue({
  render: h => h(App),
  router,
  store,
  // 配置全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
