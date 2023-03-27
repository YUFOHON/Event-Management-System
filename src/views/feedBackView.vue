<template>
    <div class="row" id="navBar">
        <navBar />
    </div>
    <div class="backGround">
        <div class="feedbackForm">
            <feedbackForm />
        </div>
    </div>
</template>
  
<script>
// import { VueFeedbackReaction } from 'vue-feedback-reaction';
// import { VueReactionEmoji } from 'vue-feedback-reaction';
// import { ref, onMounted } from "vue";
import navBar from '@/components/public/navBar.vue';
// import { useRoute } from "vue-router";
import feedbackForm from "@/components/NicoleTam/feedbackForm.vue";

// import scoringBox from '@/components/NicoleTam/scoringBox.vue'

export default {
    name: 'FeedbackView',
    components: {
        navBar,
        feedbackForm,
        // scoringBox,
        // VueFeedbackReaction,
        // VueReactionEmoji
    },
    setup() {

        return {
            navBar,
            feedbackForm
        }
    }
};
</script>

<style scoped>
.backGround {
    display: flex;
    flex-direction: column;
    background-image: url("@/assets/watercolor.jpg");
    background-size: 100% 100%;
    background-attachment: fixed;

    width: 100%;
    height: 100%;
    min-width: 900px;
    min-height: 1000px;

    /* justify-content: center; */
    align-items: center;
}
</style>
