<template>
    <div class="row" id="navBar">
        <navBar />
    </div>
    <div class="container">
        <form @submit.prevent="submitSurvey()">
            <h1> 活動名稱 </h1>
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
    </div>
</template>
  
<script>
// import { VueFeedbackReaction } from 'vue-feedback-reaction';
// import { VueReactionEmoji } from 'vue-feedback-reaction';
import { ref, onMounted, computed } from "vue";
import navBar from '@/components/public/navBar.vue';

export default {
    name: 'FeedbackView',
    components: {
        navBar,
        // VueFeedbackReaction,
        // VueReactionEmoji
    },
    props: {
        eventName: String,
        image: String,
    },
    setup(props) {
        const feedback = ref({});
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

        const submitSurvey = async function () {

        }

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
            navBar,
            questions,
            feedback,
            props,
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

<style> 
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