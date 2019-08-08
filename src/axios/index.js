import axios from 'axios'
import store from '@/store'
import JSONBIG from 'json-bigint'

// 配置请求头
// axios.defaults.headers = {
//   Authorization: `Bearer ${store.getUser().token}`
// }
// 配置响应回来的数据进行处理 最大安全值
axios.defaults.transformResponse = [(data) => {
  // data是原始json字符  对 data 进行转化 return的值是转化后的结果
  // data 在删除接口返回的是null 使用JSONBIG 转化null的时候会报错
  try {
    return JSONBIG.parse(data)
  } catch (e) {
    return data
  }
}]
// 请求拦截器
axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.getUser().token}`
  return config
}, (err) => {
  return Promise.reject(err)
})
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 判断响应状态码 如果是401 去登录
  if (error.response.status === 401) {
    // token 失效   跳转本质是改变hash 值
    location.hash = '#/login'
  }
  return Promise.reject(error)
})
export default axios
