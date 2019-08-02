import VueRouter from 'vue-router'
import Vue from 'vue'
import login from '@/views/login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    //   跳转路由 $router.push('/login') || $router.push({name:'login'})
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})

export default router
