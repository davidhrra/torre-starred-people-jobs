import { Component, Vue } from 'vue-property-decorator'
import axios, { AxiosError } from 'axios'

@Component({ name: 'app' })
export default class App extends Vue {
  mounted () {
    axios.interceptors.response.use(
      (response: any) => response,
      async (error: AxiosError) => {
        if (error) {
          if (error.response!.status === 401) {
            await this.$store.dispatch('logout')
          }
        }
        return Promise.reject(error)
      })
  }
}
