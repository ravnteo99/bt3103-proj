import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faX, faPlus, faCalendar } from '@fortawesome/free-solid-svg-icons'
import { faClock } from "@fortawesome/free-regular-svg-icons";

/* add icons to the library */
library.add(faX, faPlus, faCalendar, faClock, faCalendar)

createApp(App)
    .component('font-awesome-icon', FontAwesomeIcon)
    .use(router)
    .mount('#app')
