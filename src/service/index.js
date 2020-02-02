import {post, get } from './request'
import path from './interface'

const dispose = item => {
  return new Promise((resolve, reject) => {
    item
    .then(res => {
      if(res.status == 0) {
        resolve(res)
      }else {
        reject(res)
      }
    })
    .catch(error=> {
      console.log(error)
      return error
    })
  })
}

const http = {
  index: () => post(path.home.getShopping, {})
}

export default {
  install(Vue, options) {
    Vue.prototype.$http = http
  }
}
