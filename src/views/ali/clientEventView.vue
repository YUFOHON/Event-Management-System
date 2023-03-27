<template>
    
    <div class="row" id="clientNavbar">
        <clientNavbar/>
    </div>
    
    <div :class="bg">
    <div class="row py-4" id="clientNav2bar">
        <clientNav2bar 
        @changeEventNumber="handleChangeEventNumber"
        :arr="[
        {
            name: '主頁',
            URL: '/cEvents'
        }

        ]" :sortButton="true" :searchButton="true"
        :isSearchEvents="isSearchEvents" @sorting="fetchEvent" @searchEvent="fetchSearchEvent" ref="clientNav2bar"/>
    </div>
    
        <div class="row" id="cards">

            <!-- <div class="col col-1 py-4 px-4" id="sideBarContainer">
            <SideBar @setFontSize="setFontSize" />
        </div> -->

            <div class="col " style="margin-left: 140px;">


                <div class="row d-flex">
                    <div v-for="a in arr" :key="a" class="col" id="cards">
                        <!-- {{ a._id }} -->
                        <clientEventCard :eventName="a.eventName" :image="a.image" :content="a.content" :id="a._id"
                            :Date="a.eventDate" :fontSize="fontSize" :cardWidth="cardWidth" :Category="a.Category"
                            :file="a.files" ref="card" />
                    </div>
                </div>
            </div>
        </div>

                <div class="d-flex justify-content-center p-4" id="clientPagination">
                    <clientPagination :pagesProps="arr" :curPage="curPage" :lastPage="lastPage" :sort="sortDefault"
                        :isSearchEvents="isSearchEvents" ref="clientPagination" />

                </div>
            </div>
     
</template>

<script>
// @ is an alias to /src

