import store from '@/store'
import axios from 'axios'
import API from '@/libs/api'

axios.defaults.baseURL = API.API_URL

axios.defaults.timeout = API.SEND_OVERTIME

const CancelToken = axios.CancelToken;

let pending = [], temporary_storage = []
let isPending = config => {
  temporary_storage = config
  pending.forEach((item, index) => {
    if(item.URL === config.baseURL + config.url + JSON.stringify(config.data) + '&' + config.method) {
      item.cancel('重复的请求')
      API.REPETITION ? API.REPETITION(config) : ''
      pending.splice(index, 1)
    }
  })
}

let removePending = config => {
  console.log(config)
  pending.forEach((item, index) => {
    if(item.URL === config.url + JSON.stringify(config.data) + '&' + config.method) {
      pending.splice(index, 1)
    }
  })
}

let skipToken = false

axios.interceptors.request.use(
  config => {
    isPending(config)
    config.cancelToken = new CancelToken(c => {
      pending.push({URL: config.baseURL + config.url + JSON.stringify(config.data) + '&' + config.method, cancel: c})
      skipToken ? '' : API.INTERCEPTORS ? API.INTERCEPTORS(config, c) : ''
    })
    return config
  },
  error => {
    console.log(error.response,'request')  
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    removePending(response.config)
    API.GETERRORSTATUS ? API.GETERRORSTATUS(response) : ''
    return response
  },
  error => {
    console.log(error)
    error.config == undefined ? removePending(temporary_storage) : removePending(error.config)
    if(error.message && error.message.includes('timeout')) {
      API.ERROROVERTIME(error)
    }else if(error.response){
      API.GETERRORSTATUS ? API.GETERRORSTATUS(error.response) : ''
    }else if(error.message && error.message.includes('Network')) {
      API.NETWORKERROR ? API.NETWORKERROR(error) : ''
    }
    return Promise.reject(error)
  }
);

const post = (path, options, skip) => {
  skipToken = skip || false
  options = options || {}
  options.method = 'POST'
  return request(path, options)
}
const get = (path, options, skip) => {
  skipToken = skip || false
  options = options || {}
  options.method = 'GET'
  return request(path, options)
}

const request = async (path, options) => {

  let parameters = {
    headers: Object.assign({}, {
      "Content-Type": "application/json",
      "NationID": "EC"
    }, options ? options.headers : null),
    data: options.data || null,
    ...options
  }

  return await axios({
    url: `${path}`,
    ...parameters
  })
  .then(response => {
    return response.data
  })
  .catch(error => {
    if(axios.isCancel(error)) API.ISCANCEL ? API.ISCANCEL(error) : ''
    return Promise.reject(error)
  })
}

export {
  post,
  get
}
