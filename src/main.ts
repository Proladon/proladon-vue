import { createApp, type App } from 'vue'
import { setupStore } from '@/stores'
import AppCmp from '@/App.vue'
import router from '@/router'
import 'virtual:uno.css'
import '@/styles/index.css'

const app = createApp(AppCmp)

const startApp = async (app: App) => {
  app.use(router)
  setupStore(app)
  app.mount('#app')
}

await startApp(app)
