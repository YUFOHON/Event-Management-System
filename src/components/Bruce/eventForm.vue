<template>
  <div class="container">

    <div v-if="isEventFormDetail" class="row">

      <div class="col" id="eventImg">
        <img @click="triggerFileComponent" v-if="url != 'default'" :src="url" class="mb-3" alt="上傳圖片" style="width: 25rem; height: 20rem;object-fit:cover;
                                                                                  border-radius:50%;">
        <img @click="triggerFileComponent" v-if="url == 'default'" src="@/assets/BG2.jpg" class="mb-3" alt="上傳圖片" style="width: 25rem; height: 20rem;object-fit:cover;
                                                                                  border-radius:50%;">
        <FileInput ref="fileInput" style="visibility: hidden;" @change="fileChanges" class="test" accept=".jpg,.jpeg"
          multiple />
      </div>
      <div class="col ">
        <form>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="eventName" class="form-label">活動名稱</label>
                <input v-model="result.eventName" type="text" class="form-control" id="eventName"
                  aria-describedby="emailHelp">
              </div>


            </div>
            <div class="col">
              <div class="mb-3">
                <label for="eventDate" class="form-label">活動日期</label>
                <input v-model="result.eventDate" data-format="dd/mm/yyyy" type="date" class="form-control" id="eventDate"
                  aria-describedby="emailHelp">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="mb-3">
              <label for="eventLocation" class="form-label">活動地點</label>
              <input v-model="result.eventLocation" type="text" class="form-control" id="eventLocation">
            </div>


          </div>

          <div class="row" id="category">
            <div class="mb-3">
              <div class="row">
                <label for="Category" class="form-label">活動種類: </label>
              </div>
              <!-- v-model="result.Category"  -->
              <select v-model="result.Category" class="form-select" aria-label="Default select example"
                required="required">
                <option value="青年活動">青年活動</option>
                <option value="活動義工招募">活動義工招募</option>
                <option value="兒童活動">兒童活動</option>
                <option value="同路人支援平台">同路人支援平台</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="mb-3">
              <label for="content" class="form-label">內容</label>
              <textarea v-model="result.content" class="form-control" aria-label="With textarea" id="content"></textarea>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="coach" class="form-label">導師</label>
                <input v-model="result.coach" type="text" class="form-control" id="coach" aria-describedby="emailHelp">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="target" class="form-label">對象</label>
                <input v-model="result.target" type="text" class="form-control" id="target" aria-describedby="emailHelp">
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="mb-3">
                <label for="quota" class="form-label">名額</label>
                <input v-model="result.quota" type="number" class="form-control" id="quota" aria-describedby="emailHelp">
              </div>
            </div>
            <div class="col">
              <div class="mb-3">
                <label for="staff" class="form-label">負責職員</label>
                <input v-model="result.staff" type="text" class="form-control" id="staff" aria-describedby="emailHelp">
              </div>
            </div>
          </div>
          <div class="row">

            <label for="age" class="form-label">年齡: {{ result.ageLimit }}</label>
            <div class="col">
              <input v-model="result.ageLimit" type="range" class="form-range" id="ageLimit" min="0" max="150">
            </div>
            <div class="col">
              <input v-model="result.ageLimit" type="number" class="form-control" id="ageLimit" min="0" max="150">

            </div>
          </div>

          <div class="row">
            <div class="mb-3">
              <label for="Remark" class="form-label">備註</label>
              <textarea v-model="result.Remark" class="form-control" aria-label="With textarea" id="Remark"></textarea>
            </div>
          </div>

          <Alert ref="alert" :msg="alertMsg" />

          <div v-if="!loading" class=" py-4 d-flex justify-content-evenly">
            <div class="b">
              <button type="button" class="btn btn-primary" @click="updateEvent()">更新</button>
            </div>
            <div class="b">
              <button type="button" class="btn btn-danger" @click="deleteEvent()">刪除</button>
            </div>
          </div>
          <div v-if="loading" class="spinner-border text-danger" role="status"
            style="margin-left: 200px; margin-top: 20px;">
            <span class="visually-hidden">Loading...</span>
          </div>
        </form>
      </div>

      <div class="col " id="applyerList">
        <form action="" class="applyerList">
          <h3 style="padding-left: 31%; color: red;">申請人名單</h3>

          <div class="list">
            <table class="table table-Secondary table-striped">
              <thead class="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">用戶名</th>
                  <th scope="col">狀態</th>
                  <th scope="col">批准</th>
                  <th scope="col">拒絕</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for=" (applyerList, index) in applyerList" :key="applyerList">
                  <th scope="row">{{ index + 1 }}</th>
                  <td>
                    <router-link :to="{ name: 'userDetail', params: { id: applyerList.userID } }">
                      {{ applyerList.username }}
                    </router-link>
                  </td>
                  <!-- <td>{{ applyer?List.username }} </td> -->

                  <td v-if="applyerList.isApproved">通過 </td>
                  <td v-if="!applyerList.isApproved">不通過</td>

                  <td> <button @click="approve(applyerList.isApproved, applyerList)" class="btn btn-danger"
                      type="button"><font-awesome-icon icon="fa-solid fa-thumbs-up" /></button></td>
                  <td> <button @click="reject(applyerList.isApproved, applyerList)" class="btn btn-danger"
                      type="button"><font-awesome-icon icon="fa-solid fa-xmark" /></button></td>
                </tr>

              </tbody>

            </table>
          </div>
        </form>
      </div>

    </div>

    <div v-if="!isEventFormDetail" class="row" id="add" style="margin-top: -10px;">
      <div class="col" id="eventImg" style="margin-right: 80px;">
        <img @click="triggerFileComponent" v-if="url != 'default'" :src="url" class="mb-3" alt="上傳圖片" style="width: 40rem; height: 40rem;object-fit:cover;
                                                                             border-radius:50%;">
        <img @click="triggerFileComponent" v-if="url == 'default'" src="@/assets/BG2.jpg" class="mb-3" alt="上傳圖片" style="width: 40rem; height: 40rem;object-fit:cover;
                                                                border-radius:50%;">
        <FileInput id="fileInput" ref="fileInput" style="margin-left: 10%; visibility:hidden ;" @change="fileChanges"
          class="test" accept=".jpg,.jpeg" multiple />
      </div>
      <form class="col">
        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="eventName" class="form-label">活動名稱</label>
              <input v-model="result.eventName" type="text" class="form-control" id="eventName"
                aria-describedby="emailHelp">
            </div>
          </div>

          <div class="col">
            <div class="mb-3">
              <label for="eventDate" class="form-label">活動日期</label>
              <input v-model="result.eventDate" data-format="dd/mm/yyyy" type="date" class="form-control" id="eventDate"
                aria-describedby="emailHelp">
            </div>
          </div>

        </div>
        <div class="row">
          <div class="mb-3">
            <label for="eventLocation" class="form-label">活動地點</label>
            <input v-model="result.eventLocation" type="text" class="form-control" id="eventLocation">
          </div>
        </div>
        <div class="row">
          <div class="mb-3">
            <div class="row">
              <label for="Category" class="form-label" style="margin-left:-20px ;">活動種類: </label>
            </div>
            <!-- v-model="result.Category"  -->
            <select v-model="result.Category" class="form-select" aria-label="Default select example" required="required">
              <option value="青年活動">青年活動</option>
              <option value="活動義工招募">活動義工招募</option>
              <option value="兒童活動">兒童活動</option>
              <option value="同路人支援平台">同路人支援平台</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="mb-3">
            <label for="content" class="form-label">內容</label>
            <textarea v-model="result.content" class="form-control" aria-label="With textarea" id="content"></textarea>
          </div>
        </div>

        <div class="row">

          <div class="col">
            <div class="mb-3">
              <label for="coach" class="form-label">導師</label>
              <input v-model="result.coach" type="text" class="form-control" id="coach" aria-describedby="emailHelp">
            </div>
          </div>

          <div class="col">
            <div class="mb-3">
              <label for="target" class="form-label">對象</label>
              <input v-model="result.target" type="text" class="form-control" id="target" aria-describedby="emailHelp">
            </div>
          </div>

        </div>

        <div class="row">
          <div class="col">
            <div class="mb-3">
              <label for="quota" class="form-label">名額</label>
              <input v-model="result.quota" type="number" class="form-control" id="quota" aria-describedby="emailHelp">
            </div>
          </div>
          <div class="col">
            <div class="mb-3">
              <label for="staff" class="form-label">負責職員</label>
              <input v-model="result.staff" type="text" class="form-control" id="staff" aria-describedby="emailHelp">
            </div>
          </div>
        </div>

        <div class="row">
          <label for="age" class="form-label">年齡: {{ result.ageLimit }}</label>
          <div class="col">
            <input v-model="result.ageLimit" type="range" class="form-range" id="ageLimit" min="0" max="150">
          </div>
          <div class="col">
            <input v-model="result.ageLimit" type="number" class="form-control" id="ageLimit" min="0" max="150">
          </div>
        </div>

        <div class="row">
          <div class="mb-3">
            <label for="Remark" class="form-label">備註</label>
            <textarea v-model="result.Remark" class="form-control" aria-label="With textarea" id="Remark"></textarea>
          </div>
        </div>
        <div class=" py-4 d-flex justify-content-evenly">
          <div class="b">


            <button v-if="!loading" type="button" class="btn btn-primary" @click="addEvent()">上傳</button>
            <div v-if="loading" class="spinner-border text-danger" role="status"
              style="margin-left: 25px; margin-top: 20px;">
              <span class="visually-hidden">Loading...</span>
            </div>

          </div>
        </div>

      </form>
    </div>
  </div>
  <Alert ref="alert" :msg="alertMsg" />
