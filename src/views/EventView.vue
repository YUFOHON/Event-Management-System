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
            <eventForm />
        </div>
</template>

<script>
// @ is an alias to /src

import navBar from '@/components/public/navBar.vue'
// import SideBar from '@/components/sideBar.vue';
import navSecondBar from '@/components/Bruce/navSecondBar.vue'

import eventForm from '@/components/Bruce/eventForm.vue'
import { onMounted } from 'vue'

export default {
    name: 'EventView',
    components: {
        navBar,
        navSecondBar,
        eventForm
        // SideBar
    },
    setup() {

onMounted(() => {
console.log('mounted')


})
        return {
        }
    }
}
</script>
