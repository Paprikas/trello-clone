import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/tailwind.css'

const app = createApp(App).use(router).use(createPinia())

app.component('AppButton')

app.mount('#app')
