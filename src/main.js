import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

import {
  VueJsonp
} from 'vue-jsonp'

Vue.use(VueJsonp)

// 引入全局css
import './assets/css/global.less'

import store from './store'

// 将axios挂载在Vue的原型上
// axios.defaults.baseURL = ''
Vue.prototype.$http = axios

// 将全局Echarts挂载到Vue的原型上
Vue.prototype.$echarts = window.echarts
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
