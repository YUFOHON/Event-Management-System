<script setup>
import { defineEmits, ref, defineExpose } from 'vue'

const emit = defineEmits(['change'])
const files = ref([])

const fileChange = (e) => {
    if (e.target.files.length == 0) {
        files.value = [];
        emit('change', files.value);
        return
    }

    Array.from(e.target.files).forEach((f) => {
        const reader = new FileReader(f)
        reader.addEventListener("load", (event) => {
            files.value.push(event.target.result)
            emit('change', files.value);
        }, false);
        reader.readAsArrayBuffer(f);
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

        <input class="form-control" @change="fileChange" v-bind="$attrs" type="file" id="formFileMultiple" multiple>
    </div>
</template>