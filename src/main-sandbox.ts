// import { createApp, App as IApp } from 'vue'
import Vue from 'vue'
import App from './Sandbox.vue'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
