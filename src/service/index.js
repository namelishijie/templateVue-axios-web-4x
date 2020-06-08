import * as request from './request'
import path from './interface'
import store from '@/store'

import home from './../views/home/http'

const dispose = item => {
  store.dispatch('ISLOADING', true)
  return new Promise((resolve, reject) => {
    item
    .then(res => {
      store.dispatch('ISLOADING', false)
      if(res.status == 0) {
        resolve(res)
      }else {
        reject(res)
      }
    })
    .catch(error=> {
      return error
    })
  })
}

const post = (A, B, C) => dispose(request.post(A, B, C)),
      get = (A, B, C) => dispose(request.get(A, B, C))


const http = {
  ...home
}

export { http, post, get, dispose, path }

export default {
  install(Vue, options) {
    Vue.prototype.$http = http
  }
}