</template>

<script>
import { ref, onMounted } from 'vue'
import FileInput from '@/components/Bruce/FileInput.vue';
import Alert from '@/components/Bruce/AlertWindow.vue';

export default {

  name: 'eventForm',
  components: {
    FileInput,
    Alert,

  },
  props: {

    isEventFormDetail: {
      type: Boolean,

    },
    eventID: {
      type: String,
    }
  },
  setup(props) {
    const result = ref({})
    const applyerList = ref([])
    const imgData = ref({});
    const fileFormat = ref('');
    const url = ref("");
    const alertMsg = ref("intial alert");
    const loading = ref(false);
    const fileInput = ref(null);
    const alert = ref(null);
    async function addEvent() {
      //check the result.value.files is empty or not
      var msg = ""
      if (result.value.Category == "") {
        msg += "請選擇活動種類"
        alert.value.alert(msg, "danger")
        return
      } else if (result.value.name == "") {
        msg += "請輸入活動名稱"
        alert.value.alert(msg, "danger")
        return
      }
      loading.value = true;

      var response = await fetch("/api/events/add?id=" + props.eventID, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result.value)
      });
      //reload the page 
      // alert(response.statusText)
      if (response.status == 200)
        alert.value.alert("上傳成功", "success")
      else
        alert.value.alert("上傳失敗", "danger")
      //relocate to event page
      location.href = "/events"
    }

    // const img = new Image();
    async function getEventDetail() {
      //get data from server
      var response = await fetch("/api/events/search?id=" + props.eventID);
      var data = await response.json();

      //get image from server using params
      result.value = data.results[0]

      if (result.value.files == undefined) {
        url.value = "default"
      } else {
        fileFormat.value = result.value.files[0].split("/")[1].split(";")[0]
        url.value = '/api/files/' + props.eventID + '.' + fileFormat.value
      }
      applyerList.value = result.value.registrationRecord
      //remove the _id field in result
      delete result.value._id;
      // console.log(data.results[0]);
      //set data to form
      document.getElementById("eventName").value = result.value.eventName;
      document.getElementById("eventDate").value = result.value.eventDate;
      document.getElementById("eventLocation").value = result.value.eventLocation;
      document.getElementById("content").value = result.value.content;
      document.getElementById("coach").value = result.value.coach;
      document.getElementById("target").value = result.value.target;
      document.getElementById("quota").value = result.value.quota;
      document.getElementById("staff").value = result.value.staff;
      document.getElementById("ageLimit").value = result.value.ageLimit;
      document.getElementById("Remark").value = result.value.Remark;
    }

    async function updateEvent() {
      if (result.value.Category == "") {
        var msg = ""
        msg += "請選擇活動種類"
        alert.value.alert(msg, "danger")
        return
      }


      loading.value = true;
      var response = await fetch("/api/events/update?id=" + props.eventID, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result.value)
      });
      //reload the page
      alert(response.statusText)
      location.reload();
      // location.assign("/events");
    }
    const triggerFileComponent = () => {
      fileInput.value.addFile();
    }

    async function deleteEvent() {
      loading.value = true;
      var response = await fetch("/api/events/delete?id=" + props.eventID, {
        method: 'PUT'
      });
      //relocate to event page
      console.log(response)
      location.assign("/events");
    }

    const fileChanges = (files) => {
      // console.log(files)
      result.value.files = files

      url.value = result.value.files[0]

    }

    async function approve(isApproved, record) {
      if (isApproved) return;


      // console.log("approve")
      //send request to sever to approve the event
      var response = await fetch("/api/events/approve?id=" + record._id, {
        method: 'POST'
      });


      //SET THE APPROVE STATUS TO TRUE
      if (response.status == 200)
        record.isApproved = true;


    }
    async function reject(isApproved, record) {
      if (!isApproved) return
      //send request to sever to approve the event
      var response = await fetch("/api/events/reject?id=" + record._id, {
        method: 'POST'
      });
      if (response.status == 200)
        record.isApproved = false;

    }

    onMounted(() => {
      // console.log(fileInput.value)
      alert.value.alert("點擊用戶名查看詳細資料", "success", "3000")

      if (props.isEventFormDetail) {
        getEventDetail()
      } else {
        url.value = "default"
        result.value = {
          eventName: "",
          eventDate: "",
          eventLocation: "",
          content: "",
          coach: "",
          target: "",
          quota: "",
          staff: "",
          Category: "",
          isDelete: false,
          ageLimit: 0,
          Remark: ""

        }
      }
    })
    return {
      //return all the variable
      triggerFileComponent, alert, fileInput, loading, Alert, alertMsg, url, fileFormat, imgData, approve, reject, result, applyerList, getEventDetail, updateEvent, addEvent, deleteEvent, FileInput, fileChanges, props
    }
  }
}
</script>

