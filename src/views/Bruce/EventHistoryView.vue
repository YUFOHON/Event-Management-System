<template>
    <navBar />
    <div class="row py-4" id="navSecondBar">
    <navSecondBar :arr="[
        {
            name: '主頁',
            URL: '/'
        }
        ,
        {
            name: '活動',
            URL: '/events'
        }
        ,
        {
            name: '活動歷史',
            URL: '#'
        }
    ]" :sortButton="true" :eventHistoryButton="false" :addButton="false" :searchButton="true"
        :isSearchEvents="isSearchEvents" ref="navSecondBar" />
</div>


<div class="col col-10" id="table">

<table class="table table-danger table-striped-columns">
  <thead class="table-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Date</th>
      <th scope="col">Category</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
   <td> <button class="btn btn-danger" type="submit">Button</button></td>
    </tr>
  
  </tbody>

</table>
</div>




</template>

<script>
// import { useRoute } from 'vue-router'
import navBar from '@/components/public/navBar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue'

export default {
    name: "eventHistoryView",
    components: {
        navBar,
        navSecondBar,
        // pagination,


    },
    setup() {





    }
}
</script>

<style scoped>
.col-10{
    padding-left: 300px;
}


</style>