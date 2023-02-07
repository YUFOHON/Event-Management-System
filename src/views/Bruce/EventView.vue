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
        <div v-for="index in 4" :key="index" class="col p">
            <eventCard />
        </div>
    </div>
</template>

<script>
// @ is an alias to /src

import navBar from '@/components/public/navBar.vue'
// import SideBar from '@/components/sideBar.vue';
import navSecondBar from '@/components/Bruce/navSecondBar.vue'

// import eventForm from '@/components/Bruce/eventForm.vue'
import { onMounted } from 'vue'
import eventCard from '@/components/Bruce/eventCard.vue';

export default {
    name: 'EventView',
    components: {
        navBar,
        navSecondBar,
        // eventForm,
        eventCard
        // SideBar
    },
    setup() {
        let arr = [];
        // let curPage = 1;
        // let lastPage = 1;

        async function greeting() {
            let response = await fetch('/api/events', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
        var data = await response.json();
         arr = data.results;
        // lastPage = data.pages;
        // curPage = page;
        console.log(arr);
      } else {
        alert(response.statusText);
      }

        }
        onMounted(() => {
            greeting()
        }
        )


        return {
        }
    }
}
</script>
