<template>
  <div class="container">

    <div class="row">
      <div class="col">
        <form v-if="isEventFormDetail">
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

          <div class="row">
            <FileInput @change="fileChanges" class="test" accept=".jpg,.jpeg" multiple />
          </div>

          <div class=" py-4 d-flex justify-content-evenly">
            <div class="b">
              <button type="button" class="btn btn-primary" @click="updateEvent()">Update</button>
            </div>
            <div class="b">
              <button type="button" class="btn btn-danger" @click="deleteEvent()">Delete</button>
            </div>
          </div>
        </form>
      </div>

      <div class="col" id="applyerList">
        <form action="">
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
                  <td>{{ applyerList.username }} </td>

                  <td v-if="applyerList.isApproved">通過 </td>
                  <td v-if="!applyerList.isApproved">不通過</td>

                  <td> <button @click="approve(applyerList.isApproved)" class="btn btn-danger"
                      type="button"><font-awesome-icon icon="fa-solid fa-thumbs-up" /></button></td>
                  <td> <button @click="reject(applyerList.isApproved)" class="btn btn-danger"
                      type="button"><font-awesome-icon icon="fa-solid fa-xmark" /></button></td>
                </tr>

              </tbody>

            </table>
          </div>
        </form>
      </div>

    </div>
    <form v-if="!isEventFormDetail">
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
          <button type="button" class="btn btn-primary" @click="addEvent()">Submit</button>
        </div>
      </div>

    </form>

  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import FileInput from '@/components/Bruce/FileInput.vue';
export default {

  name: 'eventForm',
  components: {
    FileInput
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
    const formData = ref({})
    const applyerList = ref([])

    async function getEventDetail() {
      //get data from server
      var response = await fetch("/api/events/search?id=" + props.eventID);
      var data = await response.json();
      result.value = data.results[0]
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

      var response = await fetch("/api/events/update?id=" + props.eventID, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result.value)
      });
      //reload the page
      alert(response.statusText)
      location.assign("/events");
    }

    async function addEvent() {
      var response = await fetch("/api/events/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(result.value)
      });
      //reload the page
      alert(response.statusText)
      //relocate to event page
      location.href = "/events"
    }

    async function deleteEvent() {

      var response = await fetch("/api/events/delete?id=" + props.eventID, {
        method: 'PUT'
      });


      //relocate to event page
      console.log(response)
      location.assign("/events");
    }

    const fileChanges = (files) => {
      formData.value.files = files
    }

    async function approve(isApproved) {
      if (isApproved) return;


        console.log("approve")
        //send request to sever to approve the event
        var response = await fetch("/api/events/approve?id=" + applyerList.value[0]._id, {
          method: 'POST'
        });
        console.log(response)
        //refresh the current page
        location.reload();
      
    }
    async function reject(isApproved) {
      if(!isApproved) return
      //send request to sever to approve the event
      var response = await fetch("/api/events/reject?id=" + applyerList.value[0]._id, {
        method: 'POST'
      });
      console.log(response)
      location.reload();

    }

    onMounted(() => {
      if (props.isEventFormDetail) {
        getEventDetail()
      } else {
        result.value = {
          eventName: "",
          eventDate: "",
          eventLocation: "",
          content: "",
          coach: "",
          target: "",
          quota: "",
          staff: "",
          ageLimit: 0,
          Remark: ""
        }
      }
    })
    return {
      //return all the variable
      approve, reject, result, applyerList, getEventDetail, updateEvent, addEvent, deleteEvent, FileInput, fileChanges
    }
  }
}
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

  box-shadow: rgba(0, 0, 0, 0.1) 0px 15px 30px;
  padding: 30px 20px;
  margin-top: 1px;
}



textarea {
  height: 83%;
}
</style>