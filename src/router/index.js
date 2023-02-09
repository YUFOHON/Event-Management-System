import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EventView from '../views/Bruce/EventView.vue'
import EventFormView from '../views/Bruce/EventFormView.vue'
const routes = [
  {//=================================Bruce==========================================================
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/events',
    name: 'events',
    component: EventView
  },
  {
    path: '/events/eventForm/:id',
    name: 'eventForm',
    component: EventFormView
  },

  //==================================================================================================
  //==================================================================================================
  {
    path: '/login',
    name: 'login',
    component: LoginView 
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes
})

export default router