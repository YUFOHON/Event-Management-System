<template>
    <div class="container">
        <form @submit="submitSurvey()">
            <p></p>
            <p>多謝 閣下參加兒童癌病基金的活動，希望您把意見寫下，讓我們能持續提升服務質素。 &#128522;</p>
            <p></p>
            <h2> 活動意見表 </h2>
            <h4> 活動名稱: {{ event.eventName }} &nbsp; &nbsp; &nbsp; 活動日期: {{ event.eventDate }} </h4>
            <p></p>
            <div class="row" v-for="(q, index) in survey.questions" :key='index'>

                <!-- <div v-show="index === questionIndex"> -->

                <h5 class="fw-bold"> 問題{{ index + 1 }}: {{ q.text }} :</h5>
                <!-- <p v-if="error" class="alert alert-danger">
                        Please select your answer
                    </p> -->

                <div class="form-check mb-2" v-if="q.type == 'normal'">

                    <label class="qLabel" for="1"> 非常同意 <br />
                        <input type="radio" id="1" value="非常同意" v-model="temp[index]" required="required" />
                    </label>

                    <label class="qLabel" for="2">同意 <br />
                        <input type="radio" id="2" value="同意" v-model="temp[index]" required="required" />
                    </label>

                    <label class="qLabel" for="3">少許同意 <br />
                        <input type="radio" id="3" value="少許同意" v-model="temp[index]" required="required" />
                    </label>

                    <label class="qLabel" for="4">少許不同意 <br />
                        <input type="radio" id="4" value="少許不同意" v-model="temp[index]" required="required" />
                    </label>

                    <label class="qLabel" for="5">不同意 <br />
                        <input type="radio" id="5" value="不同意" v-model="temp[index]" required="required" />
                    </label>

                    <label class="qLabel" for="5">非常不同意 <br />
                        <input type="radio" id="5" value="非常不同意" v-model="temp[index]" required="required" />
                    </label>

                </div>

                <div class="form-check mb-2" v-if="q.type == 'open'">
                    <input type="text" placeholder="請輸入" v-model="temp[index]" required="required" />
                </div>

                <div class="form-check mb-2" v-if="q.type == 'rating'">
                    (1-10分，1分表示非常不值得推介；10分表示非常值得推介)
                    <div class="range">
                        <input type="range" class="form-range" min="1" max="10" step="1" v-model="temp[index]" />
                    </div>
                    <ul class="range-labels">
                        <li class="active selected">1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                    </ul>
                    <p>分數: {{ temp[index] }}</p>
                    <!-- <starRating /> -->
                </div>
                <div class="form-check mb-2" v-if="q.type == 'custom'">
                    <label for="ice-cream-choice">Choose:</label>
                    <input :list="`datalist${index}`" v-model="temp[index]" required="required">
                    <datalist :id="`datalist${index}`">
                        <option v-for="c in q.choose" :key='c' :value="c.option"></option>
                    </datalist>
                </div>
                <div class="form-check mb-2" v-if="q.type == 'filling'">
                    <input type="number" placeholder="請輸入" v-model="temp[index]" required="required" /> 人
                </div>

                <!-- <div class="page">
                        <button class="btn btn-primary" v-if="questionIndex > 0" @click="prev()">
                            prev
                        </button>
                        <button class="btn btn-primary" @click="next()">
                            next
                        </button>
                    </div> -->
            </div>
            <button type="submit" class="btn btn-primary mt-4">Submit</button>
            <!-- </div> -->
            <!-- <div v-if="questionIndex = survey.questions.length">
                <button @click="submitSurvey()" class="btn btn-primary mt-4">Submit</button>
            </div> -->
        </form>

    </div>
</template>
  
<script>
// import { VueFeedbackReaction } from 'vue-feedback-reaction';
// import { VueReactionEmoji } from 'vue-feedback-reaction';
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

// import scoringBox from '@/components/NicoleTam/scoringBox.vue'

export default {
    name: 'feedbackForm',
    // data() {
    //     return {
    //         error: false
    //     }
    // },
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
        let questionIndex = 0;

        // const questions = ["活動日期、時間、地點合適",
        //     "活動內容達到你 / 你孩子的期望",
        //     "活動能幫助你 / 你孩子減壓",
        //     "活動能促進家人之間的溝通",
        //     "活動能擴闊你 / 你孩子的社交圈子",
        //     "活動能幫助你 / 你孩子在康復路上的適應",
        //     "活動能讓你 / 你孩子有機會享受到有質素的生活",
        //     "活動能增加你對 CCF 的歸屬感",
        //     "工作員能清晰講解及指導活動進行",
        //     "您滿意活動的整體效果"]


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

        // const next = async function () {
        //     console.log(temp[questionIndex])
        //     if (temp[questionIndex] == undefined) {
        //         this.error = true;

        //     }
        //     else {
        //         this.error = false;
        //         questionIndex++;
        //     }
        //     console.log(this.error)
        // }

        // const prev = async function () {
        //     questionIndex--;
        // }


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
            // console.log(feedback.value)
            if (response.ok) {
                var text = await response.text();
                console.log(text)
                alert("成功提交, 多謝您的寶貴意見!");
                location.assign("/cEnrollment")
            } else {
                alert(response.statusText)
            }
        }

        return {
            event,
            // questions,
            feedback,
            props,
            survey,
            questionIndex,
            submitSurvey,
            temp,
        }
    },
    watch: {
        error() {
            if (this.error) {
                alert("Please select your answer")
            }
        }
    }

};
</script>

<style scoped> .container {
     width: 70%;
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

 .range-labels{
  margin: 18px -41px 0;
  padding: 0;
  list-style: none;
  
  
  }
  .range-labels li{
    position: relative;
    float: left;
    width: 97px;
    text-align: center;
    color: #b2b2b2;
    font-size: 14px;
    cursor: pointer;
  }


</style>