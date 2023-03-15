<template>
  <div class="home">

    <div class="row">
      <clientNavbar />
    </div>
    <div class="row py-4" id="navSecondBar">
      <navSecondBar :arr="[
        {
          name: '主頁',
          URL: '/events'
        }
        ,
        {
          name: '用戶設定',
          URL: '/cProfile'
        },
        {
          name: '活動參與紀錄',
          URL: '#'
        }
      ]" :sortButton="false" :eventHistoryButton="false" :addButton="false" :searchButton="false" />
    </div>


    <div class="col col-10 py-4" id="table">

      <div class="container" style="padding-left: 25%;">
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
            <tr v-for=" (a, index) in arr" :key="a">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ a.eventName }} </td>
              <td>{{ a.userRegistrationRecord[0].eventDate }}</td>
              <td>{{ a.userRegistrationRecord[0].Category }}</td>
              <td>
                eventID: {{ a.eventID }}
                <RouterLink :to="{ name: 'feedBackView', params: { id: a.eventID } }">
                  <button class="btn btn-danger" type="button">評價活動</button>
                </RouterLink>
              </td>
            </tr>

          </tbody>

        </table>
      </div>

    </div>


  </div>
</template>
  
<script setup>
import clientNavbar from '@/components/ali/clientNavbar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue';
import { onMounted, ref } from 'vue'
// import navSecondBar from '@/components/Bruce/navSecondBar.vue'
// export default {
//   name: 'ClientEnrollmentView',
//   components: {
//     clientNavbar,
//     // navSecondBar
//     // SideBar
//   }
// }
const userID = ref('')
const arr = ref([])
const getEnrollment = async () => {
  const response = await fetch('/api/userRegistrationRecord?userID=' + userID.value, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },

  })
  const data = await response.json()
  // console.log(data)
  arr.value = data.results
}

onMounted(() => {
  //get the user id from token
  userID.value = localStorage.getItem('userId')
  getEnrollment()
})



</script>
  