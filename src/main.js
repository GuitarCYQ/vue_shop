import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入全局样式
import './assets/css/global.css'

// 导入请求http包 axios
import axios from 'axios'
// 配置请求路径
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
// prototype原型对象
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
