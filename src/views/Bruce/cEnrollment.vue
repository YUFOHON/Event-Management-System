<template>
  <div class="home">

    <div class="row">
      <clientNavbar />
    </div>

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
            <tr v-for=" (a, index) in arr" :key="a">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ a.eventName }} </td>
              <td>{{ a.eventDate }}</td>
              <td>{{ a.Category }}</td>
              <td> <button class="btn btn-danger" type="button">Button</button></td>
            </tr>

          </tbody>

        </table>
      </div>

    </div>


  </div>
</template>
  
<script setup>
import clientNavbar from '@/components/ali/clientNavbar.vue'
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
  const response = await fetch('/api/userRegistrationRecord?userID='+userID.value, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },

  })
  const data = await response.json()
  console.log(data)
  arr.value = data.results[0].userRegistrationRecord
}

onMounted(() => {
  //get the user id from token
  userID.value = localStorage.getItem('userId')
  getEnrollment()
})



</script>
  