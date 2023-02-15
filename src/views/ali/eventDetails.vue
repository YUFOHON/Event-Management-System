<template>

<div class="card" style="width: 18rem;">
  <img :src=props.image class=" rounded-circle  mb-3 card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{ props.eventName }}</h5>
    <p class="card-text">S{{ props.content }}</p>
    <p class="card-text">S{{ props.Date }}</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

</template>

<script>
import { ref } from 'vue'
import { onMounted } from 'vue';


export default {
    name: 'eventDetails',
    props: {
        eventName: String,
        image: String,
        content: String,
        id: String,
        Date: String,
        fontSize: Number,
        cardWidth: Number
    },
    setup(props) {
        const root = ref(null)

        onMounted(() => {

        })
        return {
            props, root,
        }
    }
}

</script>