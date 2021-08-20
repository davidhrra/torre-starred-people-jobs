import { Component, Vue } from 'vue-property-decorator'

@Component({ name: 'dashboard' })
export default class Dashboard extends Vue {
  // eslint-disable-next-line
  get loggedUser (): any {
    return this.$store.getters.loggedUser
  }
}
