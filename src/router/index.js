import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EventView from '../views/Bruce/EventView.vue'
import EventFormView from '../views/Bruce/EventFormView.vue'
import eventDetails from '../views/ali/eventDetails.vue'
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
    name: 'eventFormDetail',
    component: EventFormView
  },
  {
    path: '/events/eventForm',
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


  //----------------------------------------------ALI route handlers--------------
  //--------------------------------------------------------
  {
    path: '/eventDetails',
    name: 'eventDeatils',
    component: eventDetails 
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes
})

export default router