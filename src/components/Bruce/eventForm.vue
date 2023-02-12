<template>

  <form v-if="isEventFormDetail">
    <div class="row">
      <div class="col">
        <div class="mb-3">
          <label for="eventName" class="form-label">活動名稱</label>
          <input v-model="result.eventName" type="email" class="form-control" id="eventName"
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
        <button type="submit" class="btn btn-primary" @click="updateEvent()">Submit</button>
      </div>
      <div class="b">
        <button type="submit" class="btn btn-danger" @click="deleteEvent()">Delete</button>
      </div>
    </div>
  </form>

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
        <button type="submit" class="btn btn-primary" @click="addEvent()">Submit</button>
      </div>
    </div>
  </form>

</template>

<script>
import { ref, onMounted } from 'vue'

export default {

  name: 'eventForm',
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

    async function getEventDetail() {
      //get data from server
      var response = await fetch("/api/events/search?id=" + props.eventID);
      var data = await response.json();
      result.value = data.results[0]
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
      location.reload();
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
        method: 'DELETE'


      });
      //reload the page
      alert(response.statusText)
      //relocate to event page
      location.href = "/events"
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
      result, getEventDetail, updateEvent, addEvent, deleteEvent
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: 10px;
  margin-left: 10px;
}

textarea {
  height: 83%;
}
</style>