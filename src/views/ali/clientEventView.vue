<template>
    
    <div class="row" id="clientNavbar">
        <clientNavbar/>
    </div>
    
    <div class="row py-4" id="clientNav2bar">
        <clientNav2bar :arr="[
        {
            name: '主頁',
            URL: '/cEvents'
        }

        ]" :sortButton="true" :searchButton="true"
        :isSearchEvents="isSearchEvents" @sorting="fetchEvent" @searchEvent="fetchSearchEvent" ref="clientNav2bar" />
    </div>
    
    <div class="bg">
        <div class="row" id="cards">

        //     <!-- <div class="col col-1 py-4 px-4" id="sideBarContainer">
        //     <SideBar @setFontSize="setFontSize" />
        // </div> -->

            <div class="col " style="margin-left: 140px;">


                <div class="row d-flex">
                    <div v-for="a in arr" :key="a" class="col" id="cards">
                        <!-- {{ a._id }} -->
                        <clientEventCard :eventName="a.eventName" :image="a.image" :content="a.content" :id="a._id"
                            :Date="a.eventDate" :fontSize="fontSize" :cardWidth="cardWidth" :Category="a.Category"
                            :file="a.files" ref="card" />
                    </div>
                </div>

                <div class="d-flex justify-content-center p-4" id="clientPagination">
                    <clientPagination :pagesProps="arr" :curPage="curPage" :lastPage="lastPage" :sort="sortDefault"
                        :isSearchEvents="isSearchEvents" ref="clientPagination" />

                </div>
            </div>
        </div>
    </div>

    <Alert ref="alert" />
    
</template>

<script>
// @ is an alias to /src

import clientNavbar from '@/components/ali/clientNavbar.vue'
import clientNav2bar from '@/components/ali/clientNav2bar.vue'
// import eventForm from '@/components/Bruce/eventForm.vue'
//import SideBar from '@/components/Bruce/sideBar.vue';
import { onMounted } from 'vue'
// import { onBeforeMount } from 'vue'
import { ref } from 'vue'
import clientEventCard from '@/components/ali/clientEventCard.vue';
import clientPagination from '@/components/ali/clientPagination.vue';
import { watch } from 'vue'
import { useRoute } from 'vue-router'
//import { utils, read } from 'xlsx';
import Alert from '@/components/Bruce/AlertWindow.vue';
// import { useRouter } from 'vue-router'

export default {
    name: 'clientEventView',
    components: {
        clientNavbar,
        clientNav2bar,
        clientPagination,
        clientEventCard,
        Alert,
    },
    setup() {
        const alert = ref(null)
        let arr = ref([]);
        let curPage = ref(1);
        let lastPage = ref(1);
        let sortDefault = ref('Descending')
        let isSearchEvents = ref(false)
        const clientNav2bar = ref(null)
        const clientPagination = ref(null)
        const card = ref(null)
        const fontSize = ref(1)
        const cardWidth = ref(22 + 2 * 5)
        const route = useRoute()

        const checkRouterValue = (page, sort, category) => {
            if (category == undefined || category == '') {
                category = ['兒童活動|青年活動|活動義工招募|同路人支援平台']
            }
            if (page == undefined) {
                page = 1
            }
            if (sort == undefined || sort == '') {
                sort = 'Descending'
            }
            return [page, sort, category]
        }
        
        
        async function fetchEvent(page, sort, input, category) {
            [page, sort, category] = checkRouterValue(page, sort, category)
            alert.value.alert("成功加載活動", "success")
            console.log(category)
            page = Number(page)
            let response
            if (input == undefined || input == '') {
                //set the new category value  to all child component category value
                isSearchEvents.value = false
                clientNav2bar.value.isSearchEvent = false
                clientPagination.value.isSearchEvents = false
                clientPagination.value.category = category
                response = await fetch('/api/cEvents?perPage=' + 12 + "&page=" + page + "&sort=" + sort + "&category=" + category, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                //set the new category value  to all child component category value
                isSearchEvents.value = true
                clientNav2bar.value.isSearchEvent = true
                clientPagination.value.isSearchEvents = true
                clientPagination.value.input = input
                clientPagination.value.category = category
                
                response = await fetch('/api/cEvents/searchAll?input=' + input + '&sort=' + sort + "&page=" + page + "&category=" + category, {
                    method: 'POST'
                    
                })
            }
            if (response.ok) {
                var data = await response.json();
                arr.value = data.results;
                lastPage.value = data.pages;
                curPage.value = page;
                // clientNav2bar.value.isSearchEvent = false
                // pagination.value.isSearchEvents = false
            } else {
                alert(response.statusText);
            }
        }
        
        
        async function fetchSearchEvent(page, sort, input) {
            // sent request to server
            page = Number(page)
            // console.log(page + " " + sort + " " + input)
            
            let response = await fetch('/api/cEvents/searchAll?input=' + input + '&sort=' + sort + "&page=" + page, {
                method: 'POST'
                
            })
            if (response.ok) {
                var data = await response.json();
                // console.log(data);
                arr.value = data.results;
                lastPage.value = data.pages;
                curPage.value = page;
                isSearchEvents.value = true
                //set the clientNav2bar's isSearchEvents to true
                clientNav2bar.value.isSearchEvent = true
                clientPagination.value.isSearchEvents = true
                clientPagination.value.input = input
                
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
            fetchEvent(currentValue.query.page, currentValue.query.sort, currentValue.query.input, currentValue.query.category)
            
        });
        function setFontSize(s) {
            fontSize.value = s
            cardWidth.value = 22 + 2 * s
        }
        
        onMounted(() => {
            //if the route doesn't have input, then use fetchEvent, else use fetchSearchEvent
            fetchEvent(route.query.page, route.query.sort, route.query.input, route.query.category)
        })
        return {
            alert, Alert, arr, card, fontSize, cardWidth, curPage, lastPage, setFontSize, fetchEvent, isSearchEvents, sortDefault, fetchSearchEvent, clientNav2bar, clientPagination, clientNavbar,
            checkRouterValue
            
        }
    }
}
</script>

<style scoped>
#cards {
    max-width: max-content;
}

.bg {
    display: flex;
    flex-direction: column;
    background-image: url("@/assets/city.jpg");
    background-size: 100% 100%;
    background-attachment: fixed;

    width: 100%;
    height: 100%;
    min-width: 900px;
    min-height: 1000px;

    justify-content: center;
    align-items: center;
}
</style>


