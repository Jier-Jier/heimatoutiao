import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout'
import Login from '../views/login'
import Home from '@/views/home' // 使用@ 直接指向src目录  不用在使用../
import Article from '@/views/article'
import Comment from '@/views/comment'
import Publish from '@/views/publish'
import Account from '@/views/account'
import Image from '@/views/image'
import NProgress from 'nprogress'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'layout'
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
        path: '/publish',
        component: Publish
      },
      {
        path: '/comment',
        component: Comment
      },
      {
        path: '/article',
        component: Article
      },
      {
        path: '/account',
        component: Account
      },
      {
        path: '/image',
        component: Image
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

// 路由拦截器  beforeEach（导航 全局前置守卫）
// to: 想要去的地址path
// from： 来自哪里的地址
// next： 要跳转到的路径，不写表示放行  想去哪就去哪

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.path === '/login') {
    return next()
  }
  const token = window.localStorage.getItem('user-token')
  if (token) {
    next()
  } else {
    next('/login')
    NProgress.done()
  }
})
router.afterEach((to, from) => {
  // 结束顶部的导航进度条
  NProgress.done()
})

export default router
