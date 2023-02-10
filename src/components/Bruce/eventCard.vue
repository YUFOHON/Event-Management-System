<template>
    <div class="card" style="width: 18rem;">
        <div class="card-body overflow-auto py-4" >
            <img :src=props.image class="img-fluid rounded-circle  mb-3" alt="..." style="width: 18rem; height: 15rem;">


            <ul class="list-group list-group-flush">

                <li class="list-group-item">
                    <div class="card-title text-center " >名稱： {{ props.eventName }}</div>
                </li>

                <li class="list-group-item">
                    <div class="content overflow-auto" style="height:5rem ;">
                        <p class="card-text ">內容： {{ props.content }}</p>
                    </div>
                </li>

                <li class="list-group-item">
                    <p class="card-text text-center">日期：{{ props.Date }}</p>
                </li>

            </ul>






            <div class="d-grid gap-2 col-3 mx-auto">
                <router-link :to="'/events/eventForm/' + props.id" class="btn btn-primary ">查看</router-link>
            </div>

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
.card {
    width: 18rem;
    height: 540px;
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
.card:hover {
    background-color: #c1c1c153;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.card-title {
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

img {

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
  text-overflow: clip;
  white-space: nowrap;
  max-width: 11em;
  overflow: hidden;
} */
</style>