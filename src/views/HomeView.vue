<template>
  <div class="home">
  
    <div class="row">
        <navBar />
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src

import navBar from '@/components/Bruce/navBar.vue'
// import SideBar from '@/components/sideBar.vue';

export default {
  name: 'HomeView',
  components: {
    navBar
    // SideBar
}
}
</script>