<style scoped>
#eventImg {
  /* padding-left: 15%; */


  /* box-shadow: rgba(0, 0, 0, 0.1) 0px 15px 30px; */
  /* padding: 30px 20px; */
  margin-top: 300px;
  /* margin-right: 150px; */
}

img:hover {
  cursor: pointer;
  content: url("@/assets/upload.jpg");
  /* transform: scale(1.1); */
  /* transition: 1s; */
}

.container {
  /* border-radius: 100%; */
  display: flex;
  flex-direction: column;
  background-image: url("@/assets/city.jpg");
  /* background-size: 100% 100%;
  background-attachment: fixed; */
  margin-top: -5%;
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 1000px;

  justify-content: center;
  align-items: center;

}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: 10px;
  margin-top: -10px;
  /* margin-left: 10px; */
}

.form-label {
  font-size: 20px;
  font-weight: bold;
  padding-top: 10px;
  margin-bottom: 10px;
}

form {

  border-top-right-radius: 5%;
  border-top-left-radius: 5%;
  border-bottom-right-radius: 5%;
  border-bottom-left-radius: 5%;
  background-color: #fff;
  min-width: 500px;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 15px 30px;
  padding: 30px 20px;
  margin-top: 100px;
}

.applyerList {
  /* if over-flow y */
  margin-top: 100px;
  margin-bottom: 10px;
}

a {
  color: red;
  text-decoration: none;
}

.list {
  overflow-y: scroll;
  max-height: 920px !important;
  /* max-height: 100px !important; */
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  background: #d6d2d2;
  border-radius: 10px;

}

::-webkit-scrollbar-thumb {
  background: red;
  border-radius: 10px;
}

#add {
  margin-top: 100px;
  margin-bottom: 10px;
}

textarea {
  height: 70%;
}
</style>