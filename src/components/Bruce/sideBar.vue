<template>
  <nav class="navbar navbar-expand  d-flex flex-column align-item-start text-dark" id="sideBar">

    <ul class="navbar-nav  d-flex flex-column  mt-1 w-100 ">
      <li class="nav-item w-100">
        <a @click="this.$emit('setFontSize', 1)" href="#" class="nav-link text-center shadow text-dark text pl-4">
          S
        </a>
      </li>
      <li class="nav-item w-100">
        <a @click="this.$emit('setFontSize', 2)" href="#" class="nav-link text-center shadow text-dark pl-4">M</a>
      </li>
      <li class="nav-item w-100">
        <a @click="this.$emit('setFontSize', 3)" href="#" class="nav-link text-center  shadow text-dark pl-4">L</a>
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
  BACKGROUND-COLOR: rgb(255, 255, 255);
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
.nav-link:hover {
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