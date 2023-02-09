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


    </div>
    <div class="d-flex justify-content-center p-4">
        <pagination @fetchPage="fetchEvent" :pagesProps="arr" :curPage="curPage" :lastPage="lastPage" :sort="sortDefault"/>

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
        async function sortEvent(sort) {
            fetchEvent(1, sort)
        }

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
                // console.log(arr.value)
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
            fetchEvent(pageDefault.value, sortDefault.value)
        })
        return {

            arr, curPage, lastPage, fetchEvent, sortEvent, sortDefault
        }
    }
}
</script>

<style scoped>

body {
  font-family: 'Montserrat';
  font-style: Italic;
  background-image: url("https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding:20px;
}
.cards {
    margin-left: 250px;
}
</style>