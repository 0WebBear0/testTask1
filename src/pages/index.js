import Routing from "./index.vue"

export const routes = [
  { path: "/", component: () => import("./formPdfPage") },
]

export { Routing }
