<template>
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
        <form @submit.prevent="submitSurvey()">
            <h1> 活動名稱: {{ event.eventName }} </h1>
            <h3> 活動日期: {{ event.eventDate }} </h3>

            <div class="row" v-for="(q, index) in survey.questions" :key='q' >

                <h5 class="fw-bold"> 問題{{ index + 1 }}: {{ q.text }} :</h5>

                <div class="form-check mb-2" v-if="q.type == 'normal'">
                    <input type="radio" id="1" value="非常同意" v-model="temp[index]" required="required" />
                    <label for="1">非常同意</label>
                    <input type="radio" id="2" value="同意" v-model="temp[index]" required="required" />
                    <label for="2">同意</label>
                    <input type="radio" id="3" value="少許同意" v-model="temp[index]" required="required" />
                    <label for="3">少許同意</label>
                    <input type="radio" id="4" value="少許不同意" v-model="temp[index]" required="required" />
                    <label for="4">少許不同意</label>
                    <input type="radio" id="5" value="不同意" v-model="temp[index]" required="required" />
                    <label for="5">不同意</label>
                    <input type="radio" id="5" value="非常不同意" v-model="temp[index]" required="required" />
                    <label for="5">非常不同意</label>
                </div>

                <div class="form-check mb-2" v-if="q.type == 'open'">
                    <input type="text" placeholder="請輸入" v-model="temp[index]" required="required" />
                </div>

                <div class="form-check mb-2" v-if="q.type == 'rating'">
                    (1-10分，1分表示非常不值得推介；10分表示非常值得推介)
                    <select v-model="temp[index]" class="form-select" required="required">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <!-- <scoringBox /> -->
                </div>
                <div class="form-check mb-2" v-if="q.type == 'custom'">
                    <label for="ice-cream-choice">Choose:</label>
                    <input list="datalist" v-model="temp[index]" required="required">
                    <datalist id="datalist">
                        <!-- <option value="1"></option> -->
                        <option v-for="c in q.choose" :key='c' :value="c.option"></option>
                    </datalist>
                </div>
                <div class="form-check mb-2" v-if="q.type == 'filling'">
                    <input type="number" placeholder="請輸入" v-model="temp[index]" required="required" /> 人
                </div>

            </div>
            <button type="submit" class="btn btn-primary mt-4">Submit</button>
        </form>
    </div>
</template>
  
<script>
// import { VueFeedbackReaction } from 'vue-feedback-reaction';
// import { VueReactionEmoji } from 'vue-feedback-reaction';
import { ref, onMounted } from "vue";
import navBar from '@/components/public/navBar.vue';
import { useRoute } from "vue-router";

// import scoringBox from '@/components/NicoleTam/scoringBox.vue'

export default {
    name: 'FeedbackView',
    components: {
        navBar,
        // scoringBox,
        // VueFeedbackReaction,
        // VueReactionEmoji
    },
    props: {
        eventName: String,
        image: String,
    },
    setup(props) {
        const route = useRoute();
        const userId = localStorage.getItem('userId');
        const event = ref({})
        const temp = ref({})
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
                {
                    type: 'normal',
                    text: '活動內容達到你 / 你孩子的期望'
                },
                {
                    type: 'normal',
                    text: '活動能幫助你 / 你孩子減壓'
                },
                {
                    type: 'normal',
                    text: '活動能促進家人之間的溝通'
                },
                {
                    type: 'normal',
                    text: '活動能擴闊你 / 你孩子的社交圈子'
                },
                {
                    type: 'normal',
                    text: '活動能幫助你 / 你孩子在康復路上的適應'
                },
                {
                    type: 'normal',
                    text: '活動能讓你 / 你孩子有機會享受到有質素的生活'
                },
                {
                    type: 'normal',
                    text: '活動能增加你對 CCF 的歸屬感'
                },
                {
                    type: 'normal',
                    text: '工作員能清晰講解及指導活動進行'
                },
                {
                    type: 'normal',
                    text: '您滿意活動的整體效果'
                },
                {
                    type: 'open',
                    text: '請寫下你對是次活動的評價 / 感受 / 意見 / 建議 '
                },
                {
                    type: "custom",
                    text: "吸引你/你孩子參加是次活動的原因(可選多於一個)",
                    choose: [{ option: "活動免費" }, { option: "活動內容" }, { option: "活動性質" }]
                },
                {
                    type: "rating",
                    text: "如將來繼續舉辦此類活動，你有幾願意參與/推介給其他家庭呢"
                },
                {
                    type: "custom",
                    text: "請問你是透過以下那種方法報名參加是次活動？",
                    choose: [{ option: " 網上會員區 " }, { option: "電郵" }, { option: "傳真 " }]
                },
                {
                    type: "filling",
                    text: "現時同住的家庭人數",
                }

            ]
        };

        onMounted(async () => {
            var response = await fetch("/api/events/" + route.params.id);
            if (response.ok) {
                event.value = await response.json();
            }
            console.log(event)

            feedback.value.eventId = event.value._id
            feedback.value.userId = userId
            feedback.value.question = []


            for (let i = 0; i < survey.questions.length; i++) {
                let obj = {
                    text: "",
                    ans: ""
                }
                obj.text = survey.questions[i].text
                feedback.value.question[i] = obj
            }


            console.log(feedback.value)
        });


        const submitSurvey = async function () {
            console.log(temp)

            for (let i = 0; i < survey.questions.length; i++) {
                feedback.value.question[i].ans = temp.value[i]
            }

            var response = await fetch("/api/feedback/submit", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(feedback.value)
            });
            console.log(feedback.value)
            if (response.ok) {

                var text = await response.text();
                console.log(text)
                alert("成功提交, 多謝您的寶貴意見!");
            } else {
                alert(response.statusText)
            }
        }

        return {
            navBar,
            // scoringBox,
            event,
            questions,
            feedback,
            props,
            survey,
            questionIndex,
            submitSurvey,
            temp
        }
    }

    //   data: () => ({
    //     reaction: 'hate',
    //     isActive: false,
    //     isDisabled: false
    // })
};
</script>

<style scoped> .container {
     display: flex;
     align-items: center;
     gap: 50px;
     background-color: rgb(226, 217, 220);
     border-radius: 10px;
 }

 input[type="radio"] {
     margin: 10px;
 }

 label {
     font-family: 'Fira Sans', sans-serif;
 }
</style>