import axios from 'axios'
import store from '@/store'

// 配置请求头
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 请求拦截器
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})
