import { createApp } from 'vue'
import App from './App.vue'

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import router from './router/index.js'

createApp(App)
    .use(router)
    .component('Datepicker', Datepicker)
    .mount('#app')
