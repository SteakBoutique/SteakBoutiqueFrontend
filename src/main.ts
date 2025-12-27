import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

// ⚠️ IMPORTANTE: Registrar Pinia ANTES de montar
app.use(createPinia())
app.use(router)

app.mount('#app')
