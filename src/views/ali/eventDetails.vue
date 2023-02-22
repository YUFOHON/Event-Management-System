<template>

  <div class="row" id="navBar">
    <navBar />
  </div>

  <div class="container">

    <div class="card" style="width: 100%;">
  <img src="http://dummyimage.com/186x100.png/dddddd/000000" class="card-img-top" alt="...">
  <div class="card-body">
    <h2 class="card-title">Event Information</h2>
    <div class="row">
      <div class="col-6">
    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Event Name: </li>
        <li class="list-group-item">Date of event: </li>
        <li class="list-group-item">Category: </li>
        <li class="list-group-item">Location: </li>
        <li class="list-group-item">Quota: </li>
        <li class="list-group-item">Target Audience: </li>
        <li class="list-group-item">Age Limit: </li>
      </ul>
    </div>
    <div class="col-6">
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Coach: </li>
        <li class="list-group-item">Staff: </li>
        <li class="list-group-item">Responsibility: </li>
        <li class="list-group-item">Payment Method: </li>
        <li class="list-group-item">Description: </li>
        <li class="list-group-item">Remark: </li>
      </ul>
    </div>
      <div class="text-end"><a href="" class="btn btn-primary float-right">Register</a></div>
    </div>
  </div>
</div>

  </div>

</template>

<script>
import navBar from '@/components/public/navBar.vue'

export default {
  components: {
    navBar,
  }
}
</script>