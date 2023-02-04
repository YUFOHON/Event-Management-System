<template>
  <div class="container-md">
    <nav class="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between ">
      <div class="container-flex ">

        <a v-for="a in props.arr" :key="a.name" class="navbar-brand text-danger" :href=a.URL>{{ a.name }}/</a>

      </div>

      <div class="d-flex-button">
        <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
          Sort
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Date Ascending</a></li>
            <li><a class="dropdown-item" href="#">Date Dscending</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" href="#">Head</a></li>
          </ul>
        </button>
        <button type="button" class="btn btn-secondary">Event History</button>
        <button type="button" class="btn btn-success">Add</button>



      </div>


      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </nav>

  </div>
</template>

<script>
// import { ref } from 'vue'

export default {
  name: 'navSecondBar',
  props: {
    arr: Array
  },
  setup(props) {
    //     const path = ref(props.path)
    // console.log(path)

    return {
      props
    }

  }
}
</script>

<style scoped>
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

.dropdown-menu {

  background-color: #c1c1c153;

}

.dropdown-item:hover {

  background-color: #99e7f7d3;

}
</style>