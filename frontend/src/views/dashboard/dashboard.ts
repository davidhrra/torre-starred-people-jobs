import { Component, Vue } from 'vue-property-decorator'
import SavedItem from '@/components/saved-item/SavedItem.vue'
import ItemDetails from '@/components/item-details/ItemDetails.vue'
import { SavedItemsTypes } from '@/enums'
import store from '@/store'

@Component({ name: 'dashboard', components: { SavedItem, ItemDetails } })
export default class Dashboard extends Vue {
  private loadingMainContent: boolean;
  private loadUserInfoError: string;
  private showSaved: boolean;
  private showJobs: boolean;
  // eslint-disable-next-line
  private selectedItem: any;

  constructor () {
    super()
    this.loadingMainContent = false
    this.loadUserInfoError = ''
    this.showSaved = false
    this.showJobs = true
    this.selectedItem = null
  }
  // eslint-disable-next-line
  get loggedUser(): any {
    return store.getters.loggedUser
  }
  // eslint-disable-next-line
  get torreUserInfo(): any {
    return store.getters.torreUser
  }

  // eslint-disable-next-line
  get userSavedItems(): any[] {
    const selectedType = this.showJobs ? SavedItemsTypes.JOB : SavedItemsTypes.USER
    // eslint-disable-next-line
    return store.getters.savedItems.filter((savedItem: any) => savedItem.type === selectedType)
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

  // eslint-disable-next-line
  selectItem (payload: any): void{
    this.selectedItem = payload
  }

  cleanSelectedItem (): void{
    this.selectedItem = null
  }
}
