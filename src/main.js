import './style.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import {createPinia} from "pinia";

const pinia = createPinia()

createApp(App)
    .use(pinia)
    .mount('#app')
