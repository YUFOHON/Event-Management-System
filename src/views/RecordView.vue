<template>
    <div class="row" id="navBar">
        <navBar />
    </div>
    <div class="backGround">
        <div class="feedbackRecord">
            <Record />
        </div>
    </div>
</template>
  
<script>

import navBar from '@/components/public/navBar.vue';
import Record from "@/components/NicoleTam/Record.vue";


export default {
    name: 'RecordView',
    components: {
        navBar,
        Record,

    },
    setup() {

        return {
            navBar,
            Record
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
