export const ROUTES_VIEWS = [
  // 首页 - 登录
  {
    path: '/',
    name: 'Home',
    component: () => import('../../views/login/ly0/Index.vue'),
  },

  {
    path: '/views/bhlc', // 博汇陇创
    name: 'viewsBhlc',
    component: () => import('../../views/bhlc/Index.vue'),
  },
  {
    path: '/views/sfy', // 省妇幼
    name: 'viewsSfy',
    component: () => import('../../views/sfy/Index.vue'),
  },

  // 博汇商城
  {
    path: '/mall/:branch',
    name: 'mall',
    component: () => import('../../components/ly0/d7mall/Index.vue'),
  },
  {
    path: '/mall-goods/:id_goods',
    name: 'mall-goods',
    component: () => import('../../components/ly0/d7mall/goods/Index.vue'),
  },
  {
    path: '/mall-cart',
    name: 'mall-cart',
    component: () => import('../../components/ly0/d7mall/cart/Index.vue'),
  },
  {
    path: '/mall-record',
    name: 'mall-record',
    component: () => import('../../components/ly0/d7mall/record/Index.vue'),
  },

  // 博汇网课
  {
    path: '/wangke/:branch',
    name: 'wangke',
    component: () => import('../../components/ly0/d15gallery/login/Index.vue'),
  },
  {
    path: '/wangke/:branch/gallery/:id_dataunit',
    name: 'wangke-gallery',
    component: () => import('../../components/ly0/d15gallery/Index.vue'),
  },
]
