<template>
  <div class="regContainer">
    <form v-if="!props.isRegistered" @submit.prevent="register">
      <div class="row ">
        <label for="eventName" class="form-label text-center text-danger" style="font-size: 40px; padding-bottom: 20px;">
          {{ props.eventName }} 活動登記表</label>
        <hr class="bg-danger border-2 border-top border-danger">
      </div>

      <div class="row">
        <label for="name" class="form-label text "> 您是誰:<label class="text-danger"> *</label></label>
        <label v-for="(member, index) in members" :key="index">
          <input type="radio" :value="member" v-model="selectedMember">
          {{ member }}
        </label>


      </div>

      <div class="row mt-3" id="checkBoxCluster">

        <label for="eventName" class="form-label text"> 誰跟您一起來:<label class="text-danger"> *</label></label>

        <div class="form-check">
          <label class="form-check-label row" v-for="(member, index) in filteredMembers" :key="index">
            <input class="form-check-input" type="checkbox" v-model="selectedMembers" :value="member">
            {{ member }}
          </label>

        </div>


      </div>

      <div class="row mt-3">
        <label for="eventName" class="form-label text"> 聯絡電話號碼:<label class="text-danger"> *</label></label>
        <input v-model="result.phone"
          placeholder="12345678
                                                                                                                                                                                                                                                                                                                      "
          type="text" class="form-control" id="eventName" aria-describedby="emailHelp" required>
      </div>
      <div class="row" id="email">
        <label for="email" class="form-label text"> Email:<label class="text-danger"> *</label></label>
        <input placeholder="example@gmail.com" v-model="result.email" type="email" class="form-control" id="eventName"
          aria-describedby="emailHelp" required>
      </div>

      <div class="row" v-if="isPatient" draggable="false" @mousedown="handleDrag" @mouseup="handleDrop"
        @scroll="handleScroll" id="consentForm">


        <h1>未滿18歲個人同意書</h1>
        <p>在簽署本表格之前，請仔細閱讀以下信息。 </p>
        <p>我，[父母或法定監護人的全名]，是[未成年人的全名]的父母/法定監護人。 </p>
        <p>我在此同意[未成年人的全名]參加由[組織或個人]於[日期和時間]組織的[活動或事件]。 </p>
        <p>我了解該活動的性質和風險，並在此從任何和所有索賠、損害或責任中釋放和免除[組織或個人]。 </p>
        <p>我在此授權[組織或個人]在緊急情況下尋求[未成年人的全名]的醫療治療，並承擔與此類治療相關的任何和所有費用。 </p>
        <p>我證明[未成年人的全名]已獲得參加該活動的許可，我是具有法律授權簽署本同意書的父母/法定監護人。 </p>
        <p>父母/法定監護人簽名：________________________</p>
        <p>日期：________________________</p>

        <label for="nan">
          <input type="checkbox" value="同意" v-model="message" style="margin-left: 43%;" />同意协议
        </label>
      </div>
      <div v-if="empty" class="form-error-message" role="alert">
        <label for="name" class="form-sub-label text-danger"
          style="margin-left: 180px; padding-top: 20px; font-weight: bold;"> 請填寫所有必填項.<label class="text-danger">
            *</label></label>
      </div>
      <div class="b">
        <div v-if="loading" class="spinner-border text-danger" role="status"
          style="margin-left: 180px; margin-top: 20px;">
          <span class="visually-hidden">Loading...</span>
        </div>
        <p v-if="!loading & !isRead &isPatient" class="text text-danger" style="margin-left: 180px; margin-top: 20px;">請先閱讀條款</p>
      
        <button v-if="!loading" type="summit" class="btn btn-danger"
          style="margin-left: 200px; margin-top: 20px;">提交</button>
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
import { watch } from 'vue'
import { ref, computed, onMounted } from 'vue'
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
    const userData = ref({})
    const isRead = ref(false)
    const message = ref(false)
    const members = ref([])
    const selectedMember = ref('')
    const selectedMembers = ref([])
    const isPatient = ref(false)

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
      if (message.value != "同意") {
        alert("請同意條款", "danger")
        return
      }
      loading.value = true
      result.value.name = userData.value.username
      result.value.members = selectedMembers.value.push(selectedMember.value)
      alert(JSON.stringify(result.value), "success", 90000000)
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
      if (sendEmail.status == 200) {
        alert("已寄送郵件至您的信箱，請至信箱確認", "success", 5000)
      } else {
        alert("未知錯誤發生", "danger")
      }
      if (response.status == 201) {
        location.reload()
      }

    }

    const result = ref({
      name: '',
      members: [],
      phone: '',
      email: '',
    })

    const getUserInfo = async () => {
      const response = await fetch('/api/users2/' + props.userId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })

      if (response.ok)
        userData.value = await response.json()
      else
        alert("未知錯誤發生", "danger")

      const siblings = [userData.value.Patient_Name, userData.value.Sibling_1, userData.value.Sibling_2, userData.value.Sibling_3, userData.value.Contact_Person];
      siblings.forEach(sibling => {
        if (sibling) {
          members.value.push(sibling)
        }

      });

    }
    //watch the members ,exclude selecterdMember from it
    const filteredMembers = computed(() => {
      return members.value.filter(member => member != selectedMember.value)
    })
    const handleDrag = ({ movementX, movementY }) => {
      const consentForm = document.getElementById("consentForm")
      consentForm.addEventListener("mousemove", handleDrag);
      // consentForm.addEventListener("mouseup", () => {
      //   consentForm.removeEventListener("mousemove", handleDrag);
      // })
      // const info = document.getElementById("info")
      let getStyle = window.getComputedStyle(consentForm)
      let left = parseInt(getStyle.getPropertyValue("left"))
      let top = parseInt(getStyle.getPropertyValue("top"))
      consentForm.style.left = left + movementX + "px"
      consentForm.style.top = top + movementY + "px"
    }
    const handleDrop = () => {
      const consentForm = document.getElementById("consentForm")
      consentForm.removeEventListener("mousemove", handleDrag);
    }
    const handleScroll = () => {
      var consentForm = document.getElementById("consentForm")
      if (consentForm.scrollHeight - consentForm.scrollTop == consentForm.clientHeight) {
        //scroll bar is scrolled to the bottom, the form is available
        isRead.value = true
        alert("您已成功閱讀條款", "success")
      }
    }
    watch(selectedMember, (val) => {
      if (val) {
        alert("已選擇" + val, "success")
        if (val == userData.value.Patient_Name)
          isPatient.value = true
        else
          isPatient.value = false
        selectedMembers.value = []
      }
    })


    onMounted(
      () => {
        //get user info api is /api/users/:id

        getUserInfo()


        // GoogleReCaptcha.init({
        //   siteKey: '6Ldjg9YkAAAAALRMcvffg0XFNsG7KE3cTbtOH9ZH',
        //   callback: async (token) => {
        //     console.log(token)
        //     formData.value['g-recaptcha-response'] = token

        //     // AJAX form submit goes here
        //     let response = await fetch('/api/upload', {
        //       method: 'post',
        //       headers: {
        //         'Content-Type': 'application/json'
        //       },
        //       body: JSON.stringify(formData.value)
        //     })

        //     if (response.ok) {
        //       let data = await response.json()
        //       console.log(data)
        //     } else {
        //       alert(await response.text())
        //     }

        //     // AJAX form submit goes here
        //   }
        // })
      }
    )
    return {
      props, handleDrag, handleDrop, isPatient, selectedMembers, filteredMembers, members, selectedMember, onMounted, getUserInfo, message, isRead, handleScroll, result, empty, register, loading, userData,
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

#namePlaceholder {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  /* align-items: center; */

}

.form-check-input {
  max-width: 1px;
  padding-left: 1px;
  margin-right: 7px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: 10px;
  margin-left: 10px;
}

#consentForm {
  width: 500px;
  max-height: 400px !important;
  background-color: #bfa;
  overflow: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  border-top-right-radius: 5%;
  border-top-left-radius: 5%;
  border-bottom-right-radius: 5%;
  border-bottom-left-radius: 5%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 15px 30px;

}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: #f1f1f1;
  border-radius: 10px;

}

::-webkit-scrollbar-thumb {
  background: #bb2d3b;
  border-radius: 10px;
}

form {
  border-top-right-radius: 5%;
  border-top-left-radius: 5%;
  border-bottom-right-radius: 5%;
  border-bottom-left-radius: 5%;
  background-color: #fff;
  min-width: 500px;
  /* min-height: 880px; */
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

