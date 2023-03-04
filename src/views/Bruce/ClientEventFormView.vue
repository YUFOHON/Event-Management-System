<template>
    <div class="row" id="navBar">
        <navBar />
    </div>

    <div class="row py-4">
        <navSecondBar :arr="[
            {
                name: '主頁',
                URL: '/'
            }
            ,
            {
                name: '活動',
                URL: '/cEvents'
            }
            ,
            {
                name: '註冊表格',
                URL: '#'
            }]" :sortButton="false" :eventHistoryButton="false" :addButton="false" :searchButton="false" />
    </div>


    <div class="container">
        <div class="row">
            <div class="col-sm">
                <div class="card " :key="event._id">
                    <img :src=event.image class="card-img-top" alt="...">
                    <div class="card-body">
                        <h2 class="card-title text-danger" style="padding-left: 220px; font-weight: ;">活動信息</h2>
                        <hr class="bg-danger border-2 border-top border-danger">
                        <div class="row">

                            <div class="col-sm-6">
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

                            <div class="col-sm-6">
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
                            <!-- <div class="text-middle" style="padding-left: 590px;">
              <button @click="routerTo"
                class="btn btn-primary float-right">Register</button>
              </div> -->
                        </div>
                    </div>


                </div>
            </div>

            <div class="col-sm">
                <registerForm :isRegistered="isRegistered" :eventID="event._id" :eventName="event.eventName"
                    :userId="userID" />
            </div>
        </div>
    </div>
</template>
  
<script>
import navBar from '@/components/public/navBar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue'
import registerForm from '@/components/Bruce/registerForm.vue';
import { ref, onMounted } from 'vue'
// import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
export default {
    name: 'eventDetails',

    components: {
        navBar,
        navSecondBar,
        registerForm
    },


    setup() {
        //const root = ref(null)
        //const token = ref("");
        //const user = ref({});

        // const router = useRouter();
        const event = ref([]);
        const path = useRoute();
        const userID = localStorage.getItem('userId');
        const isRegistered = ref(false);
        //   function routerTo() {
        //     router.push({
        //       name: `eventRegister`,
        //       query: {
        //         eventId: event.value._id,
        //         eventName: event.value.eventName
        //       }
        //     })
        //   }

        async function check_reg_record() {

            var response = await fetch("/api/events/check_reg_record/userID=" + userID.value);
            if (response.ok) {
                var result = await response.json();
                if (result == true) {
                    alert("You have already registered for this event");
                } else {
                    // routerTo();
                }
            } else {
                alert(response.statusText);
            }


        }

        onMounted(async function () {


            //get the user id from the token
            // alert(userId);
            // var response = await fetch("/api/events/search?id=" + path.params.id);
            var response = await fetch("/api/events/search?id=" + path.params.id);

            if (response.ok) {
                // event.value = await response.json();
                var data = await response.json();
                event.value = data.results[0];
                //if the user has already registered for this event, the register button will be disabled
                var regsitrationRecord = event.value.registrationRecord
                for (var i = 0; i < regsitrationRecord.length; i++) {
                    if (regsitrationRecord[i].userID == userID) {
                        console.log(regsitrationRecord)
                        isRegistered.value = true;
                        break;
                    }
                }


            } else {
                alert(response.statusText);
            }

        });

        return {
            event, check_reg_record, registerForm, navSecondBar, userID, isRegistered
        };

    },

};
</script>
  
<style scoped>
.container {
    /* border-radius: 100%; */
    display: flex;
    flex-direction: column;
    background-image: url("@/assets/city.jpg");
    /* background-size: 100% 100%;
    background-attachment: fixed; */

    width: 100%;
    height: 100%;
    min-width: 100%;
    min-height: 1000px;

    justify-content: center;
    align-items: center;
    /* padding-bottom: 10px; */

}

.card {

    border-top-right-radius: 5%;
    border-top-left-radius: 5%;
    border-bottom-right-radius: 5%;
    border-bottom-left-radius: 5%;
    background-color: #fff;
    min-width: 500px;
    min-height: 850px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 15px 30px;
    padding: 30px 20px;
    margin-top: 1px;

}
</style>
  