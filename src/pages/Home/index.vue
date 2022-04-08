<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <ShopRecommend></ShopRecommend>
    <ShopRank></ShopRank>
    <ShopLike></ShopLike>
    <ShopFloor v-for="floor in floorList" :key="floor.id" :floor="floor"></ShopFloor>
    <ShopBrand></ShopBrand>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import ShopRecommend from '@/pages/Home/Recommend'
import ShopRank from '@/pages/Home/Rank'
import ShopLike from '@/pages/Home/Like'
import ShopFloor from '@/pages/Home/Floor'
import ShopBrand from '@/pages/Home/Brand'
import { mapState } from 'vuex'

export default {
  name: 'ShopHome',
  components: {
    ListContainer,
    ShopRecommend,
    ShopRank,
    ShopLike,
    ShopFloor,
    ShopBrand
  },
  mounted() {
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }
}
</script>

<style lang="less" scoped></style>
