import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import './assets/tailwind.css'

const pinia = createPinia()
pinia.use(({ store }) => {
  store.$subscribe(() => {
    localStorage.setItem('board', JSON.stringify(store.board))
  })
})
const app = createApp(App).use(router).use(pinia)

app.component('AppButton')

app.mount('#app')
