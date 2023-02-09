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
        }]" :sortButton="false" :eventHistoryButton="false" :addButton="false" :search="true" />
    </div>
        <eventForm></eventForm>
    </div>
</template>

<script>
import navBar from '@/components/public/navBar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue'
import eventForm from '@/components/Bruce/eventForm.vue'

export default {
    name: 'EventView',
    components: {
        navBar,
        navSecondBar,
        eventForm

    },
    setup() {

        return {

        }
    }
}

</script>