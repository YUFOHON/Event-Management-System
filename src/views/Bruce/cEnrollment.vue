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
          name: '活動紀錄',
          URL: '#'
        }
      ]" :sortButton="false" :eventHistoryButton="false" :addButton="false" :searchButton="false" />
      <div class="d-flex flex-row mb-3 justify-content-center" id="search" style="position: absolute;margin-top: -5px; ">

        <div class="p-2"> <input placeholder="輸入想查找的活動資料" class="form-control" v-model="input" type="text" id="demo">
        </div>
        <!-- <div class="p-2"> <button type="button" @click="search" class="btn btn-danger" id="search">查找</button></div> -->
      </div>
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
                
                <RouterLink :to="{ name: 'feedbackView', params: { id: a.eventID } }">
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
import { onMounted, ref, watch } from 'vue'
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
let arrServerData = ref([]);
const input = ref('');
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
  arrServerData.value = arr.value
}
const search = () => {
if(arr.value.length <= 0)
arr.value = arrServerData.value

  var newArr = arr.value.filter((item) => {
     console.log(item)
    return item.eventName.includes(input.value) || item.userRegistrationRecord[0].Category.includes(input.value) || item.userRegistrationRecord[0].eventDate.includes(input.value);
  });
  // console.log(newArr)
  arr.value = newArr;

  // console.log(input.value)

}
watch(() => input.value, (newVal) => {
  // console.log(newVal.length)
  if (newVal.length <= 0) {
    // fetchHistory()
    // console.log(oldVal)
    arr.value = arrServerData.value
  } else {
    search()
  }
})
onMounted(() => {
  //get the user id from token
  userID.value = localStorage.getItem('userId')
  getEnrollment()
})



</script>
  