<template>
    <div>
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
                URL: '/events'
            }
            ,
            {
                name: '活動表格',
                URL: '#'
            }]" :sortButton="false" :eventHistoryButton="false" :addButton="false" :searchButton="true" />
        </div>
        <eventForm :isEventFormDetail="isEventFormDetail" :eventID="eventID" />

    </div>
</template>

<script>
import navBar from '@/components/public/navBar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue'
import eventForm from '@/components/Bruce/eventForm.vue'
import { useRoute } from 'vue-router';

export default {
    name: 'EventView',
    components: {
        navBar,
        navSecondBar,
        eventForm

    },
    setup() {
        const route = useRoute();
        // console.log(route.name);
        // console.log(route.params.id)
        //if this route.name == 'eventFormDetail' then get data from server
        const isEventFormDetail = route.name == 'eventFormDetail';
        const eventID = route.params.id;

        return {
            isEventFormDetail, eventID
        }
    }
}

</script>