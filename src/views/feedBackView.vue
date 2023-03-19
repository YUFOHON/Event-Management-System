<template>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head>
    <div class="row" id="navBar">
        <navBar />
    </div>
    <!-- <div class="container">
        <form @submit.prevent="submitSurvey()">
            <h1> 活動名稱 </h1>
            <h3> 活動日期: </h3>
            <div class="row" v-for="q in questions" :key="q">
                <h5 class="fw-bold">{{ q }}</h5>
                <div class="form-check mb-2">
                    <input type="radio" id="one" value="One" />
                    <label for="one">option 1</label>

                    <input type="radio" id="two" value="Two" />
                    <label for="two">option 2</label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div> -->

    <div class="container">
        <div clas="row" v-for="q in survey.questions" :key="q">
            <h5 class="fw-bold">{{ q.text }}</h5>

            <div class="form-check mb-2" v-if="q.type == 'normal'">
                <input type="radio" id="one" value="One" />
                <label for="one">option 1</label>

                <input type="radio" id="two" value="Two" />
                <label for="two">option 2</label>
            </div>

            <div class="form-check mb-2" v-if="q.type == 'open'">
                <input type="text" placeholder="請輸入">
            </div>

            <div class="form-check mb-2" v-if="q.type == 'scoring'">
                <scoringBox />
            </div>

        </div>
    </div>
</template>
  
<script>
// import { VueFeedbackReaction } from 'vue-feedback-reaction';
// import { VueReactionEmoji } from 'vue-feedback-reaction';
import { ref, onMounted } from "vue";
import navBar from '@/components/public/navBar.vue';
import scoringBox from '@/components/NicoleTam/scoring.vue'

export default {
    name: 'FeedbackView',
    components: {
        navBar,
        scoringBox,
        // VueFeedbackReaction,
        // VueReactionEmoji
    },
    props: {
        eventName: String,
        image: String,
    },
    setup(props) {
        const feedback = ref({});
        const questionIndex = 0;
        const questions = ["活動日期、時間、地點合適",
            "活動內容達到你 / 你孩子的期望",
            "活動能幫助你 / 你孩子減壓",
            "活動能促進家人之間的溝通",
            "活動能擴闊你 / 你孩子的社交圈子",
            "活動能幫助你 / 你孩子在康復路上的適應",
            "活動能讓你 / 你孩子有機會享受到有質素的生活",
            "活動能增加你對 CCF 的歸屬感",
            "工作員能清晰講解及指導活動進行",
            "您滿意活動的整體效果"]


        let survey = {
            title: "Feedback Form",
            questions: [
                {
                    type: 'normal',
                    text: '活動日期、時間、地點合適'
                },
                // {
                //     type: 'normal',
                //     text: '活動內容達到你 / 你孩子的期望'
                // },
                {
                    type: 'open',
                    text: '請寫下你對是次活動的評價 / 感受 / 意見 / 建議： '
                },
                {
                    type: "scoring",
                    text: "如將來繼續舉辦此類活動，你有幾願意參與/推介給其他家庭呢？"
                },
                {
                    type: "mix",
                    text: "吸引你/你孩子參加是次活動的原因(可選多於一個)："
                }
            ]
        };


        const submitSurvey = async function () {

        }

        onMounted(() => {

        })

        return {
            navBar,
            scoringBox,
            questions,
            feedback,
            props,
            survey,
            questionIndex,
            submitSurvey
        }
    }

    //   data: () => ({
    //     reaction: 'hate',
    //     isActive: false,
    //     isDisabled: false
    // })
};
</script>

<style scoped> 
.container {
     display: flex;
     align-items: center;
     gap: 50px;
     background-color: rgb(226, 217, 220);
     border-radius: 10px;
 }

 input[type="radio"] {
     margin: 10px;
 }
</style>