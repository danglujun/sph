<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派/事件代理 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="currentIndex === index ? 'cur' : ''">
                <h3 @mouseenter="changeIndex(index)">
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
                </h3>
                <!-- 二、三级分类 -->
                <div class="item-list clearfix" :style="{ display: currentIndex === index ? 'block' : 'none' }">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data() {
    return {
      currentIndex: -1,
      show: true
    }
  },
  // 组件挂载完毕，向服务器发送请求
  mounted() {
    // 当组件挂载完毕，让show属性变为false
    // 如果不是home路由组件，将TypeNav进行隐藏
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      // 右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      // 注入一个参数，其实即为大仓库中的数据
      categoryList: state => state.home.categoryList
    })
  },
  methods: {
    // 鼠标进入修改响应式数据currentIndex
    /* changeIndex(index) {
      // index：鼠标移上某一个一级分类元素的索引值
      this.currentIndex = index
    }, */
    //函数节流:在50ms时间之内只能执行一次
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    // 鼠标移出一级分类的时间回调
    // 当鼠标进入时，让商品分类列表显示
    leaveIndex() {
      this.currentIndex = -1
      // 判断如果不是home路由组件时，才会执行
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
    // 进行路由跳转的方法
    goSearch(e) {
      // 最好的解决方案：编程式导航+事件委派
      // 存在一些问题：事件委派是把全部的子节点h3、dt、dl、em的事件委派给父节点
      // 1、点击a标签的时候，才会进行路由跳转，怎么能确定点击的一定是a标签
      // 2、即使能确定点击的是a标签，如何区分是一级、二级、三级分类的标签
      // 解决办法
      // 1、把子节点当中a标签加上自定义属性data-categoryName，其余的子节点是没有的
      // e.target获取到当前触发这个事件的节点h3、dt、dl、em、a，带有data-categoryName这样的节点一定是a标签
      // 节点有一个属性dataset属性，可以获取到节点的自定义属性与属性值，值是对象，解构出需要的值
      // 2、也是通过自定义属性给一级、二级、三级分类的a标签加上各自的id
      let { categoryname, category1id, category2id, category3id } = e.target.dataset
      if (categoryname) {
        // 整理路由跳转的参数
        let location = { name: 'search' }
        let query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        // 判断：如果路由跳转的时候，带有params参数，要一起传过去
        if (this.$route.params) {
          location.params = this.$route.params
          // 动态给location配置对象添加query属性
          location.query = query
          this.$router.push(location)
        }
      }
    },
    // 当鼠标进入时，让商品分类列表显示
    enterShow() {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          /* &:hover {
            .item-list {
              display: block;
            }
          } */
        }
        .cur {
          background-color: skyblue;
        }
      }
    }

    // 过度动画的样式
    // 过度动画开始状态
    .sort-enter {
      height: 0;
    }
    // 过度动画结束状态
    .sort-enter-to {
      height: 461px;
    }
    // 定义动画时间、速率
    .sort-enter-active {
      transition: all 0.5s linear;
    }
  }
}
</style>
