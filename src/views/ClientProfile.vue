<template>
    <div class="row">
        <clientNavbar />
    </div>

    <div class="container rounded bg-white mt-5 mb-5"  >
      <div class="row">
          <form class="row g-3" >
            <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                  <!-- <img class="rounded-circle mt-5" width="300px" :src="require(`../assets/CCF.jpg`)"> -->
                  <img src="../assets/CCF.jpg" class="card-img-top" id="avatar" alt="Avatar" />
                </div>
            </div>
            <div class="col-md-5 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">Profile Settings</h4>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6"><label class="labels">Name : </label>{{ users.username }}</div>
                        <div class="col-md-6"><label class="labels">Child_ID :  </label>{{ users.Child_ID }}</div>
                    </div>
                    <div class="row mt-3">
                        <div class="col-md-6"><label class="labels">Age : </label>{{ users.Age }}</div>
                        <div class="col-md-6"><label class="labels">Gender :  </label>{{ users.Sex }}</div>
                        <div class="col-md-12"><label class="labels">Hospital : </label>{{ users.Hospital }}</div>
                        <div class="col-md-12"><label class="labels">Diagnosis :  </label>{{ users.Diagnosis }}</div>
                    </div>
                    

                  <div class="col-md-5 text-center">
                      <router-link :to="`/editCProfile/${users._id}`">
                        <button class="btn btn-primary profile-button" type="button">Edit Profile</button>
                      </router-link>
                  </div>


                    
                    
                </div>
            </div>
            <div class="col-md-4">
                <div class="p-3 py-5">
                      <div class="col-md-12"><label class="labels">Responsible_Worker : </label>{{ users.Responsible_Worker }}</div>
                      <div class="col-md-12"><label class="labels">Date_of_open : </label>{{ users.Date_of_open }}</div>
                      <div class="col-md-12"><label class="labels">Onset_date : </label>{{ users.Onset_date }}</div>
                      <div class="col-md-12"><label class="labels">Relapsed_date :  </label>{{ users.Relapsed_date }}</div>
                      <div class="col-md-12"><label class="labels">Contact_person : </label>{{ users.Contact_person }}</div>
                      <div class="col-md-12"><label class="labels">Relationship : </label>{{ users.Relationship }}</div>
                      <!-- <div class="col-md-12"><label class="labels">Sibling(1)</label><input type="text" class="form-control" placeholder="education" v-model='users.Sibling(1)''></div>
                      <div class="col-md-12"><label class="labels">Age(1)</label><input type="text" class="form-control" placeholder="education" v-model="users.Age(1)"></div> -->
                      <div class="col-md-5 text-center">
                        <!-- <router-link :to="`/cEnrollment/${users._id}`"> -->
                        <router-link :to="`/cEnrollment`">
                          <button class="btn btn-primary profile-button" type="">Your Enrollment</button>
                        </router-link>
                      </div>
                </div>
            </div>



          </form>
        </div>
    </div>

</template>
  
  <script>
// @ is an alias to /src

import clientNavbar from "@/components/ali/clientNavbar.vue";
import { ref, onMounted } from "vue";
// import navSecondBar from '@/components/Bruce/navSecondBar.vue'

// import SideBar from '@/components/sideBar.vue';
// import navSecondBar from '@/components/Bruce/navSecondBar.vue'
export default {
  name: "ClientProfile",
  components: {
    clientNavbar,
    // navSecondBar
    // SideBar
  },
  // data() {
  //   return {
  //     token: null,
  //   };
  // },
  // mounted(){
  //   this.token = localStorage.getItem('tt');
  // },
  setup() {
    const users = ref([]);
    const token = localStorage.getItem("tt");

    const fetchData = async function () {
      var response = await fetch("/api/users/"+token);

      if (response.ok) {
        var data = await response.json();
        // console.log(token);

        users.value = data.users;
      } else {
        alert(response.statusText);
      }
    };

    onMounted(function () {
      fetchData();
    });

    return {
      users,
    };
  },
};
</script>


<style scoped>
/* body {
    background: rgb(99, 39, 120)
} */

#avatar{
  border-radius: 50%;
  border:2px black;
}

.form-control:focus {
    box-shadow: none;
    border-color: #BA68C8
}

.profile-button {
    background: rgb(99, 39, 120);
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: #682773
}

.profile-button:focus {
    background: #682773;
    box-shadow: none
}

.profile-button:active {
    background: #682773;
    box-shadow: none
}

.back:hover {
    color: #682773;
    cursor: pointer
}

.labels {
    font-size: 18px
}

.add-experience:hover {
    background: #BA68C8;
    color: #fff;
    cursor: pointer;
    border: solid 1px #BA68C8
}


</style>
  