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
                                                                                        " type="text"
          class="form-control" id="eventName" aria-describedby="emailHelp" required>
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

      <div class="row" id="consentForm">

        <!-- <a href="" class="">拍照錄影同意書</a>
   -->
        <pre id='info' @scroll="handleScroll">
              兒童癌病基金 
              拍照錄影同意書

本人及所有家庭成員在參與 貴基金舉辦的『活動名稱』活動期間，對
被攝製的照片及錄像之使用，有以下的意願：

1. 同意 使用於基金之刊物、光碟上
2. 同意 使用於基金之網頁上
3. 同意 使用於(贊助商/合辦機構)之刊物、網頁上
        </pre>

        <label for="nan">
          <input type="checkbox" value="同意" v-model="message" style="margin-left: 43%;"/>同意协议
        </label>
      </div>

      <div v-if="empty" class="form-error-message" role="alert">
        <label for="name" class="form-sub-label text-danger"
          style="margin-left: 230px; padding-top: 20px; font-weight: bold;"> 請填寫所有必填項.<label class="text-danger">
            *</label></label>
      </div>

      <div class="b">

        <div v-if="loading" class="spinner-border text-danger" role="status"
          style="margin-left: 200px; margin-top: 20px;">
          <span class="visually-hidden">Loading...</span>
        </div>
        
        <p v-if="!loading & !isRead"  class="btn btn-danger"
          style="margin-left: 260px; margin-top: 20px;">請先閱讀條款</p>
        <button v-if="!loading & isRead" type="summit" class="btn btn-danger"
          style="margin-left: 270px; margin-top: 20px;">提交</button>
        </div>
        
        
        
        
      </form>

    <form v-if="props.isRegistered" @submit.prevent="register">
      <div class="b">
        <span style="font-size: 250px; color: greenyellow; margin-left: 100px;">

          <font-awesome-icon icon="fa-solid fa-circle-check" style="--fa-animation-duration: 4s;" />
        </span>
        <span style="font-size: 250px; color: black;">
          <div class="h1" style="padding-left: 140px; padding-bottom: 50px;">成功提交申請</div>
          <div class="progress" role="progressbar" aria-label="Animated striped example" aria-valuenow="75"
            aria-valuemin="0" aria-valuemax="100">
            <div class="progress-bar progress-bar-striped bg-success progress-bar-animated" style="width: 50%"></div>
          </div>
        </span>
      </div>
      <div v-if="!props.isApproved" class="row">
        <div class="h2" style="margin-left: 18%;"><font-awesome-icon icon="fa-solid fa-paste" />目前狀態：處理中</div>
      </div>
      <div v-if="props.isApproved" class="row">
        <div class="h1" style="margin-left: 10%;">目前狀態：您已成功參加！</div>
      </div>
    </form>

    <!-- <form @submit.prevent="GoogleReCaptcha.validate($event)">
      <div class="g-recaptcha" data-sitekey="6Ldjg9YkAAAAALRMcvffg0XFNsG7KE3cTbtOH9ZH"></div>

      <input type="hidden" name="g-recaptcha-response" v-model="formData.captcha" />
      <input type="submit" value="Submit" />
    </form> -->


  </div>
</template>

<script>
import { ref } from 'vue'
//
import { computed } from 'vue'
// import GoogleReCaptcha from 'google-recaptcha-v2';


export default {

  name: 'registerForm',
  props: {
    isApproved: {
      type: Boolean,
    },
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
    const formData = ref({})
    const isRead = ref(false)
    const message = ref(false)
    //  if the input is empty for required field , the error message will show up
    const empty = computed(() => {
      if (result.value.name == '' || result.value.phone == '' || result.value.email == '') {
        return true
      } else {
        return false
      }
    })
    const handleScroll = () => {
      var info = document.getElementById("info")
      if (info.scrollHeight - info.scrollTop == info.clientHeight) {
        //scroll bar is scrolled to the bottom, the form is available
        isRead.value = true
        alert("您已成功閱讀條款", "success")
      }
    }

    // register function that will send the data to the backend
    async function register() {
      if (message.value == false) {
        alert("請同意條款", "danger")
        return
      }


      loading.value = true
      var response = await fetch("/api/register?eventID=" + props.eventID + "&userID=" + props.userId + "&email=" + result.value.email + "&eventName=" + props.eventName, {
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
      if (sendEmail.status == 200) {
        alert("已寄送郵件至您的信箱，請至信箱確認", "success")
      } else {
        alert("未知錯誤發生", "danger")
      }

      //if the register is success, the page will redirect to the event page
      if (response.status == 201) {
        location.reload()
      }

    }

    const result = ref({
      name: '',
      phone: '',
      email: '',
    })

    // onMounted(
    //   () => {
    //     GoogleReCaptcha.init({
    //       siteKey: '6Ldjg9YkAAAAALRMcvffg0XFNsG7KE3cTbtOH9ZH',
    //       callback: async (token) => {
    //         console.log(token)
    //         formData.value['g-recaptcha-response'] = token

    //         // AJAX form submit goes here
    //         let response = await fetch('/api/upload', {
    //           method: 'post',
    //           headers: {
    //             'Content-Type': 'application/json'
    //           },
    //           body: JSON.stringify(formData.value)
    //         })

    //         if (response.ok) {
    //           let data = await response.json()
    //           console.log(data)
    //         } else {
    //           alert(await response.text())
    //         }

    //         // AJAX form submit goes here
    //       }
    //     })
    //   }
    // )
    return {
      props,message, isRead, handleScroll, result, empty, register, loading, formData,
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

#info {
  width: 500px;
  height: 150px;
  background-color: #bfa;
  overflow: auto;
  margin-left: 8%;
margin-top: 3%;
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
  margin-bottom: 120px;
}

input {
  margin-bottom: 20px;
}

textarea {
  height: 83%;
}

.h1 {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 20px;
  color: yellowgreen;
}

.h2 {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 20px;
  margin-top: 20px;
  color: black;
}
</style>