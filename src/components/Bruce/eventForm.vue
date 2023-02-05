<template>

    <form>
        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label for="eventName" class="form-label">活動名稱</label>
                    <input type="email" class="form-control" id="eventName" aria-describedby="emailHelp">
                </div>


            </div>
            <div class="col">
                <div class="mb-3">
                    <label for="eventDate" class="form-label">活動日期</label>
                    <input type="text" class="form-control" id="Date" aria-describedby="emailHelp">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="mb-3">
                <label for="eventLocation" class="form-label">活動地點</label>
                <input type="text" class="form-control" id="Location">
            </div>


        </div>
        <div class="row">
            <div class="mb-3">
                <label for="content" class="form-label">內容</label>
                <textarea class="form-control" aria-label="With textarea"></textarea>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label for="coach" class="form-label">導師</label>
                    <input type="text" class="form-control" id="coach" aria-describedby="emailHelp">
                </div>
            </div>
            <div class="col">
                <div class="mb-3">
                    <label for="object" class="form-label">對象</label>
                    <input type="text" class="form-control" id="object" aria-describedby="emailHelp">
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label for="quota" class="form-label">名額</label>
                    <input type="number" class="form-control" id="quota" aria-describedby="emailHelp">
                </div>
            </div>
            <div class="col">
                <div class="mb-3">
                    <label for="staff" class="form-label">負責職員</label>
                    <input type="text" class="form-control" id="staff" aria-describedby="emailHelp">
                </div>
            </div>
        </div>
        <div class="row">

            <label for="age" class="form-label">年齡: {{ age }}</label>
            <div class="col">
                <input v-model="age" type="range" class="form-range" min="0" max="150" id="age">
            </div>
            <div class="col">
                <input v-model="age" type="number" class="form-control" id="age" min="0" max="150" >
           
            </div>
        </div>


        <div class="row">
            <div class="mb-3">
                <label for="Remark" class="form-label">備註</label>
                <textarea class="form-control" aria-label="With textarea"></textarea>
            </div>
        </div>
    </form>

</template>

<script>
import { ref, onMounted } from 'vue'

export default {

    name: 'formView',
    props: {
        msg: String
    },
    setup() {
        const age = ref(50)

        onMounted(() => {

        })
        return {
            age
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