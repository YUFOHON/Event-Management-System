<template>

    <div class="row" id="navBar">
        <navBar />
    </div>

    <div class="row py-4" id="navSecondBar">
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
            :isSearchEvents="isSearchEvents" @sorting="fetchEvent" @searchEvent="fetchSearchEvent" ref="navSecondBar" />
    </div>

    <div class="row">

        <div class="col col-1 py-4 px-4" id="sideBarContainer">
            <SideBar @setFontSize="setFontSize" />
        </div>

        <div class="col col-10  ">


            <div class="row d-flex">
                <div v-for="a in arr" :key="a" class="col">
                    <eventCard :eventName="a.eventName" :image="a.image" :content="a.content" :id="a._id"
                        :Date="a.eventDate" :fontSize="fontSize" :cardWidth="cardWidth" ref="card" />
                </div>
            </div>
            <!-- <div class="row d-flex py-4">
                    <div v-for="a in arr.slice(0, 3)" :key="a" class="col">
                        <eventCard :eventName="a.eventName" :image="a.image" :content="a.content" :id="a._id"
                            :Date="a.eventDate" ref="cards" />
                    </div>
                </div> -->

            <div class="d-flex justify-content-center p-4" id="pagination">
                <pagination :pagesProps="arr" :curPage="curPage" :lastPage="lastPage" :sort="sortDefault"
                    :isSearchEvents="isSearchEvents.value" ref="pagination" />

            </div>
        </div>
    </div>


</template>

<script>
// @ is an alias to /src

import navBar from '@/components/public/navBar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue'
// import eventForm from '@/components/Bruce/eventForm.vue'
import SideBar from '@/components/Bruce/sideBar.vue';
import { onMounted } from 'vue'
// import { onBeforeMount } from 'vue'
import { ref } from 'vue'
import eventCard from '@/components/Bruce/eventCard.vue';
import pagination from '@/components/Bruce/pagination.vue';
import { watch } from 'vue'
import { useRoute } from 'vue-router'
// import { useRouter } from 'vue-router'
export default {
    name: 'EventView',
    components: {
        navBar,
        navSecondBar,
        pagination,
        eventCard,
        SideBar,

    },
    setup() {
        let arr = ref([]);
        let curPage = ref(1);
        let lastPage = ref(1);
        //default sort is ascending
        let sortDefault = ref('Descending')
        let isSearchEvents = ref(false)
        const navSecondBar = ref(null)
        const pagination = ref(null)
        const card = ref(null)
        const fontSize = ref(1)
        const cardWidth = ref(22 + 2 * 1)
        // const router = useRouter()
        const route = useRoute()
        async function fetchEvent(page, sort) {
            // console.log(page)
            // console.log(router)
            // page to number
            page = Number(page)
            console.log(page, sort)
            let response = await fetch('/api/events?perPage=' + 6 + "&page=" + page + "&sort=" + sort, {
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
            page = Number(page)
            console.log(page + " " + sort + " " + input)

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
            // location.reload()
        }
        watch(fontSize, (currentValue, oldValue) => {
            console.log(currentValue);
            console.log(oldValue);
        });
        //watch the route, if the route change, then we need to fetch the event again
        watch(route, (currentValue, oldValue) => {
            console.log(currentValue.query.input);
            console.log(oldValue);
            sortDefault.value = currentValue.query.sort
            if (currentValue.query.input == undefined) {
                if (currentValue.query.page == undefined)
                    fetchEvent(1, sortDefault.value)
                else
                    fetchEvent(currentValue.query.page, currentValue.query.sort)
            } else {
                fetchSearchEvent(currentValue.query.page, currentValue.query.sort, currentValue.query.input)
            }

        });
        function setFontSize(s) {
            fontSize.value = s
            cardWidth.value = 22 + 2 * s
        }

        onMounted(() => {
            //if the route doesn't have input, then use fetchEvent, else use fetchSearchEvent
            if (route.query.input == undefined) {
                if (route.query.page == undefined)
                    fetchEvent(1, sortDefault.value)
                else
                    fetchEvent(route.query.page, route.query.sort)
            } else {
                fetchSearchEvent(route.query.page, route.query.sort, route.query.input)
            }
        })
        return {
            arr, card, fontSize, cardWidth, curPage, SideBar, lastPage, setFontSize, fetchEvent, isSearchEvents, sortDefault, fetchSearchEvent, navSecondBar, pagination

        }
    }
}
</script>

<style scoped>
.cards {
    margin-left: 250px;
}
</style>