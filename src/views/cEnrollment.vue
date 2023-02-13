<template>
    <div class="home">
  
      <div class="row">
        <navBar />
      </div>
  
  
  
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  
  import navBar from '@/components/public/navBar.vue'
  // import navSecondBar from '@/components/Bruce/navSecondBar.vue'
  
  // import SideBar from '@/components/sideBar.vue';
  // import navSecondBar from '@/components/Bruce/navSecondBar.vue'
  export default {
    name: 'HomeView',
    components: {
      navBar,
      // navSecondBar
      // SideBar
    }
  }
  </script>
  