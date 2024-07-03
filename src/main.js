import './assets/styles/main.css'
import './assets/styles/home.css'
import './assets/styles/sidebar.css'
import './assets/styles/table.css'
import './assets/styles/header.css'
import './assets/styles/card.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)
app.mount('#app')
