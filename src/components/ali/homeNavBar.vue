<template>

    <nav class="navbar  bg-body-tertiary shadow" style="background-color: white;">
  
      <div class="d-flex align-items-center  me-auto p-2">
        <a class="navbar-brand px-4 " href="/">
          <img src="@/assets/CCF.jpg" alt="Bootstrap" width="50" height="50">
          CRM
        </a>
        <ul class="nav gap-5  ">
          <li class="nav-item">
            <a @mouseover="hover = true" @mouseleave="hover = false" class="nav-link  text-dark" aria-current="page"
              href="https://www.ccf.org.hk/en/">
              <span style="font-size: 1em; color: red;">
              <font-awesome-icon v-if="hover == true" icon="fa-solid fa-house" bounce />
              <font-awesome-icon v-if="hover == false" icon="fa-solid fa-house" />
              </span>
              主頁
            </a>
          </li>
          <li class="nav-item">
          
            <a @mouseover="hoverEvent = true" @mouseleave="hoverEvent = false" class="nav-link" href="/">
              <span style="font-size: 1em; color: red;">
              <font-awesome-icon v-if="hoverEvent" icon="fa-solid fa-calendar-check" bounce />
              <font-awesome-icon v-if="!hoverEvent" icon="fa-solid fa-calendar-check" />
            </span>
              活動
  
            </a>
          </li>
        </ul>
      </div>
  
  
      
      <template v-if="token !== null"> 
      <div class="p-4" >
        <router-link  @mouseover="hoverUser = true" @mouseleave="hoverUser = false" :to="profileRoute" class="userIcon"> 
          <span style="font-size: 1rem; color: red;">
          <font-awesome-icon v-if="hoverUser == true" icon="fa-solid fa-user" bounce size="2xl" />
          <font-awesome-icon v-if="hoverUser == false" icon="fa-solid fa-user" size="2xl" />
          </span>
        </router-link>
        </div>
      </template>
      
      <button v-if="token" class="btn btn-outline-danger mx-2" type="button" @click="logout()">SignOut</button>
      <button v-if="!token" class="btn btn-danger mx-2" type="button" @click="login()">Login</button>
      
  
  
  
  
    </nav>
  </template>
  
  
  <script>
  import { ref } from 'vue'
  export default {
    name: 'homeNavBar',
    props: {
      msg: String
    },
    computed: {
      profileRoute() {
        const role = localStorage.getItem('role');
        // console.log(userIdentity);
        if (role == 'user') {
          return { path: '/cProfile' };
        } else {
          return { path: '/aProfile' };
        }
      },
    },
    setup() {
      let hover = ref(false)
      let hoverUser = ref(false)
      let hoverEvent = ref(false)
      let show = ref(true)
      let token = localStorage.getItem('token');

      const login = async function () {
      location.assign("/login")
    }
  
      const logout = function () {
        alert("Successful logout");
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        location.assign("/login")
      }
  
  
      return {
        hover,
        hoverUser,
        hoverEvent,
        show,
        login,
        logout,
        token
      }
    }
  }
  </script>
  
  <style scoped>
  .navbar-brand {
    color: rgb(221, 10, 10);
    font-size: 2rem;
  }
  
  .navbar {
    --bs-navbar-padding-y: 0rem;
    --bs-navbar-padding-x: 1rem;
  }
  
  .nav-link:hover,
  .nav-link:focus,
  .nav-link:active {
    background-color: #f8b5;
    border-radius: 20px;
  }
  
  .nav-link {
    border-radius: 20px;
  
  }
  
  
  .userIcon,
  .nav-link {
    color: #000000;
  }
  

  </style>

