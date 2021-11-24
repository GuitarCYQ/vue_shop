import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'

// 导入请求http包 axios
import axios from 'axios'

// 导入TreeTable
import TreeTable from 'vue-table-with-tree-grid'

// 配置请求路径
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
// 拦截器 添加token
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 在最后必须return config
  return config
})
// prototype原型对象
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 注册为全局可用
Vue.component('tree-table', TreeTable)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
