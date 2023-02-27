<template>

  <div class="row" id="navBar">
    <navBar />
  </div>

  <div class="container">

  <div class="card" :key="event._id" style="width: 100%;">
  <img :src=event.image class="card-img-top" alt="...">
  <div class="card-body">
    <h2 class="card-title">Event Information</h2>
    <div class="row">

      <div class="col-6">
    <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
    <ul class="list-group list-group-flush">

        <li class="list-group-item">Event Name: {{ event.eventName }}</li>

        <li class="list-group-item">Date of event: {{ event.eventDate }} </li>
        <li class="list-group-item">Category: {{ event.Category }} </li>
        <li class="list-group-item">Location: {{ event.eventLocation }} </li>
        <li class="list-group-item">Quota: {{ event.quota }}</li>
        <li class="list-group-item">Target Audience: {{ event.target }} </li>
        <li class="list-group-item">Age Limit: {{ event.ageLimit }} </li>
      </ul>
    </div>

    <div class="col-6">
    <ul class="list-group list-group-flush">
        <li class="list-group-item">Coach: {{ event.coach }} </li>
        <li class="list-group-item">Staff: {{ event.staff }} </li>
        <li class="list-group-item">Responsibility: {{ event.responsibility }}</li>
        <li class="list-group-item">Payment Method: {{ event.pMethod }}</li>
        <li class="list-group-item">Description: {{ event.content }} </li>
        <li class="list-group-item">Remark: {{ event.Remark }} </li>
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
import { ref, onMounted } from 'vue'
//import jwt_decode from "jwt-decode";
import { useRoute } from 'vue-router';

export default {
  name: 'eventDetails',

  components: {
    navBar,
  },


  setup() {
    //const root = ref(null)
    //const token = ref("");
    //const user = ref({});
    const event = ref([]);
    const path = useRoute();

    
    onMounted(async function () {
   
      var response = await fetch("/api/events/" + path.params.id);

      if (response.ok) {
        event.value = await response.json();
        delete event.value._id;
        
      } else {
        alert(response.statusText);
      }

    });

  return{
    event
  };
  
  },

};
</script>

