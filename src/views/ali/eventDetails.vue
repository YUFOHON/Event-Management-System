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
<!-- <div class="col" style="padding-left: 590px;">
  <RouterLink :to="'/events/register/' + event._id" class="btn btn-primary float-right">Register</RouterLink>
</div> -->
<!-- <div class="col" style="padding-left: 590px;">
  <RouterLink :to=" { name: 'eventRegister', params:{eventId:event._id,eventName:event.eventName} } " class="btn btn-primary float-right">註冊</RouterLink>
</div>  -->
   <div class="text-middle" style="padding-left: 590px;"><button @click="routerTo" class="btn btn-primary float-right">Register</button></div>

    </div>
  </div>
</div>

  </div>

</template>

<script>
import navBar from '@/components/public/navBar.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
export default {
  name: 'eventDetails',
  components: {
    navBar,
  },
  setup() {
    //const root = ref(null)
    //const token = ref("");
    //const user = ref({});
    const router = useRouter();
    const event = ref([]);
    const path = useRoute();
    function routerTo() {
      router.push({
        name: `eventRegister`,
        query: {
          eventId: event.value._id,
          eventName: event.value.eventName
        }
      })
    }
    
    onMounted(async function () {
       //get the user id from the token
      // alert(userId);
      var response = await fetch("/api/events/" + path.params.id);
      if (response.ok) {
        event.value = await response.json();
        // delete event.value._id;
        
      } else {
        alert(response.statusText);
      }
    });
  return{
    event,routerTo
  };
  
  },
};
</script>