import { SavedItemsTypes } from '@/enums'
import { environment } from '@/environments'
import axios from 'axios'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({ name: 'saved-item' })
export default class SavedItem extends Vue {
    // eslint-disable-next-line
    @Prop({ required: true, default: {} }) private savedItem: any;
    // eslint-disable-next-line
    @Prop({ required: true, default: null }) private selectedItem: any;

    private loading: boolean;
    // eslint-disable-next-line
    private savedItemInfo: any;
    private error: string;

    constructor () {
      super()
      this.loading = false
      this.savedItemInfo = {}
      this.error = ''
      this.selectedItem = null
    }

    get itemIsSelected (): boolean {
      return this.selectedItem && this.selectedItem.torreId === this.savedItem.torreId && this.selectedItem.type === this.savedItem.type
    }

    get type (): SavedItemsTypes {
      return this.savedItem.type
    }

    mounted (): void {
      this.loadItemInfo()
    }

    async loadItemInfo (): Promise<void> {
      this.loading = true
      this.error = ''
      try {
        let url = `${environment.appAPI}/user/torre/${this.savedItem.torreId}`

        if (this.type === SavedItemsTypes.JOB) {
          url = `${environment.appAPI}/user/torre/job/${this.savedItem.torreId}`
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

    selectItem (): void {
      this.$emit('select-item', { type: this.type, torreId: this.savedItem.torreId })
    }
}
