import VueRouter from 'vue-router'
import Vue from 'vue'
// import login from '@/views/login'
// import Home from '@/views/home'
// import Welcome from '@/views/welcome'
import Notfound from '@/views/404'
import store from '@/store'
// import Article from '@/views/article'
// import image from '@/views/image'
// import publish from '@/views/publish'
// import comments from '@/views/comment'
// import fans from '@/views/fans'
const setting = () => import('@/views/setting')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    //   跳转路由 $router.push('/login') || $router.push({name:'login'})
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    }, {
      path: '/',
      component: () => import('@/views/home'),
      children: [
        { path: '/', name: 'welcome', component: () => import('@/views/welcome') },
        { path: '/article', name: 'article', component: () => import('@/views/article') },
        { path: '/image', name: 'image', component: () => import('@/views/image') },
        { path: '/publish', name: 'publish', component: () => import('@/views/publish') },
        { path: '/comment', name: 'comment', component: () => import('@/views/comment') },
        { path: '/fans', name: 'fans', component: () => import('@/views/fans') },
        { path: '/setting', name: 'setting', component: setting }
      ]
    },
    { path: '*', name: '404', component: Notfound }
  ]
})
// 全局的前置导航守卫
router.beforeEach((to, from, next) => {
  // 如果要去的路径不是登录或者没有token 令牌 全去登录
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  // 否则放行
  next()
})

export default router
