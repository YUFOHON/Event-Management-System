<template>
    <!-- <QrCode data="test" />
    <QrCodeScanner :qrbox="250" :fps="10" style="width: 500px;" @result="onScan" /> -->
    <!-- <BufferFileInput @change="importExcel" accept=".xlsx" /> -->

    <!-- <form @submit.prevent="uploadTable">
        <table class="table table-striped">
            <tr>
                <th v-for="item in excelData[0]" :key="item">{{ item }}</th>
            </tr>
            <tr v-for="(item, rowIndex) in excelData.slice(1)" :key="item">
                <td v-for="(val, colIndex) in item" :key="val">
                    <input type="text" v-model="excelData[rowIndex + 1][colIndex]" />
                </td>
                <td><button type="button" @click="deleteRow(rowIndex + 1)">X</button></td>
            </tr>
        </table>

        <input type="submit" value="Save" />
    </form>
    <table class="table table-striped">
        <tr>
            <th v-for="item in excelData[0]" :key="item">{{ item }}</th>
        </tr>
        <tr v-for="(item, rowIndex) in excelData.slice(1)" :key="item">
            <td v-for="(val, colIndex) in item" :key="val">
                <input type="text" v-model="excelData[rowIndex + 1][colIndex]" />
            </td>
            <td><button type="button" @click="deleteRow(rowIndex + 1)">X</button></td>
        </tr>
    </table> -->


    <div class="row" id="navBar">
        <navBar />
    </div>

    <div class="row py-4" id="navSecondBar">
        <navSecondBar :arr="[
            {
                name: '主頁',
                URL: '/events'
            }
            ,
            {
                name: '活動',
                URL: '/events'
            }
        ]" :sortButton="true" :eventHistoryButton="true" :addButton="true" :searchButton="true"
            :isSearchEvents="isSearchEvents" @sorting="fetchEvent" @searchEvent="fetchSearchEvent" ref="navSecondBar" />
    </div>

    <div :class="bg">
        <div class="row" id="cards">

            <!-- <div class="col col-1 py-4 px-4" id="sideBarContainer">
            <SideBar @setFontSize="setFontSize" />
        </div> -->

            <div class="col " style="margin-left: 140px;">


                <div class="row d-flex">
                    <div v-for="a in arr" :key="a" class="col" id="cards">
                        <!-- {{ a._id }} -->
                        <eventCard :eventName="a.eventName" :image="a.image" :content="a.content" :id="a._id"
                            :Date="a.eventDate" :fontSize="fontSize" :cardWidth="cardWidth" :Category="a.Category"
                            :file="a.files" ref="card" />
                    </div>
                </div>

                <div class="d-flex justify-content-center p-4" id="pagination">
                    <pagination :pagesProps="arr" :curPage="curPage" :lastPage="lastPage" :sort="sortDefault"
                        :isSearchEvents="isSearchEvents" ref="pagination" />

                </div>
            </div>
        </div>
    </div>
    <Alert ref="alert" />
</template>

<script>
// @ is an alias to /src

import navBar from '@/components/public/navBar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue'
// import eventForm from '@/components/Bruce/eventForm.vue'
// import SideBar from '@/components/Bruce/sideBar.vue';
import { onMounted, computed, ref } from 'vue'
import eventCard from '@/components/Bruce/eventCard.vue';
import pagination from '@/components/Bruce/pagination.vue';
// import BufferFileInput from '@/components/Bruce/BufferFileInput.vue';
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { utils, read } from 'xlsx';
import Alert from '@/components/Bruce/AlertWindow.vue';

