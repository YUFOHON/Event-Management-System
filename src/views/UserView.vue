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
                name: '用戶',
                URL: '/user'
            }
        ]" ref="navSecondBar" />
    </div>
    <div class="row">
        <div class="row d-flex">
            <div class="container" v-for="user in users" :key="user._id" style="width: 18rem;">
                <section class="mx-auto my-5" >

                    <div class="card testimonial-card mt-2 mb-3">
                        <div class="card-up aqua-gradient"></div>
                        <div class="avatar mx-auto white">
                            <img src="@/assets/CCF.jpg" class="rounded-circle img-fluid" alt="woman avatar">
                        </div>
                        <div class="card-body text-center">
                            <h4 v-if="user.is_admin==false" class="card-title font-weight-bold">{{ user.Patient_Name }}</h4>
                            <h4 v-if="user.is_admin==true" class="card-title font-weight-bold">{{ user.Staff_Name }}</h4>
                            <hr>
                            <p v-if="user.is_admin==false">Type: Client</p>
                            <p v-if="user.is_admin==true">Type: Admin</p>
                            <p><i class="fas fa-quote-left"></i> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                Eos,
                                adipisci</p>

                              <a href="/cProfile" class="card-link">Details</a>  
                        </div>  
                    </div>

                </section>
            </div>
        </div>
    </div>
</template>

<script>
import navBar from '@/components/public/navBar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue'
import { ref, computed, onMounted } from "vue";


export default {
    name: 'UserView',
    components: {
        navSecondBar,
        navBar,
    },
    setup() {
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
            var response = await fetch("/api/users?perPage=" + perPage.value + "&page=" + page, {
                headers: {
                    "x-access-token": token
                }
            });
            if (response.ok) {
                var data = await response.json();
                users.value = data.users;
                lastPage.value = data.pages
                alert("Welcome Admin!");
            } else {
                alert(response.statusText);
            }
        };
        onMounted(function () {
            fetchPage(1);
            // alert(props.msg);
        });

        return {
            navSecondBar,
            navBar,
            pages,
            fetchPage,
            currentPageNum,
            lastPage,
            users
        }
    }

}


</script>

<style scoped>
.cards {
    margin-left: 250px;
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

.testimonial-card .avatar {
    width: 120px;
    margin-top: -60px;
    overflow: hidden;
    border: 5px solid #fff;
    border-radius: 50%;
}
</style>