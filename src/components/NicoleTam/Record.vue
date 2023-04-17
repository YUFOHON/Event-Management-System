<template>
    <div class="container">
        <form @submit.prevent="submitSurvey()">
            <p></p>
            <p>多謝 閣下參加兒童癌病基金的活動，並提供了寶貴的意見，讓我們能持續提升服務質素。 &#128522;</p>
            <p></p>
            <h2> 活動意見表 </h2>
            <h4> 活動名稱: {{ event.eventName }} &nbsp; &nbsp; &nbsp; 活動日期: {{ event.eventDate }} </h4>
            <p></p>
            <div class="row" v-for="(q, index) in feedback" :key='index'>

                <h7 class="fw-bold"> 問題{{ index + 1 }}: {{ q.text }} :</h7>
                <label for="Ans" class="form-label">你的回答:</label>
                <input type="text" class="form-control" id="Ans" :value= q.ans disabled>



            </div>
        </form>

    </div>
</template>
  
<script>

import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// import starRating from '@/components/NicoleTam/scoringBox.vue'

export default {
    name: 'feedbackForm',
    // data() {
    //     return {
    //         error: false
    //     }
    // },
    setup() {
        const route = useRoute();
        // const userId = localStorage.getItem('userId');
        const event = ref({})
        const feedback = ref({});
        // const record = ref({})

        const getRecord = async function () {
            var response = await fetch("/api/feedback/" + route.params.eid + "/" + route.params.uid);
            if (response.ok) {
                let result = await response.json();
                // feedback.value = JSON.stringify(result.results)
                feedback.value = result.results[0].question
            }
            console.log(feedback.value)


            // for(let i = 0; i < feedback.value.results[0].question.length; i++){
            //     console.log(feedback.value.results[0].question[i].text)
            //     record.value.question[i].text = feedback.value.results[0].question[i].text
            // }

            // console.log(record)
        }

        onMounted(async () => {
            getRecord()

            var response = await fetch("/api/events/" + route.params.eid);
            if (response.ok) {
                event.value = await response.json();
            }
            console.log(event)
        });


        return {
            event,
            feedback
        }
    }


};
</script>

<style scoped> .container {
     width: 90%;
     display: flex;
     align-items: center;
     gap: 50px;
     background-color: rgb(255, 255, 255);
     border-radius: 10px;
 }

 /* * {
    text-align: center;
 } */

 select {
     width: 300px;
 }

 input[type="radio"] {
     margin: 15px;
     text-align: center;
 }

 label {
     font-family: 'Fira Sans', sans-serif;
 }

 .qLabel {
     margin-right: 40px
 }

 input[type=radio] {
     width: 17px;
     height: 17px;
 }

 .range-labels {
     margin: 18px -41px 0;
     padding: 0;
     list-style: none;


 }

 .range-labels li {
     position: relative;
     float: left;
     width: 97px;
     text-align: center;
     color: #b2b2b2;
     font-size: 14px;
     cursor: pointer;
 }
</style>