import { createRouter, createWebHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import EventView from '../views/Bruce/EventView.vue'
import ReportView from '../views/Bruce/ReportView.vue'

// import feedBackView from '../views/Bruce/FeedBackView.vue'

import EventFormView from '../views/Bruce/EventFormView.vue'
import eventHistoryView from '../views/Bruce/EventHistoryView.vue'
import AdminProfile from '../views/AdminProfile.vue'
import ClientProfile from '../views/ClientProfile.vue'
import EditAdminPronpmfile from '../views/EditAdminProfile.vue'
import EditClientProfile from '../views/EditClientProfile.vue'
// import cEnrollment from '../views/Bruce/cEnrollment.vue'
import ClientEnrollment from '../views/ClientEnrollment.vue'
import clientEventView from '../views/ali/clientEventView.vue'


//if you want to use the eventDetails page, uncomment the line below 
//and comment out the line below that
// import eventDetails from '../views/ali/eventDetails.vue'
import eventDetails from '../views/Bruce/ClientEventFormView.vue'
import feedbackView from '../views/feedBackView.vue'
import RecordView from '../views/RecordView.vue'


import UserView from '../views/UserView.vue'
import CreateUserView from '../views/CreateUserView.vue'
import UserDetail from '../views/UserDetail.vue'
import RegisterView from '../views/Bruce/RegisterView.vue'
import SearchView from '../views/SearchView.vue'


const routes = [
  {//=================================Bruce==========================================================
    path: '/',
    name: 'home',
    component: clientEventView
  },
  {
    path: '/report',
    name: 'report',
    component: ReportView,
    meta: { staffAuth: true }
  },

  {
    path: '/events',
    name: 'events',
    component: EventView,
    meta: { staffAuth: true }
  },
  {
    path: '/events/eventForm/:id',
    name: 'eventFormDetail',
    component: EventFormView,
    meta: { staffAuth: true }
  },
  {
    path: '/events/eventForm',
    name: 'eventForm',
    component: EventFormView,
    meta: { staffAuth: true }
  },
  {
    path: '/events/eventHistory',
    name: 'eventHistory',
    component: eventHistoryView,
    meta: { staffAuth: true }
  },
  {
    path: '/events/register',
    name: 'eventRegister',
    component: RegisterView
  },

  //=====================================JOHN=============================================================
  {
    path: '/aProfile',
    name: 'AdminProfile',
    component: AdminProfile,
    meta: { staffAuth: true }
  },
  {
    path: '/cProfile',
    name: 'ClienbtProfile',
    component: ClientProfile
  },
  {
    path: '/editAProfile/:id/',
    name: 'editAdminProfile',
    component: EditAdminPronpmfile,
    meta: { staffAuth: true }
  },
  {
    path: '/editCProfile/:id/',
    name: 'editClientProfile',
    component: EditClientProfile
  },
  {
    path: '/cEnrollment',
    name: 'clientEnrollment',
    component: ClientEnrollment
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
    component: CreateUserView,
    meta: { adminAuth: true }
  },
  {
    path: '/users',
    name: 'users',
    component: UserView,
    meta: { adminAuth: true }
  },
  {
    path: '/user/:id',
    name: 'userDetail',
    component: UserDetail,
    meta: { adminAuth: true }
  },
  {
    path: '/search',
    name: 'SearchView',
    component: SearchView
  },
  {
    path: '/feedBack/:id',
    name: 'feedbackView',
    component: feedbackView
  },
  {
    path: '/feedbackRecord/:eid/:uid',
    name: 'RecordView',
    component: RecordView
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
    alert("請先登入")
    next('/login');
  } else {

    next();
  }
}


if (to.meta.staffAuth) {
  let role = localStorage.getItem('role')
  if (role === "admin" || role === "staff") {
    return next();
  } else {
    alert("您沒有權限登入", 99999);
    router.push({ path: '/cEvents' });
  }
}

if (to.meta.adminAuth) {
  let role = localStorage.getItem('role')
  if (role === "admin") {
    return next();
  } else {
    alert("您沒有權限登入", 99999);
    router.push({ path: '/events' });
  }
}

})


export default router