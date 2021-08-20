import { environment } from '@/environments'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: ''
  },
  mutations: {
    setToken: (state, payload) => {
      state.token = payload.token
    }
  },
  actions: {
    // eslint-disable-next-line
    registerUser: async ({ }, payload) => {
      const { username, password, torreUsername } = payload
      const url = `${environment.appAPI}/user`
      await axios.post(url, { user: { username, password, torreUsername } })
    },
    login: async ({ commit }, payload) => {
      const { username, password } = payload
      const url = `${environment.appAPI}/auth/login`
      const response = await axios.post(url, { username, password })
      const { token } = response.data
      commit('setToken', { token })
    }
  },
  modules: {
  }
})
