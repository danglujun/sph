import Vue from 'vue'
import App from './App.vue'
import { MessageBox } from 'element-ui'
import router from '@/router'
import VueLazyload from 'vue-lazyload'
import lazyLoadImg from '@/assets/images/1.jpg'
// 将三级联动注册为全局组件
import TypeNav from '@/components/TypeNav'
import ShopCarousel from '@/components/Carousel'
import ShopPagination from '@/components/Pagination'
Vue.component(TypeNav.name, TypeNav)
Vue.component(ShopCarousel.name, ShopCarousel)
Vue.component(ShopPagination.name, ShopPagination)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.use(VueLazyload, {
  loading: lazyLoadImg
})

import store from '@/store'

// 引入表单校验插件
import '@/plugins/validate'

Vue.config.productionTip = false

// 引入mockServer.js
import '@/mock/mockServer'
// 引入swiper样式
import 'swiper/css/swiper.css'

// 统一引入api文件里的全部请求函数
import * as API from '@/api'

new Vue({
  render: h => h(App),
  router,
  store,
  // 配置全局事件总线$bus
  beforeCreate() {
    Vue.prototype.$bus = this
    // 将api文件里的全部请求函数挂载到Vue原型上
    Vue.prototype.$API = API
  }
}).$mount('#app')
