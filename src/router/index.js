import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import Notfound from '@/views/404'
import store from '@/store'
import Article from '@/views/article'
import image from '@/views/image'
import publish from '@/views/publish'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    //   跳转路由 $router.push('/login') || $router.push({name:'login'})
    {
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/',
      component: Home,
      children: [
        { path: '/', name: 'welcome', component: Welcome },
        { path: '/article', name: 'article', component: Article },
        { path: '/image', name: 'image', component: image },
        { path: '/publish', name: 'publish', component: publish }
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
