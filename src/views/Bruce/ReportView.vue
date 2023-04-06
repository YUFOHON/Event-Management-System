<template>
    <navBar />
    <div class="my-4">
        <navSecondBar :arr="[
            {
                name: '主頁',
                URL: '/events'
            }
            ,
            {
                name: '報告',
                URL: '/report'
            }
        ]" />
    </div>
    <div class="chart" >
        <iframe
            style="background: #F1F5F4;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);width: 100vw;height: 100vh; margin-left: 10%;"
            src="https://charts.mongodb.com/charts-comp4117-spring2023-group-zcrxr/embed/dashboards?id=642e92b2-b95e-4017-8b28-33ed69d16ef4&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"></iframe>
    </div>
</template>

<script setup>
// import { ref, onMounted } from "vue";

import navBar from "@/components/public/navBar.vue";
import navSecondBar from "@/components/Bruce/navSecondBar.vue";


</script>

<style scoped></style>