import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import axios from 'axios'
import { environment } from '@/environments'
import { SavedItemsTypes } from '@/enums'
import _ from 'lodash'

@Component({ name: 'item-details' })
export default class ItemDetails extends Vue {
    // eslint-disable-next-line
    @Prop({ required: true, default: null }) private selectedItem: any;

    private loadingChanges: boolean
    private loading: boolean;
    // eslint-disable-next-line
    private savedItemInfo: any;
    private error: string;

    constructor () {
      super()
      this.loading = false
      this.savedItemInfo = {}
      this.error = ''
      this.loadingChanges = false
    }

    get type (): SavedItemsTypes {
      return this.selectedItem.type
    }

    mounted (): void {
      this.loadItemInfo()
    }

    @Watch('selectedItem')
    selectedItemChanged (): void {
      this.loadItemInfo()
    }

    // eslint-disable-next-line
    get savedItem (): any {
      const savedItems = _.cloneDeep(this.$store.state.userSavedItems)
      // eslint-disable-next-line
        return savedItems.find((savedItem: any) => savedItem.torreId === this.selectedItem.torreId && savedItem.type === this.selectedItem.type);
    }

    get isStarred (): boolean {
      return !!this.savedItem && this.savedItem.starred
    }

    // eslint-disable-next-line
    get jobDetails (): any[] {
      if (this.type === SavedItemsTypes.JOB) {
        return this.savedItemInfo.details
      }

      return []
    }

    async loadItemInfo (): Promise<void> {
      this.loading = true
      this.error = ''
      try {
        let url = `${environment.appAPI}/user/torre/${this.selectedItem.torreId}`

        if (this.type === SavedItemsTypes.JOB) {
          url = `${environment.appAPI}/user/torre/job/${this.selectedItem.torreId}`
        }

        const response = await axios.get(url)

        this.savedItemInfo = response.data.user

        if (this.type === SavedItemsTypes.JOB) {
          this.savedItemInfo = response.data.job
        }
      } catch (err) {
        this.error = err.response?.data?.message ? err.response?.data?.message.toString() : err.toString()
      }
      this.loading = false
    }

    capitalizeFirstLetter (title: string): string {
      return title.charAt(0).toUpperCase() + title.slice(1)
    }

    processContent (content: string): string {
      return content.replace(/\n/g, '<br>')
    }

    close (): void {
      this.$emit('close-details')
    }

    async starItem (): Promise<void> {
      if (this.savedItem) {
        this.loadingChanges = true
        await this.$store.dispatch('starItem', { torreId: this.savedItem.torreId, type: this.savedItem.type, starred: !this.savedItem.starred })
        this.loadingChanges = false
      }
    }

    deleteOrSaveItem (): void {
      if (this.savedItem) {
        this.deleteItem()
        return
      }
      this.saveItem()
    }

    async saveItem (): Promise<void> {
      if (!this.savedItem) {
        this.loadingChanges = true
        try {
          await this.$store.dispatch('saveItem', { type: this.selectedItem.type, torreId: this.selectedItem.torreId })
        } catch (err) {
          console.error(err)
        }
        this.loadingChanges = false
      }
    }

    async deleteItem (): Promise<void> {
      if (this.savedItem) {
        this.loadingChanges = true
        try {
          await this.$store.dispatch('deleteItem', { id: this.savedItem._id })
          this.close()
        } catch (err) {
          console.error(err)
        }
        this.loadingChanges = false
      }
    }
}
