import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 将三级联动注册为全局组件
import TypeNav from '@/components/TypeNav'
import ShopCarousel from '@/components/Carousel'
Vue.component(TypeNav.name, TypeNav)
Vue.component(ShopCarousel.name, ShopCarousel)

import store from '@/store'

Vue.config.productionTip = false

// 引入mockServer.js
import '@/mock/mockServer'
// 引入swiper样式
import 'swiper/css/swiper.css'

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
