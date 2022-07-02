import { createRouter, createWebHistory } from 'vue-router'
import BoardView from '@/views/BoardView'

const routes = [
  {
    path: '/',
    name: 'BoardView',
    component: BoardView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
