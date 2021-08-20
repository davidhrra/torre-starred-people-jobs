import { environment } from '@/environments'
import router from '@/router'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    user: {}
  },
  mutations: {
    setToken: (state, payload) => {
      localStorage.setItem(environment.authTokenItemName, payload.token)
      state.token = payload.token
    },
    setLogedUser: (state, payload) => {
      localStorage.setItem(environment.userInfoItemName, payload.user)
      state.user = payload.user
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
      const { token, user } = response.data
      commit('setToken', { token })
      commit('setLogedUser', { user })
      router.push('/dashboard')
    },
    logout: ({ commit }) => {
      commit('setToken', { token: '' })
      commit('setLogedUser', { user: {} })
      router.push('/')
    }
  },
  getters: {
    authToken: state => state.token,
    loggedUser: state => state.user
  }
})
