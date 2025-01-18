import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue'

import App from './App.vue'

// Global css code
import './css/main.css'

const pinia = createPinia()
const app = createApp(App)

// Init Iconify component
app.component('Icon', Icon)

app.use(pinia)

// App Mounting
app.mount('#app')
