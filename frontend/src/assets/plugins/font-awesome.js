import Vue from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import {
  faCircleNotch,
  faPowerOff,
  faSave,
  faSearch
} from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(
  faCircleNotch,
  faPowerOff,
  faSave,
  faSearch
)
