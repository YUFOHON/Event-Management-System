<template>
    <div class="card" style="width: 18rem;">
        <img :src=props.image class="" alt="...">
        <div class="card-body">
            <h5 class="card-title">{{ props.eventName }}</h5>
            <p class="card-text">{{ props.content }}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
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
        content: String
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