// import QrCode from '@/components/Bruce/QrCode.vue'
// import QrCodeScanner from '@/components/Bruce/QrCodeScanner.vue';
// import { useRouter } from 'vue-router'
export default {
    name: 'EventView',
    components: {
        navBar,
        navSecondBar,
        pagination,
        eventCard,
        Alert,
        // BufferFileInput
        // SideBar,
        // QrCode,
        // QrCodeScanner
    },
    setup() {
        const alert = ref(null)
        let arr = ref([]);
        let curPage = ref(1);
        let lastPage = ref(1);
        let sortDefault = ref('Descending')
        let isSearchEvents = ref(false)
        const navSecondBar = ref(null)
        const pagination = ref(null)
        const card = ref(null)
        const fontSize = ref(1)

        const cardWidth = ref(22 + 2 * 5)
        const route = useRoute()

        // const onScan = (decodedText, decodedResult) => {
        //     alert(decodedText);
        //     console.log(decodedText, decodedResult)
        // }
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
        const excelData = ref([]);
        const importExcel = (files) => {
            if (files.length > 0) {
                const workbook = read(files[0]);
                console.log(workbook.SheetNames[0])
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                excelData.value = Array.from(utils.sheet_to_json(worksheet, { raw: false, header: 1 }));
                console.log(excelData.value);
            }
        }
        const uploadTable = async () => {
            let response = await fetch('/api/import', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(excelData.value)
            })

            if (response.ok) {
                excelData.value = []
                // alert('data import success.')
            }
        }
        const deleteRow = (rowIndex) => {
            excelData.value.splice(rowIndex, 1);
        }

        //check the router value and set the default background iamge

        async function fetchEvent(page, sort, input, category) {
            [page, sort, category] = checkRouterValue(page, sort, category)
            alert.value.alert("成功加載活動", "success")
            // console.log(category)
            page = Number(page)
            let response
            if (input == undefined || input == '') {
                //set the new category value  to all child component category value
                isSearchEvents.value = false
                navSecondBar.value.isSearchEvent = false
                pagination.value.isSearchEvents = false
                pagination.value.category = category
                response = await fetch('/api/events?perPage=' + 12 + "&page=" + page + "&sort=" + sort + "&category=" + category, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else {
                //set the new category value  to all child component category value
                isSearchEvents.value = true
                navSecondBar.value.isSearchEvent = true
                pagination.value.isSearchEvents = true
                pagination.value.input = input
                pagination.value.category = category

                response = await fetch('/api/events/searchAll?input=' + input + '&sort=' + sort + "&page=" + page + "&category=" + category, {
                    method: 'POST'

                })
            }

            if (response.ok) {
                var data = await response.json();
                arr.value = data.results;
                lastPage.value = data.pages;
                curPage.value = page;

                // navSecondBar.value.isSearchEvent = false
                // pagination.value.isSearchEvents = false
            } else {
                alert(response.statusText);
            }
        }
        async function fetchSearchEvent(page, sort, input) {
            // sent request to server
            page = Number(page)
            // console.log(page + " " + sort + " " + input)

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
            fetchEvent(currentValue.query.page, currentValue.query.sort, currentValue.query.input, currentValue.query.category)

        });

        const bg = computed(() => {
            //check the route value, if the route value is undefined, then use the default value
            if(route.query.category == undefined) return "bg"
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

            alert.value.alert("歡迎回來", "success")

            fetchEvent(route.query.page, route.query.sort, route.query.input, route.query.category)
        })
        return {
            bg, alert, Alert, arr, card, fontSize, cardWidth, curPage, lastPage, setFontSize, fetchEvent, isSearchEvents, sortDefault, fetchSearchEvent, navSecondBar, pagination,
            importExcel, excelData, deleteRow, uploadTable
            //  QrCode, onScan

        }
    }
}
</script>

<style scoped>
.bg {
    display: flex;
    flex-direction: column;
    background-image: url("@/assets/city.jpg");
    /* background-image: v-bind(url('bg')); */
    /* background-image: linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #7ea4ec, #5aaff3, #22b8f3, #00c3ec, #00ccd7, #00d1b4, #0ed488); */
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
    display: flex;
    flex-direction: column;
    /* background-image: url("@/assets/city.jpg"); */
    /* background-image: v-bind(url('bg')); */
    /* make the dradient to yellow */
    background-image: linear-gradient(to right top, #f5ffb3, #fff0c5, #ffece9, #fff3fe, #f8f8f8);
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

.teen{
    display: flex;
    flex-direction: column;
    /* background-image: url("@/assets/city.jpg"); */
    /* background-image: v-bind(url('bg')); */
    /* make the dradient to yellow */
    background-image: linear-gradient(to right top, #b9f48e, #87fedb, #a1fcff, #ddf6ff, #f8f8f8);
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

.volunteer{
    display: flex;
    flex-direction: column;
    /* background-image: url("@/assets/city.jpg"); */
    /* background-image: v-bind(url('bg')); */
    /* make the dradient to yellow */
    background-image: linear-gradient(to right top, #f8c2d5, #f4d1e5, #f1dff0, #f2ecf6, #f8f8f8);    background-size: 100% 100%;
    background-attachment: fixed;
    /* position: absolute; */
    width: 100%;
    height: 100%;
    min-width: 900px;
    min-height: 1000px;

    justify-content: center;
    align-items: center;
}
.platform{
    display: flex;
    flex-direction: column;
    /* background-image: url("@/assets/city.jpg"); */
    /* background-image: v-bind(url('bg')); */
    /* make the dradient to yellow */
    background-image: linear-gradient(to right top, #d090ee, #d4acf6, #dbc7f9, #e7e0fa, #f8f8f8);    background-attachment: fixed;
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