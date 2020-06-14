// import { createApp, App as IApp } from 'vue'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { element } from './element-module'
import VueCompositionApi from '@vue/composition-api'

Vue.use(VueCompositionApi)
Vue.use(element)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

// declare global {
//   interface Window {
//     vm: ReturnType<IApp['mount']>
//   }
// }

// const app = createApp(App)
// app.use(router)
// app.use(element)
// window.vm = app.mount('#app')
