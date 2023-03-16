<template>
    <div class="row" id="navBar">
        <navBar />
    </div>
    <div class="backGround">
        <div class="container-md mt-4">
            <nav class="navbar navbar-expand-lg bg-body-tertiary d-flex justify-content-between">

                <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
                    <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li class="nav-item active">
                            <a class="nav-link" href="/">主頁 / <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/users">用戶</a>
                        </li>
                    </ul>

                    <form @submit.prevent="SearchUser(1)" class="d-flex ms-auto order-1">
                        <input class="form-control mr-sm-2 me-2" type="search" v-model="searchValue" placeholder="Search"
                            aria-label="Search">
                        <button class="btn btn-outline-danger my-2 my-sm-0 margin-right" type="submit"><font-awesome-icon
                                icon="fa-solid fa-magnifying-glass" /></button>
                        <button class="btn btn-outline-danger d-flex" @click="createUser()"><font-awesome-icon
                                icon="fa-solid fa-user-plus" /></button>
                    </form>

                </div>
            </nav>
        </div>


        <div class="container">
            <div class="row">
                <div class="row d-flex">
                    <div class="container mt-4" v-for="user in users" :key="user._id" style="width: 18rem;">
                        <section class="mx-auto my-5">

                            <div class="card testimonial-card mt-2 mb-3">
                                <div v-if="user.is_admin == false" class="card-up aqua-gradient"></div>
                                <div v-if="user.is_admin == true" class="card-up aqua-gradient2"></div>
                                <div class="avatar mx-auto white">
                                    <img src="@/assets/CCF.jpg" class="rounded-circle img-fluid" alt="CCF">
                                </div>
                                <div class="card-body text-center">
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
                                    <router-link :to="'/user/' + user._id">查看</router-link>
                                    <!-- <a href="/cProfile" class="card-link">Details</a>   -->
                                </div>

                                <!-- <div class="overlay">
                                <div class="overlay-content"></div>
                                <router-link :to="'/user/' + user._id">Update</router-link> 
                            </div> -->
                            </div>

                        </section>
                    </div>
                </div>
            </div>
            <div class="row">
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
// import navSecondBar from '@/components/Bruce/navSecondBar.vue'
import { ref, computed, onMounted } from "vue";
// import { useRoute } from 'vue-router';


export default {
    name: 'UserView',
    components: {
        // navSecondBar,
        navBar,
    },
    setup() {
        // const route = useRoute();
        const searchValue = ref('');
        const users = ref([]);
        const lastPage = ref(0);
        const perPage = ref(6);
        const currentPageNum = ref(0);
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
                alert("Welcome Admin!");
            } else {
                alert(response.statusText);
            }
        };

        const SearchUser = async function (page) {

            currentPageNum.value = page;
            alert(searchValue.value)

            var response = await fetch("/api/users2/search?perPage=" + perPage.value + "&page=" + page + "&search=" + searchValue.value, {
                method: 'GET',
                headers: {

                }
            });
            if (response.ok) {
                var data = await response.json();
                users.value = data.users;
                lastPage.value = data.pages;
                alert(users.value);
            } else {
                alert(response.statusText);
            }
        };
        const createUser = async function () {

            location.assign("/createUser");
        };


        onMounted(function () {
            fetchPage(1);
            // alert(props.msg);
        });

        return {
            navBar,
            pages,
            fetchPage,
            currentPageNum,
            lastPage,
            users,
            SearchUser,
            searchValue,
            createUser
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
    margin-right: 8px;
}

.cards {
    margin-left: 250px;
}

.card:hover {
    transform: translateY(-4px);
    transition: 0.5s;
    box-shadow: 0 4px 25px 0 rgba(255, 119, 119, 0.729), 0 0 1px 0 rgba(0, 0, 0, .25)
}

.card .overlay {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    opacity: 0;
}

.overlay-content {
    line-height: 224px;
    width: 100%;
    text-align: center;
    color: #fff;
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

.container-md {
    max-width: 90%;
    border-radius: 20px;
    background-color: #c1c1c153;
}
</style>