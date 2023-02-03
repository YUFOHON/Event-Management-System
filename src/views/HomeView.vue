<template>
  <div class="home">
  
    <div class="row">
        <navBar />
      <div class="col-1 ">
        <sideBar msg="yo" />
      </div>
      <div class="col-3">
        <navSearchBar />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import sideBar from '@/components/sideBar.vue'
import navBar from '@/components/navBar.vue'
import navSearchBar from '@/components/navSearchBar.vue'
export default {
  name: 'HomeView',
  components: {
    sideBar,
    navBar,
    navSearchBar
  }
}
</script>
