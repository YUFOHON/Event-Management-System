<template>
  <div class="row">
    <navBar />
  </div>
  <div class="backGround">

    <div class="container my-5">
      <div class="center-split">

        <span><img src="../assets/CCF.jpg" class="card-img-top" id="avatar" alt="Avatar" /></span>

        <span>
          <form class="row g-3" @submit.prevent="updateAProfile(users._id)">

              <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <h1 class="mx-auto" style="font-weight: bolder;'">用戶設定</h1>
                </div>
                <div class="row mt-2">
                  <div class="col-md-6"><label class="labels">姓名</label><input type="text" class="form-control"
                      placeholder="Name" v-model="users.username"></div>
                  <div class="col-md-6"><label class="labels">員工編號</label><input type="text" class="form-control"
                      placeholder="" v-model="users.Child_ID"></div>
                </div>
                <div class="row mt-3">
                  <div class="col-md-6"><label class="labels">年齡</label><input type="number" min="0" max="150"
                      class="form-control" placeholder="" v-model="users.Age"></div>
                  <div class="col-md-6"><label class="labels">性別</label>
                    <!-- <input type="text" class="form-control" placeholder="" v-model="users.Sex"> -->
                    <select id="gender" v-model="users.Sex" class="form-control">
                      <option value="M">M</option>
                      <option value="F">F</option>
                    </select>
                  </div>
                </div>

                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="submit">儲存變更</button></div>
              </div>

          </form>
        </span>

      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import moment from 'moment'
import navBar from "@/components/public/navBar.vue";
import { ref, onMounted } from "vue";

// import { useRoute } from "vue-router";
// import navSecondBar from '@/components/Bruce/navSecondBar.vue'

// import SideBar from '@/components/sideBar.vue';
// import navSecondBar from '@/components/Bruce/navSecondBar.vue'
export default {
  name: "ClientProfile",
  components: {
    navBar,
    // navSecondBar
    // SideBar
  },

  methods: {



    async updateAProfile(id) {
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
        location.assign("/aProfile");
      } else {
        alert(response.statusText);
      }
    }

  },
  setup() {


    const users = ref({});
    // const route = useRoute();
    const token = localStorage.getItem("tt");


    // onMounted(async () => {
    //   var response = await fetch("/api/users/" + tt);

    //   if (response.ok) {
    //     var data = await response.json();
    //     users.value = await response.json();
    //   } else {
    //     alert(response.statusText);
    //   }
    // });
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
      users
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
  background: #FCD2D1
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
