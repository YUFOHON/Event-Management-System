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
    ]" :sortButton="false" :eventHistoryButton="false" :addButton="false" :searchButton="false" />

    <div class="d-flex flex-row mb-3 justify-content-center" id="search" style="position: absolute;margin-top: -5px; ">

      <div class="p-2"> <input placeholder="輸入活動資料" class="form-control" v-model="input" type="text" id="demo"></div>
      <!-- <div class="p-2"> <button type="button" @click="search" class="btn btn-danger" id="search">查找</button></div> -->
    </div>


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
</template>

<script>
// import { useRoute } from 'vue-router'
import navBar from '@/components/public/navBar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue'
import { ref, onMounted, watch } from 'vue'
export default {
  name: "eventHistoryView",
  components: {
    navBar,
    navSecondBar,
    // pagination,


  },
  setup() {
    let arr = ref([]);
    let arrServerData = ref([]);
    const input = ref('');
    //watch the input value, if the input value is empty then show all the data
    watch(() => input.value, (newVal, oldVal) => {
      console.log(oldVal)
      console.log(newVal.length)
      if (newVal.length <= 0) {
        // fetchHistory()
        arr.value = arrServerData.value
      } else {
        search()
      }
    })


    const search = () => {

      if(arr.value.length <= 0)
      {
        arr.value = arrServerData.value
      }
      var newArr = arr.value.filter((item) => {
        return item.eventName.includes(input.value)||item.eventDate.includes(input.value)||item.Category.includes(input.value);
      });

      arr.value = newArr;

      // console.log(input.value)

    }

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
        arrServerData.value = arr.value
      } else {
        alert(response.statusText);
      }
    }

    onMounted(() => {
      fetchHistory()
    })


    return {
      arr,
      input,
      fetchHistory,
      search
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