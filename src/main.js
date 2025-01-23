import { createApp } from 'vue'
import { Icon } from '@iconify/vue'

import App from './App.vue'

const app = createApp(App)

// Init Iconify component
app.component('Icon', Icon)

// App Mounting
app.mount('#app')
