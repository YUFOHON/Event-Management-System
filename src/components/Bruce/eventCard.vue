<template>
    <div class="card"
        :style="{ width: props.cardWidth * 0.7 + 'rem', height: props.cardWidth - 4.5 + 'rem', fontSize: props.fontSize + 'rem' }">


        <div class=" card-body overflow-auto py-4" style="margin-top: -5%;">
            <!-- <img :src=props.image   class="mb-3" alt="..." style="width: 20rem; height: 10rem;"> -->

            <img v-if="url != 'default'" :src="url" class="mb-3" alt="上傳圖片" style="width: 20rem; height: 10rem;">
            <img v-if="url == 'default'" src="@/assets/BG2.jpg" class="mb-3" alt="上傳圖片"
                style="width: 20rem; height: 10rem;">
            <!-- <img :src="url" class="mb-3" alt="..." style="width: 20rem; height: 10rem;"> -->

            <ul class="list-group list-group-flush">

                <li class="list-group-item" style="margin-top: -5%;">
                    <div class="card-title row">
                        <!-- <p ref="root" class="eventName text-center">
                                    名稱： {{ props.eventName }}
                                </p> -->

                        <div class="col col-5  pt-3" :style="{ 'font-weight': 'bolder', 'color': textColor }">名稱 </div>

                        <div class="col  gy-3">{{ props.eventName }}</div>
                    </div>
                </li>

                <li class="list-group-item" style="margin-top: -4%;">
                    <div class="content overflow-auto row" style="height:5rem ;">

                        <div class="col col-5  pt-3" :style="{ 'font-weight': 'bolder', 'color': textColor }">內容 </div>

                        <div class="col gy-3">{{ props.content }}</div>
                    </div>
                </li>

                <li class="list-group-item" style="margin-top: -5%;">
                    <!-- <p class="card-text text-center">日期：{{ props.Date }}</p> -->
                    <div class="row">
                        <div class="col col-5  pt-3" :style="{ 'font-weight': 'bolder', 'color': textColor }">

                            日期

                        </div>
                        <div class="col gy-3">{{ props.Date }}</div>
                    </div>
                </li>
            </ul>

            <div class="" style="padding-left: 42%; padding-top: 4%;">
                <router-link :to="'/events/eventForm/' + props.id" class="btn btn-danger  ">查看</router-link>
            </div>

        </div>
    </div>
</template>


<script>
import { ref } from 'vue'

import { onMounted } from 'vue';
// import { watch } from 'vue';
import { computed } from 'vue';
export default {
    name: 'eventCard',
    props: {
        eventName: String,
        image: String,
        content: String,
        id: String,
        Date: String,
        Category: String,
        fontSize: Number,
        cardWidth: Number,
        file: Array,
    },
    setup(props) {
        const root = ref(null)
        // const cardWidth = ref(22)
        // const fontSize = ref(1)
        // watch(fontSize, (currentValue, oldValue) => {
        //     console.log(currentValue);
        //     console.log(oldValue);
        // });
        const shadow = computed(() => {

            var color = '3px 4px 18px 2px'


            if (props.Category == '兒童活動') {
                return color + ' #af8221'
            } else if (props.Category == '青年活動') {
                return color + ' #40d859'
            } else if (props.Category == '同路人支援平台') {
                return color + ' #8a56dd'
            } else {
                return color + ' #ff0000'
            }


        }

        )
        const btnColor = computed(() => {
            if (props.Category == '兒童活動') {
                return '#af8221'
            } else if (props.Category == '青年活動') {
                return '#40d859'
            } else if (props.Category == '同路人支援平台') {
                return '#8a56dd'
            } else {
                return '#ff0000'
            }
        }

        )
        const fileFormat = ref('')
        const url = ref(props.image)
        const textColor = computed(() => {
            if (props.Category == '兒童活動') {
                return '#af8221'
            } else if (props.Category == '青年活動') {
                return '#40d859'
            } else if (props.Category == '同路人支援平台') {
                return '#8a56dd'
            } else {
                return '#ff0000'
            }
        })


        onMounted(() => {
            // console.log(props.id)
            if (props.file == undefined) {
                url.value = 'default'
            } else {
                fileFormat.value = props.file[0].split("/")[1].split(";")[0]
                console.log(fileFormat.value)
                url.value = '/api/files/' + props.id + '.' + fileFormat.value
            }




        })
        return {
            props, root, shadow, btnColor, textColor, url
        }
    }
}
</script>


<style scoped> /* .btn[data-v-6608a9fc]{
animation:rainbow-animation 200ms linear infinite;
} */

 @keyframes slidein {

     /* from {
         margin-left: 100%;
         width: 300%;
     }

     to {
         margin-left: 0%;
         width: 100%;
     } */
     0% {
		transform: scale(0);
		transform-origin: 50% 100%;
	}

	100% {
		transform: scale(1);
		transform-origin: 50% 100%;
	}
 }


 .card:hover {
     background-color: #c1c1c153;
     transform: scale(1.08);
     transition: 0.7s;
     box-shadow: 0 10px 20px rgba(0, 0, 0, .12), 0 4px 8px rgba(0, 0, 0, .06);
     /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); */
     box-shadow: v-bind('shadow');
 }

 .card {
     animation-duration: 1s;
     animation-name: slidein;
     width: 18rem;
     height: 592px;
     margin: 1rem;
     border-radius: 1rem;
     /* box-shadow: 5px 5px 15px #af8221; */
     /* border-image: repeating-linear-gradient(30deg, #4d9f0c, #9198e5, #4d9f0c 20px) 60; */
     /* box-shadow: v-bind('shadow'); */
     transition: 0.3s;
     overflow: hidden;
     box-shadow: 0 10px 20px rgba(0, 0, 0, .12), 0 4px 8px rgba(0, 0, 0, .06);

     background-color: #f8f9fa;

 }

 .list-group-item {

     border: none;
     background-color: #c1c1c100;

 }

 .list-group-item:hover {
     background-color: whitesmoke;

     transition: 0.3s;
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
     background: v-bind('textColor');
     border-radius: 10px;
 }

 /* img:hover {

     transform: scale(1.07);
     transition: 0.3s;
     border-radius: 1rem;
 } */

 img:hover[data-v-6608a9fc] {
     transform: scale(1.12);
     border-radius: 1rem;

 }

 img[data-v-6608a9fc] {
     border-radius: 10rem;

 }

 img {
     /* opacity: 0.7; */

     /* four conor round */


     object-fit: cover;
     object-position: 50% 50%;
     /* //round let the image close to the card border */
     transition: 0.3s;
     /* width: 100%; */
     /* height: 300px; */
     object-fit: cover;
     /* object-position: 50% 50%; */




     border-radius: 1rem 1rem 0 0;


     -webkit-user-drag: none;
     -webkit-user-select: none;
     -moz-user-select: none;
     -webkit-user-select: none;
     -ms-user-select: none;
     -khtml-user-select: none;
     user-select: none;
 }

 .btn {
     /* border-radius: 50%; */
     /* assign button color to the card */
     background-color: v-bind('btnColor');
     color: white;
     font-weight: 700;
     font-size: 1.2rem;
     border: none;
     transition: 0.3s;


 }

 span {
     font-weight: 1000;

 }




 /* .card-title {

    white-space: nowrap;
    max-width: 11em;
    overflow: hidden;
    overflow-x: auto;
} */</style>