<template>
    <div class="row" id="clientNavbar">
        <clientNavbar />
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
                    <img :src=url style="width:600px;height:500px ; object-fit:cover;" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h2 class="card-title text-danger" style="padding-left: 220px; font-weight: ;">活動信息</h2>
                        <hr class="bg-danger border-2 border-top border-danger">
                        <div class="row">

                            <div class="col-sm-6">
                                <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                                <ul class="list-group list-group-flush">

                                    <li class="list-group-item">活動名稱：{{ event.eventName }}</li>
                                    <li class="list-group-item">活動日期：{{ event.eventDate }} </li>
                                    <li class="list-group-item">類別：{{ event.Category }} </li>
                                    <li class="list-group-item">地點：{{ event.eventLocation }} </li>
                                    <li class="list-group-item">名額：{{ event.quota }}</li>
                                    <li class="list-group-item">目標受眾：{{ event.target }} </li>
                                    <li class="list-group-item">年齡限制：{{ event.ageLimit }} </li>
                                </ul>
                            </div>

                            <div class="col-sm-6">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">教練：{{ event.coach }} </li>
                                    <li class="list-group-item">工作人員：{{ event.staff }} </li>
                                    <li class="list-group-item">職責：{{ event.responsibility }}</li>
                                    <li class="list-group-item">付款方式：{{ event.pMethod }}</li>
                                    <li class="list-group-item">描述：{{ event.content }} </li>
                                    <li class="list-group-item">備註：{{ event.Remark }} </li>
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
                    :userId="userID" :isApproved="isApproved" />
            </div>
        </div>
    </div>
</template>
  
<script>
import clientNavbar from '@/components/ali/clientNavbar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue'
import registerForm from '@/components/Bruce/registerForm.vue';
// import { url } from 'inspector';
import { ref, onMounted } from 'vue'
// import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
export default {
    name: 'ClientEventFormView',

    components: {
        clientNavbar,
        navSecondBar,
        registerForm
    },


    setup() {

        const event = ref([]);
        const path = useRoute();
        const userID = localStorage.getItem('userId');
        const isRegistered = ref(false);
        const isApproved = ref(false);
        const url = ref('');
        // async function check_reg_record() {

        //     var response = await fetch("/api/events/check_reg_record/userID=" + userID.value);
        //     if (response.ok) {
        //         var result = await response.json();
        //         if (result == true) {
        //             alert("You have already registered for this event");
        //         } else {
        //             // routerTo();
        //         }
        //     } else {
        //         alert(response.statusText);
        //     }


        // }

        onMounted(
            async function () {

                var response = await fetch("/api/events/search?id=" + path.params.id);
                if (response.ok) {
                    // event.value = await response.json();
                    var data = await response.json();
                    event.value = data.results[0];
                    if (event.value.files == undefined) {
                        url.value = "default"
                    } else {
                        var fileFormat = event.value.files[0].split("/")[1].split(";")[0]
                        url.value = '/api/files/' + path.params.id + '.' + fileFormat
                    }

                    //if the user has already registered for this event, the register button will be disabled
                    var regsitrationRecord = event.value.registrationRecord
                    for (var i = 0; i < regsitrationRecord.length; i++) {
                        if (regsitrationRecord[i].userID == userID) {
                            // console.log(regsitrationRecord)
                            isRegistered.value = true;
                            isApproved.value = regsitrationRecord[i].isApproved;
                            break;
                        }
                    }


                } else {
                    alert(response.statusText);
                }

            }
        );

        return {
            url,event, isApproved, registerForm, navSecondBar, userID, isRegistered
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
  