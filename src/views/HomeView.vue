<template>
  <div class="home">

    <div class="row">
      <navBar />
    </div>
    <div class="row py-4">
      <navSecondBar :arr="[
        {
    name: '主頁',
    URL: '/'
  }
        , 
        {
    name: '活動',
    URL: 'Event'
  }
        , 
        {
    name: 'Veronica',
    URL: 'Veridian Dynamics'
  }]"/>
    </div>


  </div>
</template>

<script>
// @ is an alias to /src

import navBar from '@/components/Bruce/navBar.vue'
// import SideBar from '@/components/sideBar.vue';
import navSecondBar from '@/components/Bruce/navSecondBar.vue'
export default {
  name: 'HomeView',
  components: {
    navBar,
    navSecondBar
    // SideBar
  }
}
</script>
