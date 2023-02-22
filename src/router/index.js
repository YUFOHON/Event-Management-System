import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EventView from '../views/Bruce/EventView.vue'
import EventFormView from '../views/Bruce/EventFormView.vue'
import eventHistoryView from '../views/Bruce/EventHistoryView.vue'
import AdminProfile from '../views/AdminProfile.vue'
import ClientProfile from '../views/ClientProfile.vue'
import EditAdminProfile from '../views/EditAdminProfile.vue'
import EditClientProfile from '../views/EditClientProfile.vue'
import cEnrollment from '../views/cEnrollment.vue'
import eventDetails from '../views/ali/eventDetails.vue'
import UserView from '../views/UserView.vue'
import CreateUserView from '../views/CreateUserView.vue'

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
  {
    path: '/events/eventHistory',
    name: 'eventHistory',
    component: eventHistoryView
  },
  //=====================================JOHN=============================================================
  {
    path: '/aProfile',
    name: 'AdminProfile',
    component: AdminProfile
  },
  {
    path: '/cProfile',
    name: 'ClienbtProfile',
    component: ClientProfile
  },
  {
    path: '/editAProfile/:id/',
    name: 'editAdminProfile',
    component: EditAdminProfile
  },
  {
    path: '/editCProfile/:id/',
    name: 'editClientProfile',
    component: EditClientProfile
  },  
  {
    path: '/cEnrollment/',
    name: 'clientEnrollment',
    component: cEnrollment
  },
  
  //=====================Nicoles======================//
  {
    path: '/login',
    name: 'login',
    component: LoginView 
  },
  {
    path: '/createUser',
    name: 'createUser',
    component: CreateUserView
  },
  {
    path: '/users',
    name: 'users',
    component: UserView 
  },


  //----------------------------------------------ALI route handlers--------------
  //--------------------------------------------------------
  {
    path: '/eventDetails',
    name: 'eventDetails',
    component: eventDetails 
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes
})

export default router