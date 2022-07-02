import { createRouter, createWebHistory } from 'vue-router'
import BoardView from '@/views/BoardView'
import TaskView from '@/views/TaskView'

const routes = [
  {
    path: '/',
    name: 'BoardView',
    component: BoardView,
    children: [
      {
        path: '/tasks/:id',
        name: 'TaskView',
        component: TaskView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
