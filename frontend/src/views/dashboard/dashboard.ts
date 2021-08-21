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
  private searchKeyword: string;
  private loadingSearchResults: boolean;
  private searchError: string;

  constructor () {
    super()
    this.loadingMainContent = false
    this.loadUserInfoError = ''
    this.showSaved = false
    this.showJobs = true
    this.selectedItem = null
    this.searchKeyword = ''
    this.loadingSearchResults = false
    this.searchError = ''
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
  get searchResults(): any[]{
    // eslint-disable-next-line
    return store.getters.searchResults.map((result: any) => { 
      return {
        torreId: result.username ? result.username : result.id,
        type: this.showJobs ? SavedItemsTypes.JOB : SavedItemsTypes.USER
      }
    })
  }

  // eslint-disable-next-line
  get userSavedItems(): any[] {
    const selectedType = this.showJobs ? SavedItemsTypes.JOB : SavedItemsTypes.USER
    // eslint-disable-next-line
    return store.getters.savedItems.filter((savedItem: any) => savedItem.type === selectedType)
  }

  get nextPage (): string | null {
    return store.getters.nextPage
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
    if (value !== this.showJobs) {
      this.cleanSeachInfo()
      this.cleanSelectedItem()
    }
    this.showJobs = value
  }

  // eslint-disable-next-line
  selectItem (payload: any): void{
    this.selectedItem = payload
  }

  cleanSelectedItem (): void{
    this.selectedItem = null
  }

  get searchKeywordIsValid (): boolean {
    return this.searchKeyword.trim().length > 3
  }

  search (newSearch = true): void{
    if (!this.showJobs) {
      this.searchUser(newSearch)
    }
  }

  cleanSeachInfo () {
    this.searchKeyword = ''
    this.$store.commit('cleanSearchResults')
    this.$store.commit('setSearchNextPage', { nextPage: null })
  }

  async searchUser (newSearch = true): Promise<void> {
    if (this.searchKeywordIsValid && !this.loadingSearchResults) {
      this.loadingSearchResults = true
      try {
        await this.$store.dispatch('searchUser', { name: this.searchKeyword, newSearch })
      } catch (err) {
        this.searchError = err.response.data.message.toString()
      }
      this.loadingSearchResults = false
    }
  }
}
