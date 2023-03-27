<template>
  <!-- <div class="container-md" >
    <nav class="navbar navbar-expand-xl bg-body-tertiary d-flex justify-content-between ">
      <div class="navPage" >

        <a v-for="(a,index) in props.arr" :key="a.name" :href=a.URL>{{ a.name }} <a v-if="index<props.arr.length-1"> ></a>  </a>
      </div>

      <form v-if="props.searchButton" class="d-flex"  role="search" >
        <input v-model="input" class="form-control me-2" type="search" placeholder="名稱或日期" aria-label="Search">

        <button class="btn btn-outline-danger" type="button"
          @click="searchEvent(sorting = 'Descending')"><font-awesome-icon icon="fa-solid fa-magnifying-glass" /></button>
      </form>
      
      <div v-if="props.sortButton" class="d-flex-button" >
        <ul class="nav gap-3" style="width: 500px;">
        <div class="dropdown" id="sortButton">
          <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"
            data-bs-auto-close="outside">
      
            <font-awesome-icon icon="fa-solid fa-arrow-up-z-a" />
            排序
          </button>
          <div class="dropdown-menu">
            <div class="row  p-4">
              <div class="col col-6" id="category">
                <p class="position-relative  px-5" style="color: red;">類別</p>
                <div class=" p-4 ">
                  <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                    <input v-model="sortCheckbox" value="同路人支援平台" type="checkbox" class="btn-check" id="btncheck1"
                      autocomplete="off">
                    <label class="btn btn-outline-primary" for="btncheck1" style="color: black;  --bs-btn-active-bg:#8a56dd
    ">同路人支援平台</label>

                    <input v-model="sortCheckbox" value="活動義工招募" type="checkbox" class="btn-check" id="btncheck2"
                      autocomplete="off">
                    <label class="btn btn-outline-primary" for="btncheck2"
                      style="color: black;--bs-btn-active-bg:#ff0000">活動義工招募</label>

                    <input v-model="sortCheckbox" value="青年活動" type="checkbox" class="btn-check" id="btncheck3"
                      autocomplete="off">
                    <label class="btn btn-outline-primary" for="btncheck3"
                      style="color: black;--bs-btn-active-bg:#40d859">青年活動</label>

                    <input v-model="sortCheckbox" value="兒童活動" type="checkbox" class="btn-check" id="btncheck4"
                      autocomplete="off">
                    <label class="btn btn-outline-primary" for="btncheck4"
                      style="color: black;--bs-btn-active-bg:#af8221">兒童活動</label>

                  </div>


                </div>
              </div>
              <div class="col col-6 ">
                <p class="position-relative  px-5 " style="color:red">日期</p>
                <div class="p-4 px-5">
                  <div class="btn-group " role="group" aria-label="Basic checkbox toggle button group">
                    <input v-model="sortCheckbox" value="日期升序" type="checkbox" class="btn-check" id="btncheck5"
                      autocomplete="off">
                    <label v-if="!is_D_checked" class="btn btn-outline-primary" style="color: black;"
                      for="btncheck5">升序</label>

                    <input v-model="sortCheckbox" value="日期降序" type="checkbox" class="btn-check" style="color: black;"
                      id="btncheck6" autocomplete="off">
                    <label v-if="!is_A_checked" class="btn btn-outline-primary" style="color:black"
                      for="btncheck6">降序</label>
                  </div>
                </div>
              </div>
              <div class="row" style="padding-left:48%;">
                <button @click="sortEvent" type="btn" class="btn btn-danger "
                  style="width: fit-content;height: 1cm;">確定</button>
              </div>
            </div>
          </div>
        </div>
       
        <router-link to="/events/eventHistory">
          <button v-if="props.eventHistoryButton" type="button" class="btn btn-danger ">
            <font-awesome-icon icon="fa-solid fa-clock-rotate-left" />
            歷史記錄</button>
        </router-link>
  
        <router-link to="/events/eventForm">
          <button v-if="props.addButton" type="button" class="btn btn-danger">
            <font-awesome-icon icon="fa-solid fa-file-import" />
            添加活動
          </button>
        </router-link>
      </ul>
      </div>



    </nav>

  </div> -->

  <nav class="navbar navbar-expand-lg bg-body-tertiary justify-content-between" id="secondbar">
    <div class="container-fluid">

      <div class="navPage">
        <a v-for="(a, index) in props.arr" :key="a.name" :href=a.URL>{{ a.name }} <a v-if="index < props.arr.length - 1">
            ></a> </a>
      </div>

      <button class="navbar-toggler " type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">

        <form v-if="props.searchButton" class="d-flex py-1" style="padding-left: 40%;" role="search">
          <input v-model="input" class="form-control me-2" type="search" placeholder="名稱或日期" aria-label="Search">

          <button class="btn btn-outline-danger" type="button"
            @click="searchEvent(sorting = 'Descending')"><font-awesome-icon
              icon="fa-solid fa-magnifying-glass" /></button>
        </form>

        <div v-if="props.sortButton" class="py-2 " style="margin-left: 16%;">
          <ul class="nav gap-3 ">
            <div class="dropdown" id="sortButton">
              <button type="button" class="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"
                data-bs-auto-close="outside">

                <font-awesome-icon icon="fa-solid fa-arrow-up-z-a" />
                排序
              </button>
              <div class="dropdown-menu">
                <div class="row  p-4">
                  <div class="col col-6" id="category">
                    <p class="position-relative  px-5" style="color: red;">類別</p>
                    <div class=" p-4 ">
                      <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input v-model="sortCheckbox" value="同路人支援平台" type="checkbox" class="btn-check" id="btncheck1"
                          autocomplete="off">
                        <label class="btn btn-outline-primary" for="btncheck1" style="color: black;  --bs-btn-active-bg:#8a56dd
                  ">同路人支援平台</label>

                        <input v-model="sortCheckbox" value="活動義工招募" type="checkbox" class="btn-check" id="btncheck2"
                          autocomplete="off">
                        <label class="btn btn-outline-primary" for="btncheck2"
                          style="color: black;--bs-btn-active-bg:#ff0000">活動義工招募</label>

                        <input v-model="sortCheckbox" value="青年活動" type="checkbox" class="btn-check" id="btncheck3"
                          autocomplete="off">
                        <label class="btn btn-outline-primary" for="btncheck3"
                          style="color: black;--bs-btn-active-bg:#40d859">青年活動</label>

                        <input v-model="sortCheckbox" value="兒童活動" type="checkbox" class="btn-check" id="btncheck4"
                          autocomplete="off">
                        <label class="btn btn-outline-primary" for="btncheck4"
                          style="color: black;--bs-btn-active-bg:#af8221">兒童活動</label>

                      </div>


                    </div>
                  </div>
                  <div class="col col-6 ">
                    <p class="position-relative  px-5 " style="color:red">日期</p>
                    <div class="p-4 px-5">
                      <div class="btn-group " role="group" aria-label="Basic checkbox toggle button group">
                        <input v-model="sortCheckbox" value="日期升序" type="checkbox" class="btn-check" id="btncheck5"
                          autocomplete="off">
                        <label v-if="!is_D_checked" class="btn btn-outline-primary" style="color: black;"
                          for="btncheck5">升序</label>

                        <input v-model="sortCheckbox" value="日期降序" type="checkbox" class="btn-check" style="color: black;"
                          id="btncheck6" autocomplete="off">
                        <label v-if="!is_A_checked" class="btn btn-outline-primary" style="color:black"
                          for="btncheck6">降序</label>
                      </div>
                    </div>
                  </div>
                  <div class="col col-14 ">
                    <p class="position-relative  px-5 " style="color:red">活動數量:{{ perPage }}</p>
                    <input @change="changeEventNumber" v-model="perPage" type="range" class="form-range" id="ageLimit"
                      min="12" max="50">
                  </div>

                  <div class="col col-14" style=" width: 50%; z-index: 999; margin-left: 20%; ">

                    <div class="row">
                      <div class="col col-7 ">

                        <p class="position-relative  " style="color: red;">起始日期</p>

                        <input v-model="startDate" data-format="dd/mm/yyyy" type="date" class="form-control"
                          id="eventDate" aria-describedby="emailHelp">

                      </div>
                      <div class="col col-7 my-4">
                        <p class="position-relative  " style="color: red;">結束日期</p>
                        <input v-model="endDate" data-format="dd/mm/yyyy" type="date" class="form-control" id="eventDate"
                          aria-describedby="emailHelp">
                      </div>
                    </div>
                  </div>

                  <div class="row" style="padding-left:48%;">
                    <button @click="sortEvent" type="btn" class="btn btn-danger "
                      style="width: fit-content;height: 1cm;">確定</button>
                  </div>
                </div>
              </div>
            </div>

            <router-link to="/events/eventHistory">
              <button v-if="props.eventHistoryButton" type="button" class="btn btn-danger ">
                <font-awesome-icon icon="fa-solid fa-clock-rotate-left" />
                歷史記錄</button>
            </router-link>

            <router-link to="/events/eventForm">
              <button v-if="props.addButton" type="button" class="btn btn-danger">
                <font-awesome-icon icon="fa-solid fa-file-import" />
                添加活動
              </button>
            </router-link>
          </ul>
        </div>


      </div>
    </div>
  </nav>
