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
  


  <div class="col col-10 py-4" id="table">

    <div class="container">
    <table class="table table-Secondary table-striped">
      <thead class="table-light">
        <tr>
          <th scope="col">編號</th>
          <th scope="col">活動名稱</th>
          <th scope="col">日期</th>
          <th scope="col">種類</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for=" (a,index) in arr" :key="a">
          <th scope="row">{{index+1}}</th>
          <td>{{a.eventName}} </td>
          <td>{{a.eventDate}}</td>
          <td>{{a.Category}}</td>
          <!-- <td> <button class="btn btn-danger" type="button">Button</button></td> -->
        </tr>

      </tbody>

    </table>
  </div>

  </div>
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

.container {

  background-color: #fff;
  min-width: 500px;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 15px 30px;
  padding: 30px 20px;
  margin-top: 1px;
}
</style>