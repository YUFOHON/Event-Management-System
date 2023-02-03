<template>
  <nav class="navbar navbar-expand  d-flex flex-column align-item-start text-dark" id="sideBar">

   <ul class="navbar-nav  d-flex flex-column  mt-1 w-100 ">
      <li class="nav-item w-100">
        <a href="#" class="nav-link text-center shadow text-dark text pl-4">
          <i class="bi bi-house"></i>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house" viewBox="0 0 20 20">
  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
</svg>
          Home
        </a>
      </li>
      <li class="nav-item w-100">
        <a href="#" class="nav-link text-center shadow text-dark pl-4">About</a>
      </li>
      <li class="nav-item w-100">
        <a href="#" class="nav-link text-center  shadow text-dark pl-4">Blog</a>
      </li>
      <li class="nav-item dropdown w-100">
        <a href="#" class="nav-link dropdown-toggle text-center shadow text-dark pl-4" id="navbarDropdown" role="button"
          data-bs-toggle="dropdown" aria-expanded="false">Service</a>
        <ul class="dropdown-menu w-100" aria-labelledby="navbarDropdown">
          <li><a href="#" class="dropdown-item text-dark pl-4 p-2">Service 01</a></li>
          <li><a href="#" class="dropdown-item text-dark pl-4 p-2">Service 02</a></li>
          <li><a href="#" class="dropdown-item text-dark pl-4 p-2">Service 03</a></li>
        </ul>
      </li>
      <li class="nav-item w-100">
        <a href="#" class="nav-link text-center shadow text-dark pl-4">Contact</a>
      </li>
    </ul> 


  </nav>







</template>

<script>
export default {
  name: 'sideBar',
  props: {
    msg: String
  }

}
</script>

<style scoped>
.navbar-expand {
  BACKGROUND-COLOR: rgba(238, 238, 238, 0.582);
  /* outline-color: black;
  outline-style: solid;
  outline-width: 1px; */
  height: 100vh;
}

.nav-link {
  color: white;
  font-size: large;
  border-radius: 30px;
}

.nav-link:active,
.nav-link:focus,
.nav-link:hover
 {
  background-color: #99e7f7d3;
  align-content: center;
  border-radius: 30px;
  
}

.navbar-brand {
  color: white;
}

.navbar-nav {
  --bs-nav-link-padding-y: 2rem;
}


</style>