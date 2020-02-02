import store from '@/store'
import router from '@/router'

//请求域名
const API_URL = "http://gtapi.2020d.net/"

//请求超时时间
const SEND_OVERTIME = 15000

//请求前回调
let INTERCEPTORS = function(config, cancel) {
  if(store.getters.toKen) {
    config.headers.Authorization = store.getters.toKen
  }else {
    cancel('请登录')
    console.log('请登录')
  }
}

//重复的请求
let REPETITION = function(config) {
  console.log('重复的请求')
}

//请求超时
let ERROROVERTIME = function(error) {
  console.log('请求超时')

  console.log(store.getters.lang)
}

//返回状态
let GETERRORSTATUS = function(state) {
  console.log(state)
  // if(state.status == 401) {
  //   console.log(state.status)
  // }
}

//请求取消
let ISCANCEL = function(cancel) {
  console.log(cancel, '请求取消')
}

// Network Error
let NETWORKERROR = function(error) {
  console.log(error)
}

export default{
  API_URL,
  SEND_OVERTIME,
  REPETITION,
  INTERCEPTORS,
  ERROROVERTIME,
  GETERRORSTATUS,
  ISCANCEL,
  NETWORKERROR
}
