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
    ]" :sortButton="false" :eventHistoryButton="false" :addButton="false" :searchButton="false"
      :isSearchEvents="isSearchEvents" ref="navSecondBar" />
  </div>


  <div class="col col-10" id="table">

    <table class="table table-Secondary table-striped">
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
        <tr v-for=" (a,index) in arr" :key="a">
          <th scope="row">{{index}}</th>
          <td>{{a.eventName}} </td>
          <td>{{a.eventDate}}</td>
          <td>{{a.Category}}</td>
          <td> <button class="btn btn-danger" type="button">Button</button></td>
        </tr>

      </tbody>

    </table>
  </div>
</template>

<script>
// import { useRoute } from 'vue-router'
import navBar from '@/components/public/navBar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue'
import { ref,onMounted } from 'vue'
export default {
  name: "eventHistoryView",
  components: {
    navBar,
    navSecondBar,
    // pagination,


  },
  setup() {
    let arr = ref([]);
    async function fetchHistory() {
      let response
      response = await fetch('/api/history', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        var data = await response.json();
        arr.value = data.results;

      } else {
        alert(response.statusText);
      }
    }

    onMounted(() => {
      fetchHistory()
    })


    return {
      arr,
      fetchHistory
    }


  }
}
</script>

<style scoped>
.col-10 {
  padding-left: 300px;
}
</style>