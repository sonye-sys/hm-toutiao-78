import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from '@/axios'
// 是绝对路径 @代表src 路径 默认索引文件 index.js index.vue index.json
import router from '@/router'
// 引入公共样式文件
import '@/styles/index.less'
// 在Vue 实例的原型下挂载axios
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
