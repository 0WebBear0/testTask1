import { fileURLToPath } from "url"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  requireConfigFile: false,
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/app/index.scss";`,
      },
    },
  },
  host: true,
  watch: {
    usePolling: true
  },
  port: 80,
  server: {
    port: 80,
  },
  preview: {
    port: 80,
  },
})
