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

import navBar from '@/components/public/navBar.vue';
import feedbackForm from "@/components/NicoleTam/feedbackForm.vue";


export default {
    name: 'FeedbackView',
    components: {
        navBar,
        feedbackForm,

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

.feedbackForm{
    margin: 30px auto 30px
}
</style>
