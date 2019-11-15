import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout'
import Login from '../views/login'
import Home from '@/views/home' // 使用@ 直接指向src目录  不用在使用../
import Article from '@/views/article'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'login'
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: '/article',
        component: Article
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 路由拦截器  beforeEach（导航 全局前置守卫）
// to: 想要去的地址path
// from： 来自哪里的地址
// next： 要跳转到的路径，不写表示放行  想去哪就去哪

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = window.localStorage.getItem('user-token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})

export default router
