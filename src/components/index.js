//  封装一个vue 插件
//  作用：注册components 下的所有的组件为全局组件
// vue 插件定义的规则 暴露一个对象 {} 在对象中选项 install 对应的一个函数 函数有形参 vue对象
import MyBread from '@/components/my-bread'
export default {
  install (Vue) {
    //   Vue.use(使用插件) 此时的Vue就是use前的Vue
    // 所以使用Vue全局注册组件即可
    Vue.component(MyBread.name, MyBread)
  }
}
