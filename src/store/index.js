import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'
import expDetails from './modules/expDetails'
import user from './modules/user'
import gyt from './modules/gyt'
import recovery from './modules/recovery'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    expDetails,
    user,
    gyt,
    recovery
  },
  getters
})

export default store
