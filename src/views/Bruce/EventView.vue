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
            URL: '/events'
        }
        ]" :sortButton="true" :eventHistoryButton="true" :addButton="true" :search="true" @sorting="sortEvent" />
    </div>

    <div class="cards">
        <div class="row d-flex py-4">
            <div v-for="a in arr.slice(0, 3)" :key="a" class="col">
                <eventCard :eventName="a.eventName" :image="a.image" :content="a.content" :id="a._id"
                    :Date="a.eventDate" />
            </div>
        </div>

        <div class="row d-flex">
            <div v-for="a in arr.slice(3)" :key="a" class="col">
                <eventCard :eventName="a.eventName" :image="a.image" :content="a.content" :id="a._id"
                    :Date="a.eventDate" />
            </div>
        </div>

        <div class="pagination">
            <pagination @fetchPage="fetchEvent" :pagesProps="arr" :curPage="curPage" :lastPage="lastPage" />


        </div>
    </div>

</template>

<script>
// @ is an alias to /src

import navBar from '@/components/public/navBar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue'
// import eventForm from '@/components/Bruce/eventForm.vue'

// import SideBar from '@/components/sideBar.vue';
import { onMounted } from 'vue'
// import { onBeforeMount } from 'vue'
import { ref } from 'vue'
import eventCard from '@/components/Bruce/eventCard.vue';
import pagination from '@/components/Bruce/pagination.vue';

export default {
    name: 'EventView',
    components: {
        navBar,
        navSecondBar,
        pagination,
        eventCard
        // SideBar
    },
    setup() {
        let arr = ref([]);
        let curPage = ref(1);
        let lastPage = ref(1);

        async function sortEvent(sort) {
            fetchEvent(1, sort)
        }

        async function fetchEvent(page, sort) {
            console.log(sort)
            let response = await fetch('/api/events?perPage=' + 6 + "&page=" + page + "&sort=" + sort, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                var data = await response.json();
                arr.value = data.results;
                console.log(arr.value)
                lastPage.value = data.pages;
                curPage.value = page;
            } else {
                alert(response.statusText);
            }
        }



        // onBeforeMount(() => {
        //     fetchEvent(1)
        // })

        onMounted(() => {
            fetchEvent(1, 'Ascending')
        })
        return {

            arr, curPage, lastPage, fetchEvent, sortEvent
        }
    }
}
</script>

<style scoped>
.cards {
    margin-left: 250px;
}
</style>