<!-- <script>
import { ref } from 'vue';
export default {
  name: 'FileInput',
  setup() {

    const emit = ['change']
    const files = ref([])

    const fileChange = (e) => {
      if (e.target.files.length == 0) {
        //set the file.value from read file from local storage
        // file.value = [];
        // emit('change', file.value);
        return
      }

      //read only 1 file  
      // const f = Array.from(e.target.files)[0]
      // console.log(f)
      // const reader = new FileReader(f.value);
      // reader.addEventListener("load", (event) => {
      //   file.value = event.target.result;
      //   console.log(file.value);
      //   emit('change', file.value);
      // }, false);
      // reader.readAsDataURL(f);

      Array.from(e.target.files).forEach((f) => {
        const reader = new FileReader(f)
        reader.addEventListener("load", (event) => {
          files.value[0] = (event.target.result)
          console.log(files.value[0])
          emit('change', files.value);
        }, false);
        reader.readAsDataURL(f);
      })
    }
    function addFile() {
  document.getElementById("formFileMultiple").click();
}
    return {
      emit,
      files,
      fileChange,
      addFile
    }
  }


}
</script> -->

<script setup>
import { defineEmits, defineExpose, ref } from 'vue'

const emit = defineEmits(['change'])
const files = ref([])

const fileChange = (e) => {
  if (e.target.files.length == 0) {
    //set the file.value from read file from local storage
    // file.value = [];
    // emit('change', file.value);
    return
  }

  //read only 1 file  
  // const f = Array.from(e.target.files)[0]
  // console.log(f)
  // const reader = new FileReader(f.value);
  // reader.addEventListener("load", (event) => {
  //   file.value = event.target.result;
  //   console.log(file.value);
  //   emit('change', file.value);
  // }, false);
  // reader.readAsDataURL(f);

  Array.from(e.target.files).forEach((f) => {
    const reader = new FileReader(f)
    reader.addEventListener("load", (event) => {
      files.value[0] = (event.target.result)
      // console.log(files.value[0])
      emit('change', files.value);
    }, false);
    reader.readAsDataURL(f);
  })
}


const addFile = () => {
  document.getElementById("formFileMultiple").click();
}
defineExpose({
  addFile,
  emit,
  files,
  fileChange
})
</script>

<template>
  <!-- <input type="file" @change="fileChange" v-bind="$attrs" /> -->
  <!-- <label for="formFileMultiple" class="form-label">Multiple files input example</label> -->
  <div class="mb-3">

    <input class="custom-file-input" @change="fileChange" v-bind="$attrs" type="file" id="formFileMultiple" multiple>

  </div>
</template>

<style scoped>
/* improve the input field ui */
input[type="file"] {
  width: 70%;
  /* padding-left: 18%; */
  margin-left: 6%;
  border-top-right-radius: 5%;
  border-top-left-radius: 5%;
  border-bottom-right-radius: 5%;
  border-bottom-left-radius: 5%;
  background-color: #fff;
  min-width: 340px;
  ;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 15px 30px;
  padding: 30px 20px;
  margin-top: 1px;
}

.custom-file-input::-webkit-file-upload-button {
  visibility: hidden;
}

.custom-file-input::before {
  content: '上傳活動圖片';
  display: inline-block;
  /* background: -webkit-linear-gradient(top, #f9f9f9, #e3e3e3); */
  border: 1px solid #999;
  border-radius: 3px;
  padding: 5px 8px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  /* text-shadow: 1px 1px #fff; */
  font-weight: 580;
  font-size: 10pt;
  /*  */

}

.custom-file-input:hover::before {
  border-color: black;
}

.custom-file-input:active::before {
  background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
}
</style>