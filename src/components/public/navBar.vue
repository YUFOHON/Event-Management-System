<template>

  <nav class="navbar  bg-body-tertiary shadow" style="background-color: white;">
    <!-- <div class="d-flex  align-items-center"> -->

    <div class="d-flex align-items-center  me-auto p-2">
      <a class="navbar-brand px-4 " href="#">
        <img src="@/assets/CCF.jpg" alt="Bootstrap" width="50" height="50">
        CRM
      </a>
      <ul class="nav gap-5  ">
        <li class="nav-item">
          <a @mouseover="hover = true" @mouseleave="hover = false" class="nav-link  text-dark" aria-current="page"
            href="#">

            <font-awesome-icon v-if="hover == true" icon="fa-solid fa-house" bounce />
            <font-awesome-icon v-if="hover == false" icon="fa-solid fa-house" />
            主頁
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Feedback</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item">
          <a class="nav-link ">Disabled</a>
        </li>
      </ul>
    </div>

    <div class="p-4">
      <router-link @mouseover="hoverUser = true" @mouseleave="hoverUser = false" to="/" class="userIcon">
        <font-awesome-icon v-if="hoverUser == true" icon="fa-solid fa-user" bounce size="2xl" />
        <font-awesome-icon v-if="hoverUser == false" icon="fa-solid fa-user" size="2xl" />
      </router-link>

    </div>

    <!-- </div> -->
  </nav>




</template>



<script>
import { ref } from 'vue'
export default {
  name: 'navBar',
  props: {
    msg: String
  },
  setup() {
    let hover = ref(false)
    let hoverUser = ref(false)
    return {
      hover,
      hoverUser
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
  background-color: #99e7f7d3;
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