import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import service from './service'
import tools from './libs/tools'
import 'normalize.css/normalize.css'
import VeeValidate, { Validator } from 'vee-validate'
import Extend from './libs/vaildate'

Vue.use(service).use(tools).use(VeeValidate).use(Extend, Validator)

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
  // window.scrollTo(0,0);
  //登录拦截
  // if(to.meta.requireAuth) {
  //   if(store.state.toKen) {
  //     next()
  //   }else {
  //     next({
  //       path: '/', // 登录拦截跳转
  //       query: {redirect: to.fullPath}
  //     })
  //   }
  // }else {
  //   next()
  // }
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