import clientNavbar from '@/components/ali/clientNavbar.vue'
import clientNav2bar from '@/components/ali/clientNav2bar.vue'
import { onMounted, ref, computed } from 'vue'
import clientEventCard from '@/components/ali/clientEventCard.vue';
import clientPagination from '@/components/ali/clientPagination.vue';
import { watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
    name: 'clientEventView',
    components: {
        clientNavbar,
        clientNav2bar,
        clientPagination,
        clientEventCard,
    },

    setup() {

        let arr = ref([]);
        let curPage = ref(1);
        let lastPage = ref(1);
        let sortDefault = ref('Descending')
        let isSearchEvents = ref(false)
        const clientNav2bar = ref(null)
        const clientPagination = ref(null)
        const card = ref(null)
        const fontSize = ref(1)
        const perPage = ref(12);
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

        const handleChangeEventNumber = (eventNumber) => {
            // alert(eventNumber, "success")
            perPage.value = eventNumber
            fetchEvent(route.query.page, route.query.sort, route.query.input, route.query.category)
        }
        
        
        async function fetchEvent(page, sort, input, category) {
            [page, sort, category] = checkRouterValue(page, sort, category)
            // alert.value.alert("成功加載活動", "success")
            console.log(category)
            page = Number(page)
            let response
            if (input == undefined || input == '') {
                //set the new category value  to all child component category value
                isSearchEvents.value = false
                clientNav2bar.value.isSearchEvent = false
                clientPagination.value.isSearchEvents = false
                clientPagination.value.category = category
                response = await fetch('/api/cEvents?perPage=' + perPage.value + "&page=" + page + "&sort=" + sort + "&category=" + category, {
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
                
                response = await fetch('/api/cEvents/searchAll?input=' + input + '&perPage=' + perPage.value + '&sort=' + sort + "&page=" + page + "&category=" + category, {
                    method: 'POST'
                    
                })
            }
            if (response.ok) {
                var data = await response.json();
                arr.value = data.results;
                lastPage.value = data.pages;
                curPage.value = page;
                
            } else {
                alert(response.statusText, "danger");
            }
        }
        
        
        async function fetchSearchEvent(page, sort, input) {
            // sent request to server
            page = Number(page)
           
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
                alert(response.statusText, "danger");
            }
        }
               
        watch(fontSize, () => {
        //     console.log(currentValue);
        //     console.log(oldValue);
        });

        //watch the route, if the route change, then we need to fetch the event again
        watch(route, (currentValue) => {
            //onsole.log(currentValue.query.input);
            //console.log(oldValue);
            sortDefault.value = currentValue.query.sort
            fetchEvent(currentValue.query.page, currentValue.query.sort, currentValue.query.input, currentValue.query.category)
            
        });

        const bg = computed(() => {
            //check the route value, if the route value is undefined, then use the default value
            if (route.query.category == undefined) return "bg"
            var category = route.query.category.split("|")
            if (category.length > 1) return "bg"

            switch (category[0]) {
                case '兒童活動':
                    return 'child'
                case '青年活動':
                    return 'teen'
                case '活動義工招募':
                    return 'volunteer'
                case '同路人支援平台':
                    return 'platform'
                default:
                    return 'bg'
            }

        })

        function setFontSize(s) {
            fontSize.value = s
            cardWidth.value = 22 + 2 * s
        }
        
        onMounted(() => {
            //if the route doesn't have input, then use fetchEvent, else use fetchSearchEvent
            alert("歡迎回來", "success")

            fetchEvent(route.query.page, route.query.sort, route.query.input, route.query.category)
        })

        return {
            bg, arr, card, fontSize, cardWidth, curPage, lastPage, setFontSize, fetchEvent, isSearchEvents, sortDefault, fetchSearchEvent, clientNav2bar, clientPagination,
           perPage, handleChangeEventNumber
            
        }
    }
}
</script>

<style scoped>
.bg {
   
    flex-direction: column;
   
    background-color: rgb(250, 250, 250);

    background-size: 100% 100%;
    background-attachment: fixed;

    width: 100%;
    height: 100%;
    min-width: 900px;
    min-height: 1000px;

    justify-content: center;
    align-items: center;
}

.child {
    /* display: flex; */
    flex-direction: column;
   
    background-image: linear-gradient(to right top, #f5ffb3, #fff0c5, #ffece9, #fff3fe, #f8f8f8);
    /* background-image:url("@/assets/child.jpg"); */
    background-size: 100% 100%;
    background-attachment: fixed;
    position: absolute;
    width: 100%;
    height: 100%;
    min-width: 900px;
    min-height: 1000px;

    justify-content: center;
    align-items: center;
}

.teen {
    /* display: flex; */
    flex-direction: column;
    /* background-image: url("@/assets/city.jpg"); */
    /* background-image: v-bind(url('bg')); */
    /* make the dradient to yellow */
    background-image: linear-gradient(to right top, #b9f48e, #b9f48e, #b9f48e, #b9f48e, #b9f48e, #b9f48e, #b9f48e, #b9f48e, #b9f48e, #b9f48e, #b9f48e, #b9f48e);
    background-image: linear-gradient(to right top, #b9f48e, #bff39a, #c5f2a5, #cbf1b0, #d1f0bb, #d1f0bb, #d1f0bb, #d1f0bb, #cbf1b0, #c5f2a5, #bff39a, #b9f48e);
    background-size: 100% 100%;
    background-attachment: fixed;
    /* position: absolute; */
    width: 100%;
    height: 100%;
    min-width: 900px;
    min-height: 1000px;

    justify-content: center;
    align-items: center;
}
.volunteer {
    /* display: flex; */
    flex-direction: column;
    /* background-image: url("@/assets/city.jpg"); */
    /* background-image: v-bind(url('bg')); */
    /* make the dradient to yellow */
    background-image: linear-gradient(to right top, #f8c2d5, #f4d1e5, #f1dff0, #f2ecf6, #f8f8f8);
    background-size: 100% 100%;
    background-attachment: fixed;
    /* position: absolute; */
    width: 100%;
    height: 100%;
    min-width: 900px;
    min-height: 1000px;

    justify-content: center;
    align-items: center;
}

.platform {
    /* display: flex; */
    flex-direction: column;
    /* background-image: url("@/assets/city.jpg"); */
    /* background-image: v-bind(url('bg')); */
    /* make the dradient to yellow */
    background-image: linear-gradient(to right top, #d090ee, #d4acf6, #dbc7f9, #e7e0fa, #f8f8f8);
    background-attachment: fixed;
    /* position: absolute; */
    width: 100%;
    height: 100%;
    min-width: 900px;
    min-height: 1000px;

    justify-content: center;
    align-items: center;
}

#cards {
    max-width: max-content;
}

</style>


