import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import './plugins/element.js'
import 'normalize.css'
import '@/assets/css/base.css'

Vue.config.productionTip = false
Vue.prototype.$api = api;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')