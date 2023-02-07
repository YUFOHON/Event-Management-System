<template>


    <div class="row">
        <navBar />
    </div>
    <div class="row py-4">
        <navSecondBar :arr="[
        {
            name: '主頁',
            URL: '/'
        }
        ,
        {
            name: '活動',
            URL: 'events'
        }
        ,
        {
            name: 'Veronica',
            URL: 'Veridian Dynamics'
        }]" :sortButton="true" :eventHistoryButton="true" :addButton="true" :search="true" />
    </div>

    <div class="row">
        <div v-for="index in 8" :key="index" class="col p">
            <eventCard />
        </div>

    </div>
</template>

<script>
// @ is an alias to /src

import navBar from '@/components/public/navBar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue'
import eventCard from '@/components/Bruce/eventCard.vue';
export default {
    name: 'EventView',
    components: {
        navBar,
        navSecondBar,
        eventCard

    },


}
</script>
