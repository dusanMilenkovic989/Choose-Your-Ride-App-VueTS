import { createApp } from 'vue'
import './assets/styles.css'
import App from './App.vue'
import { ROUTER } from '@/router/appRouter'

createApp(App).use(ROUTER).mount('#app')
