<template>

  <nav class="navbar  bg-body-tertiary shadow " style="background-color: white;">
    <div class="container gap-5 justify-content-start">


      <a class="navbar-brand px-4 " href="#">
        <img src="@/assets/CCF.jpg" alt="Bootstrap" width="50" height="50">
        CRM
      </a>
      
      <ul class="nav gap-5  ">
        <li class="nav-item">
          <a class="nav-link  text-dark" aria-current="page" href="#">
            <font-awesome-icon icon="fa-solid fa-house" spin   />
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
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>

    </div>
  </nav>

</template>



<script>
export default {
  name: 'navBar',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.navbar-brand {
  color: rgb(221, 10, 10);
  font-size: 2rem;
}

.container {
  margin-left: 0%;
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
</style>