</template>

<script>
import router from '@/router';
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: "navSecondBar",

  props: {
    arr: Array,
    sortButton: { Boolean, default: false },
    eventHistoryButton: { Boolean, default: false },
    addButton: { Boolean, default: false },
    searchButton: { Boolean, default: false },
    isSearchEvents: { Boolean },
  },
  setup(props, context) {
    const input = ref('');
    const isSearchEvent = ref(false);
    const sortCheckbox = ref([]);
    const sorting = ref('');
    const startDate = ref('');
    const endDate = ref('');

    const is_A_checked = computed(
      () => {
        if (sortCheckbox.value.includes('日期升序')) {
          return true;
        } else {
          return false;
        }
      }
    );
    const is_D_checked = computed(
      () => {
        if (sortCheckbox.value.includes('日期降序')) {
          return true;
        } else {
          return false;
        }
      }
    );

    const route = useRoute()
    var category = '';
    const perPage = ref(12);
    // push the query from sortCheckbox to the router
    const sortEvent = async () => {
      // use a variable to store the query from sortCheckbox
      var sorting = sortCheckbox.value.includes('日期升序') ? 'Ascending' : 'Descending';
      //use for loop to add all the query from sortCheckbox to the store in the variable
      // var category = '';
      for (var i = 0; i < sortCheckbox.value.length; i++) {
        // var category = '';
        if (sortCheckbox.value[i] == '日期升序' || sortCheckbox.value[i] == '日期降序') {
          continue;
        } else {
          if (i < sortCheckbox.value.length - 1)
            category += sortCheckbox.value[i] + '|';
          else
            category += sortCheckbox.value[i];

        }
      }

      if (isSearchEvent.value) {
        //get the  query from the router
        router.push({ name: 'events', query: { page: 1, sort: sorting, category: category, input: route.query.input,startDate: startDate.value,endDate:endDate.value } });

      } else
        router.push({ name: 'events', query: { 
          page: 1, sort: sorting, category: category,startDate: startDate.value,endDate:endDate.value
        } });
      //reset the category
      category = '';
    }

    const searchEvent = async () => {

      router.push({ name: 'events', query: { page: 1, sort: sorting.value, input: input.value, category: category } });

    }
    const Descending = async () => {
      if (isSearchEvent.value == true) {
        router.push({ name: 'events', query: { page: 1, sort: 'Descending', input: input.value } });
      } else
        router.push({ name: 'events', query: { page: 1, sort: 'Descending' } });


    }
    const Ascending = async () => {
      if (isSearchEvent.value == true) {
        router.push({ name: 'events', query: { page: 1, sort: 'Ascending', input: input.value } });
      } else if (isSearchEvent.value == false) {
        router.push({ name: 'events', query: { page: 1, sort: 'Ascending' } });

      }

    }

    const changeEventNumber = () => {
      //when the perPage is change emit the event to the parent

      context.emit("changeEventNumber", perPage.value);
    }
    return {
      props, startDate, endDate, searchEvent, input, isSearchEvent, parent, perPage, changeEventNumber,
      Descending, Ascending, sortCheckbox, is_D_checked, is_A_checked, sortEvent, sorting
    };
  },
  // components: { router }
}
</script>

<style scoped>
.btn-outline-primary {
  --bs-btn-border-color: #fff;
  /* --bs-btn-active-bg:#8a56dd */
}

.container-md {
  max-width: 90%;
  border-radius: 20px;
  background-color: #c1c1c153;
}

#secondbar {
  margin-left: 10%;
  max-width: 80%;
  border-radius: 20px;

  background-color: #c1c1c153;
}

.navbar-brand {
  color: rgb(221, 10, 10);
  font-size: 2rem;
  margin-right: 5px;
}

.d-flex-button {
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 25%;
  margin-left: 28%;
}

.form-control {

  width: auto;
}

.dropdown-item:hover {
  background-color: #f8b5;
}

a {
  color: #000000ef;
  text-decoration: none;
  /* size of text increse */
  font-size: 1.2rem;

}

a:hover {
  background-color: #f8b5;
  border-radius: 10px;
}

.btn-group {
  flex-direction: column-reverse
}

.dropdown-menu {

  width: 400px;

}

.d-flex-button[data-v-981ebdd8] {
  margin-left: 20%;
}

.dropdown-menu.show {
  display: block;
  position: absolute;
  will-change: transform;
  top: 0px;
  left: -180px;
  transform: translate3d(0px, 38px, 0px);
}
</style>