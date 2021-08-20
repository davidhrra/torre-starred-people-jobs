import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap'
import { environment } from './environments'

require('bootstrap/dist/css/bootstrap.min.css')
require('./main.scss')

Vue.config.productionTip = false
Vue.prototype.$baseAPI = environment.appAPI || null

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
