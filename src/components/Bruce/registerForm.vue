<template>
  <div class="regContainer">
    <form v-if="!props.isRegistered" @submit.prevent="register">

      <div class="row ">
        <label for="eventName" class="form-label text-center text-danger" style="font-size: 40px; padding-bottom: 20px;">
          {{ props.eventName }} 活動登記表</label>
        <hr class="bg-danger border-2 border-top border-danger">
      </div>


      <div class="row">
        <label for="name" class="form-label text"> 家長姓名:<label class="text-danger"> *</label></label>
        <input placeholder="陳大文" v-model="result.name" type="text" class="form-control" id="eventName"
          aria-describedby="emailHelp" required>
      </div>



      <div class="row">
        <label for="eventName" class="form-label text"> 聯絡電話號碼:<label class="text-danger"> *</label></label>
        <input v-model="result.phone" placeholder="12345678
                                                  " type="text" class="form-control" id="eventName"
          aria-describedby="emailHelp" required>
      </div>

      <div class="row" id="checkBoxCluster">
        <label for="eventName" class="form-label text"> 請選擇???:<label class="text-danger"> *</label></label>
        <div class="col" id="checkBox1">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault1">
            <label class="form-check-label" for="flexCheckDefault">
              checkbox
            </label>
          </div>
        </div>
        <div class="col" id="checkBox2">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault2">
            <label class="form-check-label" for="flexCheckDefault">
              checkbox
            </label>
          </div>
        </div>
        <div class="col" id="checkBox3">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault3">
            <label class="form-check-label" for="flexCheckDefault">
              checkbox
            </label>
          </div>
        </div>

      </div>

      <div class="row" id="email">
        <label for="email" class="form-label text"> Email:<label class="text-danger"> *</label></label>
        <input placeholder="example@gmail.com" v-model="result.email" type="email" class="form-control" id="eventName"
          aria-describedby="emailHelp" required>
      </div>

      <div v-if="empty" class="form-error-message" role="alert">
        <label for="name" class="form-sub-label text-danger"
          style="padding-left: 170px; padding-top: 20px; font-weight: bold;"> 請填寫所有必填項.<label class="text-danger">
            *</label></label>
      </div>

      <div class="b">

        <div v-if="loading" class="spinner-border text-danger" role="status"
          style="margin-left: 200px; margin-top: 20px;">
          <span class="visually-hidden">Loading...</span>
        </div>

        <button v-if="!loading" type="summit" class="btn btn-danger"
          style="margin-left: 200px; margin-top: 20px;">提交</button>
      </div>




    </form>

    <form v-if="props.isRegistered" @submit.prevent="register">



      <div class="b" style="margin-top: 190px;">
        <span style="font-size: 250px; color: greenyellow; margin-left: 100px;">

          <font-awesome-icon icon="fa-solid fa-circle-check" flip style="--fa-animation-duration: 4s;" />
        </span>
        <span style="font-size: 250px; color: black;">
          <div class="h1" style="padding-left: 140px;">成功參加</div>
        </span>
      </div>




    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
//
import { computed } from 'vue'

export default {

  name: 'registerForm',
  props: {
    isRegistered: {
      type: Boolean,
    },
    eventID: {
      type: String,
    },
    eventName: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  setup(props) {
    const loading = ref(false)

    //  if the input is empty for required field , the error message will show up
    const empty = computed(() => {
      if (result.value.name == '' || result.value.phone == '' || result.value.email == '') {
        return true
      } else {
        return false
      }
    })

    // register function that will send the data to the backend
    async function register() {
      loading.value = true
      var response = await fetch("/api/register?eventID=" + props.eventID + "&userID=" + props.userId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },

      });

      var sendEmail = await fetch('/api/sendmail?email=' + result.value.email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(result.value)
      })
      // const data = await response.json()

      console.log(response)
      console.log(sendEmail)
      //if the register is success, the page will redirect to the event page
      if (response.status == 201) {
        location.reload()
      }

      console.log("triger")
    }



    const result = ref({
      name: '',
      phone: '',
      email: '',
    })




    onMounted(() => {

    })
    return {
      props, result, empty, register, loading
    }
  }
}
</script>

<style scoped>
.regContainer {
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
  /* padding-bottom: 400px; */

}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: 10px;
  margin-left: 10px;
}

form {
  border-top-right-radius: 5%;
  border-top-left-radius: 5%;
  border-bottom-right-radius: 5%;
  border-bottom-left-radius: 5%;
  background-color: #fff;
  min-width: 500px;
  min-height: 880px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 15px 30px;
  padding: 30px 20px;
  /* margin-top: 1px; */
  margin-bottom: 120px;
}

input {
  margin-bottom: 20px;
}

textarea {
  height: 83%;
}
</style>