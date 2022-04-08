export default [
  {
    path: '*',
    redirect: '/home'
  },
  {
    path: '/home',
    component: () => import('@/pages/Home'), // 路由懒加载
    meta: { show: true }
  },
  {
    path: '/login',
    component: () => import('@/pages/Login'),
    meta: { show: false }
  },
  {
    path: '/register',
    component: () => import('@/pages/Register'),
    meta: { show: false }
  },
  {
    path: '/search/:keyword?',
    component: () => import('@/pages/Search'),
    meta: { show: true },
    name: 'search'
  },
  {
    path: '/detail/:skuId',
    component: () => import('@/pages/Detail'),
    meta: { show: true }
  },
  {
    path: '/addcartsuccess',
    component: () => import('@/pages/AddCartSuccess'),
    meta: { show: true },
    name: 'addcartsuccess'
  },
  {
    path: '/shopcart',
    component: () => import('@/pages/ShopCart'),
    meta: { show: true }
  },
  {
    path: '/trade',
    component: () => import('@/pages/Trade'),
    meta: { show: true },
    // 路由独享守卫
    beforeEnter: (_, from, next) => {
      // 去交易页面，必须是从购物车页面过来
      if (from.path == '/shopcart') {
        next()
      } else {
        // 从其他路由组件过来，就停留在当前页
        next(false)
      }
    }
  },
  {
    path: '/pay',
    component: () => import('@/pages/Pay'),
    meta: { show: true },
    beforeEnter: (_, from, next) => {
      if (from.path == '/trade') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/paysuccess',
    component: () => import('@/pages/PaySuccess'),
    meta: { show: true },
    beforeEnter: (_, from, next) => {
      if (from.path == '/pay') {
        next()
      } else {
        next(false)
      }
    }
  },
  {
    path: '/center',
    component: () => import('@/pages/Center'),
    meta: { show: true },
    children: [
      {
        path: 'myorder',
        component: () => import('@/pages/Center/MyOrder')
      },
      {
        path: 'grouporder',
        component: () => import('@/pages/Center/GroupOrder')
      },
      {
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  }
]
