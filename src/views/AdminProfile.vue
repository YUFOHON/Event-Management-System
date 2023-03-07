<template>
  <div class="row">
      <navBar />
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

                
                  <div class="row mt-8">
                      <div class="col-md-8"><span class="infoTitle">Name</span></div>
                      <div class="col-md-4"><span class="info">{{ users.username }}</span></div>
                    </div>
                    <div class="row mt-8">
                      <div class="col-md-8"><span class="infoTitle">Staff_ID</span></div>
                      <div class="col-md-4"><span class="info">{{ users.Child_ID }}</span></div>
                    </div>
                    <div class="row mt-8">
                      <div class="col-md-8"><span class="infoTitle">Age</span></div>
                      <div class="col-md-4"><span class="info">{{ users.Age }}</span></div>
                    </div>
                    <div class="row mt-8">
                      <div class="col-md-8"><span class="infoTitle">Sex</span></div>
                      <div class="col-md-4"><span class="info">{{ users.Sex }}</span></div>
                    </div>
                    <div class="row mt-8">
                      <div class="col-md-8"><span class="infoTitle">Staff Name : </span></div>
                      <div class="col-md-4"><span class="info">{{ users.Patient_Name }}</span></div>
                    </div>
                  

                <div class="col-md-5 text-center">
                    <router-link :to="`/editAProfile/${users._id}`">
                      <button class="btn btn-primary profile-button" type="button">Edit Profile</button>
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

import navBar from "@/components/public/navBar.vue";
import { ref, onMounted } from "vue";
// import navSecondBar from '@/components/Bruce/navSecondBar.vue'

// import SideBar from '@/components/sideBar.vue';
// import navSecondBar from '@/components/Bruce/navSecondBar.vue'
export default {
name: "AdminProfile",
components: {
  navBar,
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

.infoTitle{
/* padding-top:20px; */
font-size:20px;
font-weight: bold;
padding: 10px;
/* border-bottom: 3px  black solid; */
}

.info{
  text-align: center;
  /* margin:15px; */
  /* margin:20px; */
  padding:10px;
}


</style>
