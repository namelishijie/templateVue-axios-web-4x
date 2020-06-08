import * as http from './../../service'

const home = {
  home: {
    ProductList: payload => http.post(http.path.home.ProductList, { data: payload }, true)
  }
}

export default home
