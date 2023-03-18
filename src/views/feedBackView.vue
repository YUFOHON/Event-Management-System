<template>
    <div class="row" id="navBar">
        <navBar />
    </div>
    <div class="row col-5">
        <h4 class="fw-bold text-center mt-3"></h4>
        <form @submit.prevent="submitSurvey()">
            <div class="row" v-for="q in questions" :key="q">
                <p class="fw-bold">{{ q }}</p>
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="exampleForm" id="radioExample1" />
                    <label class="form-check-label" for="radioExample1">
                        Option 1
                    </label>
                </div>
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="exampleForm" id="radioExample2" />
                    <label class="form-check-label" for="radioExample2">
                        Option 2
                    </label>
                </div>
                <div class="form-check mb-2">
                    <input class="form-check-input" type="radio" name="exampleForm" id="radioExample3" />
                    <label class="form-check-label" for="radioExample3">
                        Option 3
                    </label>
                </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
</template>
  
<script>
// import { VueFeedbackReaction } from 'vue-feedback-reaction';
// import { VueReactionEmoji } from 'vue-feedback-reaction';
import { ref } from "vue";
import navBar from '@/components/public/navBar.vue';

export default {
    name: 'FeedbackView',
    components: {
        navBar,
        // VueFeedbackReaction,
        // VueReactionEmoji
    },
    setup() {
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

        const submitSurvey = async function () {

        }

        return {
            navBar,
            questions,
            feedback,
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