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
        ]" :sortButton="true" :eventHistoryButton="true" :addButton="true" :searchButton="true"
        :isSearchEvents="isSearchEvents" 
        @sorting="fetchEvent"
        @searchEvent="fetchSearchEvent" ref="navSecondBar" />
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


    </div>
    <div class="d-flex justify-content-center p-4">
        <pagination :pagesProps="arr" :curPage="curPage" :lastPage="lastPage"
            :sort="sortDefault" :isSearchEvents="isSearchEvents.value"
            @fetchPage="fetchEvent"
            @fetchSearchPage="fetchSearchEvent"
             ref="pagination" />

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
        //default sort is ascending
        let sortDefault = ref('Ascending')
        let pageDefault = ref(1)
        let isSearchEvents = ref(false)
        const navSecondBar = ref(null)
        const pagination=ref(null)

        async function fetchEvent(page, sort) {
            // console.log(page)
            // console.log(sort)
            sortDefault.value = sort
            pageDefault.value = page

            let response = await fetch('/api/events?perPage=' + 6 + "&page=" + pageDefault.value + "&sort=" + sortDefault.value, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                var data = await response.json();
                arr.value = data.results;
                // console.log(data)
                lastPage.value = data.pages;
                curPage.value = page;
                navSecondBar.value.isSearchEvent = false
                pagination.value.isSearchEvents = false
            } else {
                alert(response.statusText);
            }
        }


        async function fetchSearchEvent(page, sort, input) {
            // sent request to server
            console.log(page+" "+sort+" "+input)
            //pagination will send the input as string, so we need to check if it is string or not
            //if it is string, then we don't need to get the value of input
            //navSecondBar will send the input as object, so we need to get the value of input
            // console.log(input)
//             var inputTran 
// if(input.value==undefined)
// inputTran=input
// else
// inputTran=input.value
            


            let response = await fetch('/api/events/searchAll?input=' + input + '&sort=' + sort + "&page=" + page, {
                method: 'POST'

            })
            if (response.ok) {
                var data = await response.json();
                // console.log(data);
                arr.value = data.results;
                lastPage.value = data.pages;
                curPage.value = page;
                isSearchEvents.value = true
                //set the navSecondBar's isSearchEvents to true
                navSecondBar.value.isSearchEvent = true
                pagination.value.isSearchEvents = true
                pagination.value.input = input
            } else {
                alert(response.statusText);
            }
        }

        // onBeforeMount(() => {
        //     fetchEvent(1)
        // })
        onMounted(() => {
            fetchEvent(pageDefault.value, sortDefault.value)
        })
        return {
            arr, curPage, lastPage, fetchEvent, isSearchEvents, sortDefault, fetchSearchEvent, navSecondBar,pagination
            
        }
    }
}
</script>

<style scoped>
.cards {
    margin-left: 250px;
}
</style>