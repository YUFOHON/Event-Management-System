<template>
    <div class="card" style="width: 18rem;">
        <img :src=props.image class="" alt="..." style="width: 18rem; height: 15rem;">
        <div class="card-body">
            <h5 class="card-title">名稱： {{ props.eventName }}</h5>
            <p class="card-text">內容： {{ props.content }}</p>
            <p class="card-text">日期：{{ props.Date }}</p>
            <router-link :to="'/events/eventForm/' + props.id" class="btn btn-primary">查看</router-link>


        </div>
    </div>
</template>


<script>
// import { ref } from 'vue'


export default {
    name: 'eventCard',
    props: {
        eventName: String,
        image: String,
        content: String,
        id: String,
        Date: String
    },
    setup(props) {
        return {
            props
        }
    }
}
</script>

<style scoped>
.image {
    width: 100px;
    height: 100px;
}
</style>