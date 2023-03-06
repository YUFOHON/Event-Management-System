<template>
    <div class="home">
  
      <div class="row">
        <clientNavbar />
      </div>
  
  
  
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  
  import clientNavbar from '@/components/ali/clientNavbar.vue'
  // import navSecondBar from '@/components/Bruce/navSecondBar.vue'
  
  // import SideBar from '@/components/sideBar.vue';
  // import navSecondBar from '@/components/Bruce/navSecondBar.vue'
  export default {
    name: 'HomeView',
    components: {
      clientNavbar,
      // navSecondBar
      // SideBar
    }
  }
  </script>
  