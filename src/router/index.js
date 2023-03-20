import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EventView from '../views/Bruce/EventView.vue'
import EventFormView from '../views/Bruce/EventFormView.vue'
import eventHistoryView from '../views/Bruce/EventHistoryView.vue'
import AdminProfile from '../views/AdminProfile.vue'
import ClientProfile from '../views/ClientProfile.vue'
import EditAdminProfile from '../views/EditAdminProfile.vue'
import EditClientProfile from '../views/EditClientProfile.vue'
import cEnrollment from '../views/Bruce/cEnrollment.vue'
import clientEventView from '../views/ali/clientEventView.vue'
import testView from '../views/NicoleTam/testView.vue'


//if you want to use the eventDetails page, uncomment the line below 
//and comment out the line below that
// import eventDetails from '../views/ali/eventDetails.vue'
import eventDetails from '../views/Bruce/ClientEventFormView.vue'
import feedBackView from '../views/feedBackView.vue'


import UserView from '../views/UserView.vue'
import CreateUserView from '../views/CreateUserView.vue'
import UserDetail from '../views/UserDetail.vue'
import RegisterView from '../views/Bruce/RegisterView.vue'

const routes = [
  {//=================================Bruce==========================================================
    path: '/',
    name: 'home',
    component: clientEventView
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
  {
    path: '/events/register',
    name: 'eventRegister',
    component: RegisterView
  },
  {
    path: '/feedBack/:id',
    name: 'feedBackView',
    component: feedBackView
  },
  //=====================================JOHN=============================================================
  {
    path: '/aProfile',
    name: 'AdminProfile',
    component: AdminProfile,
    meta: { adminAuth: true }
  },
  {
    path: '/cProfile',
    name: 'ClienbtProfile',
    component: ClientProfile
  },
  {
    path: '/editAProfile/:id/',
    name: 'editAdminProfile',
    component: EditAdminProfile,
    meta: { adminAuth: true }
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
  {
    path: '/user/:id',
    name: 'userDetail',
    component: UserDetail
  },
  {
    path: '/test',
    name: 'test',
    component: testView
  },


  //----------------------------------------------ALI route handlers--------------
  //--------------------------------------------------------
  {
    path: '/eventDetails/:id',
    name: 'eventDetails',
    component: eventDetails
  },

  {
    path: '/cEvents',
    name: 'clientEventView',
    component: clientEventView
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {


  if (to.path === '/login' || to.path === '/') {
    next();
  } else {
    let token = localStorage.getItem('token');
    // console.log(token)

    if (!token) {
      alert("Please login first.")
      next('/login');
    } else {

      next();
    }
  }

  if (to.meta.adminAuth) {
    let role = localStorage.getItem('role')
    if (role === "admin") {
      return next();
    } else {
      // alert("You don't have the access right.");
      router.push({ path: '/' });
    }
  }

})


export default router