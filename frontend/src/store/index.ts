import { environment } from '@/environments'
import router from '@/router'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    // eslint-disable-next-line
    user: '' as any,
    // eslint-disable-next-line
    torreUserInfo: null as any,
    userSavedItems: [],
    searchNextPage: null,
    size: 20,
    searchResults: []
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
    },
    setUserSavedItem: (state, payload) => {
      const { item: newItem } = payload
      // eslint-disable-next-line
      const itemIndex = state.userSavedItems.findIndex((item: any) => item._id === newItem._id)
      if (itemIndex >= 0) {
        // eslint-disable-next-line
        (state.userSavedItems as any).splice(itemIndex, 1, newItem);
      }
    },
    deleteUserSavedItem: (state, payload) => {
      const { item: deletedItem } = payload
      // eslint-disable-next-line
      const itemIndex = state.userSavedItems.findIndex((item: any) => item._id === deletedItem._id)
      if (itemIndex >= 0) {
        // eslint-disable-next-line
        (state.userSavedItems as any).splice(itemIndex, 1);
      }
    },
    setSearchNextPage: (state, payload) => {
      state.searchNextPage = payload.nextPage
    },
    addSearchResults: (state, payload) => {
      state.searchResults = state.searchResults.concat(payload.results)
    },
    cleanSearchResults: (state) => {
      state.searchResults = []
    },
    setNewSavedItem: (state, payload) => {
      (state.userSavedItems as any).splice(0, 0, payload.item)
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
    },
    starItem: async ({ commit, state }, payload) => {
      const { torreId, type, starred } = payload
      // eslint-disable-next-line
      const foundItem: any = _.cloneDeep(state.userSavedItems.find((item: any) => item.torreId === torreId && item.type === type));
      if (!foundItem) {
        return
      }
      foundItem.starred = starred
      const url = `${environment.appAPI}/saved-items/${foundItem._id}`
      const response = await axios.put(url, { item: foundItem }, { headers: { Authorization: state.token } })
      commit('setUserSavedItem', { item: response.data.item })
    },
    deleteItem: async ({ commit, state }, payload) => {
      const { id } = payload
      // eslint-disable-next-line
      const url = `${environment.appAPI}/saved-items/${id}`
      const response = await axios.delete(url, { headers: { Authorization: state.token } })
      commit('deleteUserSavedItem', { item: response.data.item })
    },
    searchUser: async ({ commit, state }, payload) => {
      const { name, newSearch } = payload

      if (newSearch) {
        commit('setSearchNextPage', { nextPage: null })
        commit('cleanSearchResults')
      }

      const url = `${environment.appAPI}/user/torre/search/person/`
      const response = await axios.post(url, { name, size: state.size, nextPage: state.searchNextPage })

      const { results, pagination } = response.data.users

      commit('addSearchResults', { results })
      commit('setSearchNextPage', { nextPage: pagination.next })
    },
    saveItem: async ({ commit, state }, payload) => {
      const { type, torreId } = payload
      const url = `${environment.appAPI}/saved-items`
      const response = await axios.post(url, { item: { type, torreId, user: state.user._id } }, { headers: { Authorization: state.token } })
      const { item } = response.data
      commit('setNewSavedItem', { item })
    }
  },
  getters: {
    authToken: state => state.token,
    loggedUser: state => state.user,
    torreUser: state => state.torreUserInfo,
    savedItems: state => state.userSavedItems,
    searchResults: state => state.searchResults,
    nextPage: state => state.searchNextPage
  }
})
