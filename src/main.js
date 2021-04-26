import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'
import '@/permission'
import "@/common/common.css"
import * as echarts from 'echarts';
import moment from 'moment'
require("./mock/mock.js")
// import "./mock/mock.js"
// 也可以

Vue.config.productionTip = false
Vue.use(ElementUI);
//使用Vue.use注册的一定是给vue量身定制的,而其他的使用挂载到原型的方法注册,Vue.prototype.$xxx
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment


new Vue({
  router,
  store,
  render: h => h(App)
  // * 上面这行等价于下面这个
  /* render: function (h) {
        return h(App)
    } */
  // * 等价于下面
  // * vue规定render函数默认接收createElement函数当参数
  /* render: function (createElement) {
        return createElement(App)
    } */
}).$mount('#app')
// ! $mount 和el类似,挂载的意思

