import './style.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from "./router.js";
import {createPinia} from "pinia";

createApp(App)
    .use(createPinia())
    .use(router)
    .mount('#app')
