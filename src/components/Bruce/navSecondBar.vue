<template>
  <div  class="container-md">
    <nav  class="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between ">
      <div class="container-flex ">

        <a v-for="a in props.arr" :key="a.name" :href=a.URL>{{ a.name }}/</a>
      </div>

      <div v-if="props.sortButton" class="d-flex-button">

        <div class="dropdown" id="sortButton">
          <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"
            data-bs-auto-close="outside">
            Sort
          </button>
          <div class="dropdown-menu">
            <div class="row  p-4">
              <div class="col col-6" id="category">
                <p class="position-relative  px-5">類別</p>
                <div class=" p-4 ">
                  <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                    <input v-model="sortCheckbox" value="同路人支援平台" type="checkbox" class="btn-check" id="btncheck1"
                      autocomplete="off">
                    <label class="btn btn-outline-primary" for="btncheck1" style="  --bs-btn-active-bg:#8a56dd
">同路人支援平台</label>

                    <input v-model="sortCheckbox" value="活動義工招募" type="checkbox" class="btn-check" id="btncheck2"
                      autocomplete="off">
                    <label class="btn btn-outline-primary" for="btncheck2" style="--bs-btn-active-bg:#ff0000">活動義工招募</label>

                    <input v-model="sortCheckbox" value="青年活動" type="checkbox" class="btn-check" id="btncheck3"
                      autocomplete="off">
                    <label class="btn btn-outline-primary" for="btncheck3" style="--bs-btn-active-bg:#40d859">青年活動</label>

                    <input v-model="sortCheckbox" value="兒童活動" type="checkbox" class="btn-check" id="btncheck4"
                      autocomplete="off">
                    <label class="btn btn-outline-primary" for="btncheck4" style="--bs-btn-active-bg:#af8221">兒童活動</label>

                  </div>


                </div>
              </div>
              <div class="col col-6 ">
                <p class="position-relative  px-5 ">日期</p>
                <div class="p-4 px-5">
                  <div class="btn-group " role="group" aria-label="Basic checkbox toggle button group">
                    <input v-model="sortCheckbox" value="日期升序" type="checkbox" class="btn-check" id="btncheck5"
                      autocomplete="off">
                    <label v-if="!is_D_checked" class="btn btn-outline-primary" for="btncheck5">升序</label>

                    <input v-model="sortCheckbox" value="日期降序" type="checkbox" class="btn-check" id="btncheck6"
                      autocomplete="off">
                    <label v-if="!is_A_checked" class="btn btn-outline-primary" for="btncheck6">降序</label>
                  </div>
                </div>
              </div>
              <div class="row" style="padding-left:48%;">
                <button @click="sortEvent" type="btn" class="btn btn-primary "
                  style="width: fit-content;height: 1cm;">確定</button>
              </div>
            </div>
          </div>
        </div>
        <router-link to="/events/eventHistory">
          <button v-if="props.eventHistoryButton" type="button" class="btn btn-secondary">Event History</button>
        </router-link>

        <router-link to="/events/eventForm">
          <button v-if="props.addButton" type="button" class="btn btn-success">Add</button>
        </router-link>
      </div>

      <form v-if="props.searchButton" class="d-flex" role="search">
        <input v-model="input" class="form-control me-2" type="search" placeholder="Search" aria-label="Search">

        <button class="btn btn-outline-success" type="button" @click="searchEvent(sorting = 'Descending')">Search</button>
      </form>
    </nav>

  </div>
</template>

<script>
import router from '@/router';
import { ref } from 'vue'
import { computed } from 'vue'
// import { inject } from 'vue'
// import router from '@/router';
// import { getCurrentInstance } from "vue";
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
  setup(props) {
    const input = ref('');
    const isSearchEvent = ref(false);
    const sortCheckbox = ref([]);
    const sorting = ref('');
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
      console.log(category)
      if (isSearchEvent.value) {
        //get the  query from the router
        router.push({ name: 'events', query: { page: 1, sort: sorting, category: category, input: route.query.input } });

      } else
        router.push({ name: 'events', query: { page: 1, sort: sorting, category: category } });
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




    return {
      props, searchEvent, input, isSearchEvent, parent,
      Descending, Ascending, sortCheckbox, is_D_checked, is_A_checked, sortEvent, sorting
    };
  },
  // components: { router }
}
</script>

<style scoped>
.btn-outline-primary{

  --bs-btn-border-color:#fff;
  /* --bs-btn-active-bg:#8a56dd */


}

.container-md {
  max-width: 90%;
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
</style>