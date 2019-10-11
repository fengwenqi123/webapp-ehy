import Vue from 'vue'
import '@/styles/index.scss' // global css
import App from './App'
import router from './router'
import store from './store'
import './icons' // icon
import './errorLog' // error log
import '@/assets/icon/iconfont.css'
import fastclick from 'fastclick'
import 'lib-flexible'
import Vant from 'vant'
import 'vant/lib/index.css'

fastclick.attach(document.body)
Vue.prototype.expActive = 0
Vue.config.productionTip = false
Vue.config.jhType = null
Vue.use(Vant)
// Vue.use(ActionSheet)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
