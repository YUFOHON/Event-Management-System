<template>
    <div class="card" :style="{ width: props.cardWidth + 'rem', height: props.cardWidth*1.60 + 'rem', fontSize: props.fontSize + 'rem' }">



        <div class=" card-body overflow-auto py-4">
            <img :src=props.image class=" rounded-circle  mb-3" alt="..." style="width: 20rem; height: 15rem;">

            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="card-title row">
                        <!-- <p ref="root" class="eventName text-center">
                            名稱： {{ props.eventName }}
                        </p> -->
                        <div class="col col-5 text-primary pt-3">名稱 </div>
                        <div class="col  gy-3">{{ props.eventName }}</div>
                    </div>
                </li>

                <li class="list-group-item">
                    <div class="content overflow-auto row" style="height:5rem ;">

                        <!-- <p class="card-text ">內容： {{ props.content }}</p> -->
                        <div class="col col-5 text-primary pt-3">內容 </div>
                        <div class="col gy-3">{{ props.content }}</div>


                    </div>
                </li>

                <li class="list-group-item">
                    <!-- <p class="card-text text-center">日期：{{ props.Date }}</p> -->
                    <div class="row">
                        <div class="col col-5 text-primary pt-3">日期 </div>
                        <div class="col gy-3">{{ props.Date }}</div>
                    </div>
                </li>
            </ul>

            <div class="d-grid gap-2 col-3 mx-auto my-3">
                <router-link :to="'/events/eventForm/' + props.id" class="btn btn-primary  ">查看</router-link>
            </div>
        </div>
    </div>
</template>


<script>
import { ref } from 'vue'

import { onMounted } from 'vue';
// import { watch } from 'vue';

export default {
    name: 'eventCard',
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
        // const cardWidth = ref(22)
        // const fontSize = ref(1)
        // watch(fontSize, (currentValue, oldValue) => {
        //     console.log(currentValue);
        //     console.log(oldValue);
        // });


        onMounted(() => {
            // const dom = root.value
            // const paddingLeft = getComputedStyle(dom);
            // const padding = parseFloat(paddingLeft) || 0
            // if (dom.scrollWidth > dom.offsetWidth) {
            //     dom.style.fontSize = `${(dom.offsetWidth - padding * 2) / dom.scrollWidth * 25}px`;
            // }

        })
        return {
            props, root,
        }
    }
}
</script>

<style scoped>
/* .text {
    font-size: 10rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    
} */

.card {
    width: 18rem;
    height: 592px;
    margin: 1rem;
    border-radius: 1rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    overflow: hidden;
    background-color: #f8f9fa;
}

.list-group-item {
    border: none;
    background-color: #f8f9fa;
}

.list-group-item:hover {
    background-color: #c1c1c153;
    transition: 0.3s;
}

.card:hover {
    background-color: #c1c1c153;
    transform: scale(1.08);
    transition: 0.7s;
  box-shadow: 0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06);
    /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); */
}

.eventName {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background: #f1f1f1;
    border-radius: 10px;
    
}

::-webkit-scrollbar-thumb {
    background: #0d6efd;
    border-radius: 10px;
}
img:hover{
    transform: scale(1.05);
    transition: 1s;
}


img {
    /* opacity: 0.7; */
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
}

.btn {
    border-radius: 50%;


}

/* .card-title {

    white-space: nowrap;
    max-width: 11em;
    overflow: hidden;
    overflow-x: auto;
} */
</style>