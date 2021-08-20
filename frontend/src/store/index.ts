import { environment } from '@/environments'
import router from '@/router'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    // eslint-disable-next-line
    user: '' as any,
    // eslint-disable-next-line
    torreUserInfo: null as any,
    userSavedItems: []
  },
  mutations: {
    setToken: (state, payload) => {
      localStorage.setItem(environment.authTokenItemName, payload.token)
      state.token = payload.token
    },
    setLogedUser: (state, payload) => {
      localStorage.setItem(environment.userInfoItemName, JSON.stringify(payload.user))
      state.user = payload.user
    },
    setTorreUserInfo: (state, payload) => {
      state.torreUserInfo = payload.user
    },
    setUserSavedItems: (state, payload) => {
      state.userSavedItems = payload.item
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
      commit('setLogedUser', { user: '' })
      router.push('/')
    },
    loadTorreUserInfo: async ({ commit, state }) => {
      console.log(state.user)
      const { torreUsername } = state.user
      const url = `${environment.appAPI}/user/torre/${torreUsername}`
      const response = await axios.get(url)
      const { user } = response.data
      commit('setTorreUserInfo', { user })
    },
    loadUserSavedItems: async ({ commit, state }) => {
      const { _id } = state.user
      const url = `${environment.appAPI}/saved-items/${_id}`
      const response = await axios.get(url, { headers: { Authorization: state.token } })
      const { item } = response.data
      commit('setUserSavedItems', { item })
    }
  },
  getters: {
    authToken: state => state.token,
    loggedUser: state => state.user,
    torreUser: state => state.torreUserInfo,
    savedItems: state => state.userSavedItems
  }
})
