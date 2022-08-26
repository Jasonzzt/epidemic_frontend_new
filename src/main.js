import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import vuescroll from 'vuescroll';
import {
  VueJsonp
} from 'vue-jsonp'

Vue.use(VueJsonp)
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


// import 'echarts-gl'
import jquery from 'jquery'

Vue.prototype.$ = jquery
// vue全局注入Echarts
Vue.prototype.$echarts = echarts

import 'vuescroll/dist/vuescroll.css';
Vue.use(vuescroll);

import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'Uokbjn3fC5Fxl990slXs5UkUAo5GvNzo'
})

// map.setMapStyle("midnight");

// 引入全局css
import './assets/css/global.less'

import store from './store'
// 将axios挂载在Vue的原型上
// axios.defaults.baseURL = ''
Vue.prototype.$axios = axios
Vue.prototype.$http = axios

// 将全局Echarts挂载到Vue的原型上
Vue.prototype.$echarts = window.echarts
Vue.config.productionTip = false
// import iView from 'iview';
// import 'iview/dist/styles/iview.css'  //iview的样式文件，必须引入
// Vue.use(iView);
import VWave from 'v-wave'
import dataV from '@jiaminghi/data-view'

Vue.use(dataV)
// 引入echarts
import echarts from 'echarts'
import 'echarts/map/js/china'
// import 'echarts/map/js/world'
import 'echarts/extension/bmap/bmap'
Vue.use(VWave)
new Vue({
  axios,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
