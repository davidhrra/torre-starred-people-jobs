import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '@/views/login/Login.vue'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import store from '@/store'
import { environment } from '@/environments'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Login',
    meta: {
      requiresAuth: false
    },
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: {
      requiresAuth: true
    },
    component: Dashboard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const localStorageUser = localStorage.getItem(environment.userInfoItemName)
  const localStorageAuthToken = localStorage.getItem(environment.authTokenItemName)

  store.commit('setToken', { token: localStorageAuthToken })
  store.commit('setLogedUser', { user: localStorageUser ? JSON.parse(localStorageUser) : '' })

  if (!localStorageUser && !localStorageAuthToken && to.meta?.requiresAuth) {
    store.dispatch('logout')
    next(false)
    return
  }

  if (!!localStorageUser && !!localStorageAuthToken && !to.meta?.requiresAuth) {
    next('/dashboard')
  }

  next()
})

export default router
