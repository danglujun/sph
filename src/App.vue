<template>
  <div>
    <ShopHeader></ShopHeader>
    <router-view></router-view>
    <ShopFooter v-show="$route.meta.show"></ShopFooter>
  </div>
</template>

<script>
import ShopHeader from '@/components/Header'
import ShopFooter from '@/components/Footer'
export default {
  name: 'App',
  components: {
    ShopHeader,
    ShopFooter
  },
  mounted() {
    // 放在根组件中可以保证只发送一次请求，将数据存于仓库中
    // state:他是咱们大仓库中的state（包含home|search）
    this.$store.dispatch('categoryList')
  }
}
</script>

<style></style>
