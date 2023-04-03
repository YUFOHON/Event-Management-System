<template>
    <div class="row" id="navBar">
        <navBar />
    </div>
    <div class="backGround">


        <div class="container-md mt-4">
            <nav class="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between">
                <button class="navbar-toggler " type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                    <li class="nav-item active">
                        <a class="nav-link" href="/">主頁 / <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="/users">用戶</a>
                    </li>
                </ul>


                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <form @submit.prevent="SearchUser(1)" class="d-flex ms-auto order-1">
                        <input class="form-control mr-sm-2 me-2" type="search" v-model="searchValue" placeholder="Search"
                            aria-label="Search">
                        <button class="btn btn-outline-danger my-2 my-sm-0 margin-right" type="submit"><font-awesome-icon
                                icon="fa-solid fa-magnifying-glass" /></button>
                        <button class="btn btn-outline-danger d-flex" @click="createUser()"><font-awesome-icon
                                icon="fa-solid fa-user-plus" /></button>

                        <button @click="addFile" style="min-width: 120px;margin-left: 10px;"
                            class="btn btn-outline-danger"><font-awesome-icon :icon="['fas', 'file-import']" />
                            導入Excel</button>
                    </form>
                    <BufferFileInput ref="BufferFileInput" @change="importExcel" style="visibility: hidden;"
                        accept=" .xlsx" />

                </div>
            </nav>
        </div>

        <div class="excel">
            <form @submit.prevent="uploadTable">
                <table class="table table-striped">
                    <tr>
                        <th v-for="item in excelData[0]" :key="item">{{ item }}</th>
                    </tr>
                    <tr v-for="(item, rowIndex) in excelData.slice(1)" :key="item">
                        <td v-for="(val, colIndex) in item" :key="val">
                            <input type="text" v-model="excelData[rowIndex + 1][colIndex]" />
                        </td>
                        <td><button type="button" @click="deleteRow(rowIndex + 1)">刪除</button></td>
                    </tr>
                </table>

            </form>
        </div>

        <button v-if="excelData.length > 0" class="btn my-3 btn-danger" @click="uploadTable">上傳</button>

        <div class="container">
            <div class="row">
                <div class="row d-flex">
                    <div class="container mt-4" v-for="user in users" :key="user._id" style="width: 18rem;">
                        <!-- <section class="mx-auto my-5"> -->
                        <div class="backgroundEffect"></div>
                        <div class="card">

                            <!-- <div class="card testimonial-card mt-2 mb-3"> -->
                            <!-- <div v-if="user.is_admin == false" class="card-up aqua-gradient"></div>
                                <div v-if="user.is_admin == true" class="card-up aqua-gradient2"></div> -->
                            <div class="avatar mx-auto white">
                                <!-- <img src="@/assets/CCF.jpg" class="rounded-circle img-fluid" alt="CCF"> -->
                                <img v-if="user.Sex == 'F'" src="../assets/girl.jpg" class="rounded-circle img-fluid"
                                    id="avatar" alt="Avatar" />
                                <img v-if="user.Sex == 'M'" src="../assets/boy.jpg" class="rounded-circle img-fluid"
                                    id="avatar" alt="Avatar" />
                            </div>
                            <div class="card-body  text-center">
                                <h4 v-if="user.is_admin == false" class="card-title font-weight-bold">{{
                                    user.Patient_Name
                                }}
                                    ({{ user.Child_ID }})
                                </h4>
                                <h4 v-if="user.is_admin == true" class="card-title font-weight-bold">{{ user.Staff_Name
                                }}
                                </h4>
                                <hr>
                                <p v-if="user.is_admin == false">Type: Client</p>
                                <p v-if="user.is_admin == true">Type: Admin</p>
                                <p> 年紀: {{ user.Age }} 性別: {{ user.Sex }}</p>
                                <p><i class="fas fa-quote-left"></i> 醫院: {{ user.Hospital }}</p>
                                <p><i class="fas fa-quote-left"></i> 診斷: {{ user.Diagnosis }}</p>

                                <!-- 
                                <button type="submit">Details</button> -->
                                <router-link :to="'/user/' + user._id"><button
                                        class="btn btn-primary check-button">查看</button></router-link>
                                <!-- <a href="/cProfile" class="card-link">Details</a>   -->
                            </div>

                            <!-- <div class="overlay">
                                <div class="overlay-content"></div>
                                <router-link :to="'/user/' + user._id">Update</router-link> 
                            </div> -->
                            <!-- </div> -->

                        </div>
                        <!-- </section> -->
                    </div>
                </div>
            </div>
            <div class="row mt-4">
                <nav aria-label="...">
                    <ul class="pagination justify-content-center">
                        <li class="page-item">
                            <a v-if="currentPageNum > 1" @click="fetchPage(currentPageNum - 2)" class="page-link"
                                aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                                <span class="sr-only">Previous</span>
                            </a>
                        </li>
                        <li class="page-item" v-for="i in pages" :key="i" @click="fetchPage(i)"><a v-if="i > 0"
                                class="page-link" v-bind:class="{ active: currentPageNum == i }">{{ i }}</a></li>
                        <li class="page-item">
                            <a v-if="currentPageNum < lastPage" @click="fetchPage(currentPageNum + 2)" class="page-link"
                                aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                                <span class="sr-only">Next</span>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>


    </div>
