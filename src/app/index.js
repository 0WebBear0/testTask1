import "@coreui/coreui/dist/css/coreui.min.css"
import "bootstrap/dist/css/bootstrap.min.css"

import { createApp } from "vue"
import App from "./index.vue"


import { router } from "./providers"
import { createPinia } from "pinia"

export const app = createApp(App)
    .use(createPinia())
    .use(router)
