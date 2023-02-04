import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EventView from '../views/EventView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/events',
    name: 'events',
    component: EventView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes
})

export default router