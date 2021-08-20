import { Component, Vue } from 'vue-property-decorator'
import SavedItem from '@/components/saved-item/SavedItem.vue'
import { SavedItemsTypes } from '@/enums'

@Component({ name: 'dashboard', components: { SavedItem } })
export default class Dashboard extends Vue {
  private loadingMainContent: boolean;
  private loadUserInfoError: string;
  private showSaved: boolean;
  private showJobs: boolean;

  constructor () {
    super()
    this.loadingMainContent = false
    this.loadUserInfoError = ''
    this.showSaved = false
    this.showJobs = true
  }
  // eslint-disable-next-line
  get loggedUser(): any {
    return this.$store.getters.loggedUser
  }
  // eslint-disable-next-line
  get torreUserInfo(): any {
    return this.$store.getters.torreUser
  }

  // eslint-disable-next-line
  get userSavedItems(): any[] {
    const selectedType = this.showJobs ? SavedItemsTypes.JOB : SavedItemsTypes.USER
    // eslint-disable-next-line
    return this.$store.getters.savedItems.filter((savedItem: any) => savedItem.type === selectedType)
  }

  mounted (): void {
    this.loadUserInfo()
  }

  async loadUserInfo (): Promise<void> {
    this.loadingMainContent = true
    try {
      await this.$store.dispatch('loadTorreUserInfo')
      await this.$store.dispatch('loadUserSavedItems')
    } catch (err) {
      this.loadUserInfoError = err.response?.data?.message ? err.response?.data?.message.toString() : err.toString()
    }
    this.loadingMainContent = false
  }

  logout (): void {
    this.$store.dispatch('logout')
  }

  setShowSaved (value: boolean): void {
    this.showSaved = value
  }

  setShowJobs (value: boolean): void {
    this.showJobs = value
  }
}
