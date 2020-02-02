import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})

export default store