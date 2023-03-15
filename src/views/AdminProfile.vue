<template>
  <div class="row">
    <navBar />
  </div>
  <div class="backGround">
    <div class="container my-5">
      <div class="center-split">
        <span>
          <img src="../assets/CCF.jpg" class="card-img-top" id="avatar" alt="Avatar" />
        </span>

        <span>
          <form class="row g-3">
          <div class="p-3 py-5">
            <div class="d-flex justify-content-between align-items-center mb-3">
              <h1 class="mx-auto" style="font-weight: bolder;">Profile Settings</h1>
            </div>

            <div class="row mt-8 mt-4">
              <div class="col-md-6"><span class="infoTitle">姓名</span></div>
              <div class="col-md-6"><span class="info">{{ users.username }}</span></div>
            </div>
            <div class="row mt-8">
              <div class="col-md-6"><span class="infoTitle">員工編號</span></div>
              <div class="col-md-6"><span class="info">{{ users.Child_ID }}</span></div>
            </div>
            <div class="row mt-8">
              <div class="col-md-6"><span class="infoTitle">年齡</span></div>
              <div class="col-md-6"><span class="info">{{ users.Age }}</span></div>
            </div>
            <div class="row mt-8">
              <div class="col-md-6"><span class="infoTitle">性別</span></div>
              <div class="col-md-6"><span class="info">{{ users.Sex }}</span></div>
            </div>
            <div class="row mt-8">
              <div class="col-md-6"><span class="infoTitle">員工姓名</span></div>
              <div class="col-md-6"><span class="info">{{ users.Patient_Name }}</span></div>
            </div>


            <div class="col-md-5 mt-4 mx-auto">
              <router-link :to="`/editAProfile/${users._id}`">
                <button class="btn btn-primary profile-button" type="button">Edit Profile</button>
              </router-link>
            </div>

          </div>
          </form>
        </span>
      </div>


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
      var response = await fetch("/api/users/" + token);

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

.backGround {
  background: linear-gradient(0deg, #FF5C58, #FFEDD3);
  padding: 100px;

}

.center-split>* {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2.5rem;
}

.center-split>img,
.center-split>picture,
.center-split>video {
  display: block;
  padding: 0;
  object-fit: cover;
}

@media (min-width: 720px) {

  /* [1] */
  .center-split {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    /*setting 2 columns: 50%wide*/
    align-items: stretch;
    /*2 sides equal in height */
  }

  /* [2] */
  .center-split>*>* {
    max-width: var(--center-split-max-width);
  }

  /* [3] */
  .center-split>*:nth-child(odd)>* {
    margin: 0 0 0 auto;
  }

  .center-split>*:nth-child(even)>* {
    margin: 0 auto 0 0;
  }

  /* [4] */
  .center-split>img,
  .center-split>picture,
  .center-split>video {
    max-width: 100%;
    margin: 0;
  }
}


.container {
  border-top-right-radius: 5%;
  border-top-left-radius: 5%;
  border-bottom-right-radius: 5%;
  border-bottom-left-radius: 5%;
  background-color: #fff;
  min-width: 500px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 15px 30px;
  padding: 30px 20px;
  margin-top: 1px;


}

#avatar {
  border-radius: 50%;
  border: 2px black;
}

.form-control:focus {
  box-shadow: none;
  border-color: #BA68C8
}

.profile-button {
  background: #FE8F8F;
  box-shadow: none;
  border: none
}

.profile-button:hover {
  background: #FCD2D1;
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

.infoTitle {
  /* padding-top:20px; */
  font-size: 20px;
  font-weight: bold;
  padding: 10px;
  /* border-bottom: 3px  black solid; */
}

.info {
  text-align: center;
  /* margin:15px; */
  /* margin:20px; */
  padding: 10px;
}
</style>
