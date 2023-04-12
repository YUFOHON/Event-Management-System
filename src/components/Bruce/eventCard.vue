<template>
    <div class="card" @mouseover="textColor = '#000000'" @mouseout="textColor = defaultColor">


        <div class=" card-body py-4" style="margin-top: -5%;">
            <!-- <img :src=props.image   class="mb-3" alt="..." style="width: 20rem; height: 10rem;"> -->

            <img v-if="url != 'default'" :src="url" class="mb-3" alt="上傳圖片" style="width: 20rem; height: 10rem;">
            <img v-if="url == 'default'" src="@/assets/BG2.jpg" class="mb-3" alt="上傳圖片"
                style="width: 20rem; height: 10rem;">
            <!-- <img :src="url" class="mb-3" alt="..." style="width: 20rem; height: 10rem;"> -->

            <ul class="list-group list-group-flush">

                <li class="list-group-item" style="margin-top: -0%;">
                    <div class="card-title row">
                        <!-- <p ref="root" class="eventName text-center">
                                    名稱： {{ props.eventName }}
                                </p> -->

                        <!-- <div class="col col-5  pt-3" :style="{ 'font-weight': 'bolder', 'color': textColor }">名稱 </div> -->

                        <div class="col " :style="{ 'font-weight': 'bolder', 'color': textColor }">

                            <p class="" style="text-align: center;"> {{ props.eventName }}</p>

                        </div>
                    </div>
                </li>


                <li class="list-group-item" style="margin-top: -4%;">
                    <!-- <p class="card-text text-center">日期：{{ props.Date }}</p> -->
                    <div class="row">

                        <div class="col " :style="{ 'font-weight': 'bolder', 'color': textColor }">
                            <p class="" style="text-align: center;"> {{ props.Date }}</p>
                        </div>
                    </div>
                </li>
                <div class="" style="padding-left: 42%; margin-top: %">
                    <router-link :to="'/events/eventForm/' + props.id" class="btn btn-danger  ">查看</router-link>
                </div>
                <li class="list-group-item" style="margin-top: 10px;  ">
                    <div class="content  ">

                        <!-- <div class="col col-5  pt-3" >內容 </div> -->

                        <div class="col gy-3" :style="{ 'font-weight': 'bolder', 'color': textColor }">
                            <p style="max-height: 100px;text-align: center; overflow-y: auto;">{{ props.content }}</p>
                        </div>
                    </div>
                </li>

            </ul>



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
                return color + ' #F0C659'
            } else if (props.Category == '青年活動') {
                return color + ' #B9F48E'
            } else if (props.Category == '同路人支援平台') {
                return color + ' #D090EE'
            } else {
                return color + ' #ED5A5A'
            }


        }

        )
        const btnColor = computed(() => {
            if (props.Category == '兒童活動') {
                return '#F0C659'
            } else if (props.Category == '青年活動') {
                return '#B9F48E'
            } else if (props.Category == '同路人支援平台') {
                return '#D090EE'
            } else {
                return '#ED5A5A'
            }
        }
        )

        const fileFormat = ref('')
        const url = ref(props.image)
        const textColor = ref('#000000')
        const defaultColor = computed(() => {
            if (props.Category == '兒童活動') {
                return '#af8221'
            } else if (props.Category == '青年活動') {
                return '#037316'
            } else if (props.Category == '同路人支援平台') {
                return '#8a56dd'
            } else {
                return '#ff0000'
            }
        })


        onMounted(() => {
            textColor.value = defaultColor.value
            // console.log(props.id)
            if (props.file == undefined) {
                url.value = 'default'
            } else {
                fileFormat.value = props.file[0].split("/")[1].split(";")[0]
                // console.log(fileFormat.value)
                url.value = '/api/files/' + props.id + '.' + fileFormat.value
            }




        })
        return {
            props, root, shadow, btnColor, url, textColor, defaultColor
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
     /* background-color: #c1c1c153; */
     height: 460px;
     transform: skew(0deg);
     transform: scale(1.08);
     transition: 0.7s;
     box-shadow: 0 10px 20px rgba(0, 0, 0, .12), 0 4px 8px rgba(0, 0, 0, .06);
     /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); */
     box-shadow: v-bind('shadow');
     /* background-color: v-bind('btnColor'); */

 }

 .card {
     animation-duration: 0.5s;
     animation-name: slidein;
     /* transform: skewX(5deg); */
     width: 355px;
     height: 334px;
     margin: 1rem;
     border-radius: 1rem;
     /* box-shadow: 5px 5px 15px #af8221; */
     /* border-image: repeating-linear-gradient(30deg, #4d9f0c, #9198e5, #4d9f0c 20px) 60; */
     /* box-shadow: v-bind('shadow'); */
     transition: 0.3s;
     overflow: hidden;

     box-shadow: 0 10px 20px rgba(0, 0, 0, .12), 0 4px 8px rgba(0, 0, 0, .06);

 }

 .list-group-item {

     border: none;
     background-color: #c1c1c100;

 }

 .list-group-item:hover {
     max-height: 10%;
     background-color: v-bind('btnColor');
     border-radius: 3%;
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
     box-shadow: -15px -15px 30px 0 #fff, 15px 15px 30px 0 #1d0dca17;
     width: 353px;
     margin-left: -81%;
     margin-top: 3%;
 }

 .btn:hover {
     background-color: v-bind('btnColor');
     /* box-shadow: 0 4px 3px 1px #FCFCFC, 0 6px 8px #D6D7D9, 0 -4px 4px #CECFD1, 0 -6px 4px #FEFEFE, inset 0 0 3px 3px #CECFD1; */
     box-shadow: 4px 4px 6px 0 rgba(255, 255, 255, .5),
         -4px -4px 6px 0 rgba(116, 125, 136, .5),
         inset -4px -4px 6px 0 rgba(255, 255, 255, .2),
         inset 4px 4px 6px 0 rgba(0, 0, 0, .4);
 }


 span {
     font-weight: 1000;
 }

 /* .card-title {

    white-space: nowrap;
    max-width: 11em;
    overflow: hidden;
    overflow-x: auto;
} */
</style>