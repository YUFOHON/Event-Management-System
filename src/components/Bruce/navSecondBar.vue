<template>
  <div class="container-md">
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-flex ">
      <!-- <a class="navbar-brand text-danger" href="#">主頁</a> -->
      <a class="navbar-brand text-danger" href="#">{{props.path}}/</a>
      <a class="navbar-brand text-danger" href="#">{{props.path}}/</a>
      <a class="navbar-brand text-danger" href="#">{{props.path}}/</a>
      <a class="navbar-brand text-danger" href="#">{{props.path}}/</a>


    </div>
  </nav>
</div>
  </template>
  
  <script>
  import { ref } from 'vue'

  export default {
    name: 'navSecondBar',
    props: {
      path: String
    },
    setup(props){
    const path = ref(props.path)
console.log(path)

return {
  props
}

    }
  }
  </script>

  <style scoped>
  .container-md {
    max-width: 70%;
  border-radius: 20px;
    background-color: #c1c1c153;
  }

  .text-danger{

  }
  </style>