</template>

<script>
import navBar from '@/components/public/navBar.vue'
import BufferFileInput from '@/components/Bruce/BufferFileInput.vue';
import { utils, read } from 'xlsx';
import { ref, computed, onMounted } from "vue";
// import { useRoute } from 'vue-router';


export default {
    name: 'UserView',
    components: {
        // navSecondBar,
        navBar,
        BufferFileInput
    },
    setup() {
        // const route = useRoute();
        const searchValue = ref('');
        const users = ref([]);
        const lastPage = ref(0);
        const perPage = ref(6);
        const currentPageNum = ref(0);
        const BufferFileInput = ref(null);
        const excelData = ref([]);
        const importExcel = (files) => {
            if (files.length > 0) {
                const workbook = read(files[0]);
                // console.log(workbook.SheetNames[0])
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                excelData.value = Array.from(utils.sheet_to_json(worksheet, { raw: false, header: 1 }));
                // console.log(excelData.value);
            } else
                excelData.value = [];
        }

        const deleteRow = (rowIndex) => {
            excelData.value.splice(rowIndex, 1);
        }
        const pages = computed(() => {
            var pages = [];
            for (var i = currentPageNum.value - 2; i <= Math.min(currentPageNum.value + 2, lastPage.value); i++) {
                pages.push(i)
            }
            return pages;

        })

        const fetchPage = async function (page) {
            currentPageNum.value = page;
            let token = localStorage.getItem("user");
            var response = await fetch("/api/hello/users?perPage=" + perPage.value + "&page=" + page, {
                method: 'GET',
                headers: {
                    "x-access-token": token
                }
            });
            if (response.ok) {
                var data = await response.json();
                users.value = data.users;
                lastPage.value = data.lastPage
                // alert("Welcome Admin!", "success");
            } else {
                // alert(response.statusText);
            }
        };

        const SearchUser = async function (page) {

            currentPageNum.value = page;
            // alert(searchValue.value)

            var response = await fetch("/api/users2/search?perPage=" + perPage.value + "&page=" + page + "&search=" + searchValue.value, {
                method: 'GET',
                headers: {

                }
            });
            if (response.ok) {
                var data = await response.json();
                users.value = data.users;
                lastPage.value = data.pages;
                // alert(users.value);
            } else {
                alert("response.statusText", "danger");
            }
        };
        const createUser = async function () {

            location.assign("/createUser");
        };
        const addFile = (
            () => {
                BufferFileInput.value.addFile();

            }


        )
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
                alert('成功上傳', 'success')
            }
        }
        onMounted(function () {
            fetchPage(1);
            // alert(props.msg);
            alert("成功加載用戶資料", "success", 3000)

        });

        return {
            navBar,
            uploadTable,
            pages,
            fetchPage,
            currentPageNum,
            lastPage,
            users,
            SearchUser,
            searchValue,
            createUser,
            addFile,
            deleteRow,
            importExcel,
            excelData,
            BufferFileInput,
        }
    }

}


</script>

<style scoped>
.backGround {
    display: flex;
    flex-direction: column;
    background-image: url("@/assets/watercolor.jpg");
    background-size: 100% 100%;
    background-attachment: fixed;

    width: 100%;
    height: 100%;
    min-width: 900px;
    min-height: 1000px;

    /* justify-content: center; */
    align-items: center;
}

.margin-right {
    margin-right: 10px;
}

.cards {
    margin-left: 250px;
}

.card {
    border-radius: 20px;
}

.card:hover {
    /* color: #fff; */
    transform: scale(1.03);
    box-shadow: 0 4px 25px 0 rgba(255, 119, 119, 0.729), 0 0 1px 0 rgba(0, 0, 0, .25);

    /* transform: translateY(-4px); */
    transition: 0.5s;
    width: 100%;
    /* background: linear-gradient(180deg,#FDF6F0, #f06565); */
    background: #f06565;
    opacity: 0.8;
    /* background: #f06565; */
    color: #fff;
}

.check-button {
    background: #FE8F8F;
    box-shadow: none;
    border: none
}

.check-button:hover {
    background: #FCD2D1;
}


body {
    background-color: #f5f7fa;
}

.testimonial-card .card-up {
    height: 120px;
    overflow: hidden;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
}

.aqua-gradient {
    background: linear-gradient(40deg, #ff5050, #f5c8c8) !important;
}

.aqua-gradient2 {
    background: linear-gradient(40deg, #7090fc, #c8e0f5) !important;
}

.testimonial-card .avatar {
    width: 120px;
    margin-top: -60px;
    overflow: hidden;
    border: 5px solid #fff;
    border-radius: 50%;
}

.excel {
    margin-top: 20px;
    width: 80%;
    overflow-x: auto;
    padding: 1em;
    border: 1px solid #CCC;
    border-radius: 1em;
}

.container-md {
    max-width: 90%;
    border-radius: 20px;
    background-color: #c1c1c153;
}

.page-item{
    color: #f06565;
}


.page-item :hover{
    background: #FCD2D1;
    color: white;
}

.pagination .page-item .active{
    background: #FE8F8F;
}
.pagination{
    --bs-pagination-color: dimgray;
    --bs-pagination-active-border-color: white;
}

</style>