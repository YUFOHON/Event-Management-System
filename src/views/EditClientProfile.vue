<template>
  <div class="row">
      <clientNavbar />
  </div>

  <div class="container rounded bg-white mt-5 mb-5"  >
    <div class="row">
        <form class="row g-3" @submit.prevent="updateCProfile(users._id)">
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
                      <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" placeholder="Name" v-model="users.username"></div>
                      <div class="col-md-6"><label class="labels">Child_ID</label><input type="text" class="form-control" placeholder="" v-model="users.Child_ID"></div>
                  </div>
                  <div class="row mt-3">
                      <div class="col-md-6"><label class="labels">Age</label><input type="number" min="0" max="150" class="form-control" placeholder="" v-model="users.Age"></div>
                      <div class="col-md-6"><label class="labels">Gender</label>
                        <!-- <input type="text" class="form-control" placeholder="" v-model="users.Sex"> -->
                      <select id="gender" v-model="users.Sex" class="form-control">
                          <option value="M">M</option>
                          <option value="F">F</option>
                      </select>
                    </div>
                      <div class="col-md-12"><label class="labels">Hospital</label><input type="text" class="form-control" placeholder="" v-model="users.Hospital"></div>
                      <div class="col-md-12"><label class="labels">Diagnosis</label><input type="text" class="form-control" placeholder="" v-model="users.Diagnosis"></div>
                    
                  </div>

                  <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="submit">Save Profile</button></div>
              </div>
          </div>
          <div class="col-md-4">
              <div class="p-3 py-5">
                  <div class="col-md-12"><label class="labels">Responsible_Worker</label><input type="text" class="form-control" placeholder="" v-model="users.Responsible_Worker"></div>
                    <div class="col-md-12"><label class="labels">Date_of_open</label><input type="date" data-format="dd/mm/yyyy"  class="form-control" placeholder="" v-model="users.Date_of_open"></div>
                    
                     <!-- <input v-model="users.Date_of_open" data-format="dd/mm/yyyy" type="date" class="form-control" > -->
                    <div class="col-md-12"><label class="labels">Onset_date</label><input type="date" data-format="dd/mm/yyyy" class="form-control" placeholder="" v-model="users.Onset_date"></div>
                    <div class="col-md-12"><label class="labels">Relapsed_date</label><input type="date" data-format="dd/mm/yyyy" class="form-control" placeholder="" v-model="users.Relapsed_date"></div>
                    <div class="col-md-12"><label class="labels">Contact_person</label><input type="text" class="form-control" placeholder="" v-model="users.Contact_person"></div>
                    <div class="col-md-12"><label class="labels">Relationship</label><input type="text" class="form-control" placeholder="" v-model="users.Relationship"></div>
                    <!-- <div class="col-md-12"><label class="labels">Sibling(1)</label><input type="text" class="form-control" placeholder="education" v-model='users.Sibling(1)''></div>
                    <div class="col-md-12"><label class="labels">Age(1)</label><input type="text" class="form-control" placeholder="education" v-model="users.Age(1)"></div> -->
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
// import { useRoute } from "vue-router";
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
methods: {
    async updateCProfile(id) {
      // event.preventDefault();
      delete this.users._id;

      

      var response = await fetch("/api/users/" + id, {
        method: "put",
        headers: {
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Content-Type": "application/json",
        },

        // body: new URLSearchParams(new FormData(event.target))
        body: JSON.stringify(this.users),
      });

      if (response.ok) {
        var text = await response.text();
        alert(text);
        location.assign("/cProfile");
      } else {
        alert(response.statusText);
      }
    }
  },
  setup() {
    const users = ref({});
    // const route = useRoute();
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
