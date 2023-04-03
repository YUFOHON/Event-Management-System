<template>
    <div>
        <div v-if="isSearchEvents" class="d-flex">
            <nav aria-label="Page navigation">
                <ul class="pagination pagination-circle">

                    <li :class="curPage == 1 ? 'page-item disabled' : 'page-item'">
                        <a class="page-link" @click="prePage">
                            Previous
                        </a>
                    </li>

                    <li :class="props.curPage == page ? 'active' : 'page-item'" v-for="page in pages" :key="page">
                        <router-link v-if="page != '...'" class="page-link"
                            :to="`/cEvents/?page=${page}&sort=${props.sort}&input=${input}&category=${category}`">
                            {{ page }}
                        </router-link>


                        <router-link v-else class="page-link"
                            :to="`/cEvents/?page=${page}&sort=${props.sort}&input=${input}&category=${category}`">

                            {{ page }}

                        </router-link>
                    </li>

                    <li :class="props.curPage == props.lastPage ? 'page-item disabled' : 'page-item'">
                        <a class="page-link" @click="nextPage">
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
            <div class="input-group">
                <form class="d-flex">
                    <input v-model="pageInput" class="form-control" type="number" placeholder="頁" aria-label="Search">
                    <span class="input-group-btn">
                        <button v-on:click="goToPage" class="btn btn-secondary" type="button">Go</button>
                    </span>
                </form>
            </div>
        </div>

        <div v-if="!isSearchEvents" class="d-flex">
            <nav aria-label="Page navigation">
                <ul class="pagination pagination-circle">

                    <li :class="curPage == 1 ? 'page-item disabled' : 'page-item'">
                        <a class="page-link" @click="prePage" style="background: none; border: none; color: #9b0000;">
                            <font-awesome-icon icon="fa-solid fa-chevron-left" />
                        </a>
                    </li>

                    <li :class="props.curPage == page ? 'active' : 'page-item'" v-for="page in pages" :key="page">
                        <router-link v-if="page != '...'" class="page-link"
                            :to="`/cEvents/?page=${page}&sort=${props.sort}&category=${category}`">
                            {{ page }}
                        </router-link>
                        <router-link v-else class="page-link" :to="`/cEvents/?page=${page}&sort=${props.sort}`">
                            {{ page }}
                            <!-- </a> -->
                        </router-link>
                    </li>

                    <li :class="props.curPage == props.lastPage ? 'page-item disabled' : 'page-item'">
                        <a class="page-link" @click="nextPage" style="background: none; border: none; color: #9b0000;">
                            <font-awesome-icon icon="fa-solid fa-chevron-right"/>
                        </a>
                    </li>

                </ul>

            </nav>
            <div class="input-group">
                <form class="d-flex"  @submit.prevent="goToPage">
                    <input v-model="pageInput" class="form-control" type="number" placeholder="頁" aria-label="Search">

                    <span class="input-group-btn">

                        <button class="btn btn-secondary" type="submit">Go</button>

                    </span>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
// import jwt_decode from "jwt-decode";
// import router from "@/router";
import { ref, } from "vue";
import { computed } from "vue";
import { watch } from "vue";
import { useRouter } from "vue-router";
export default {
    name: "paginationView",
    props: {
        curPage: Number,
        lastPage: Number,
        pagesProps: Array,
        sort: String,
    },
    setup(props) {
        const router = useRouter();
        const isSearchEvents = ref(false);
        const pageInput = ref(props.curPage);
        const pages = computed(() => {
            let n = props.curPage, t = props.lastPage;
            n = Number(n);
            t = Number(t);
            if (t < 10)
                return t;
            if (n <= 5) {
                return [1, 2, 3, 4, 5, 6, "...", t];
            }
            else if (n > t - 5) {
                return [1, "...", t - 5, t - 4, t - 3, t - 2, t - 1, t];
            }
            else {
                return [1, "...", n - 2, n - 1, n, n + 1, n + 2, "...", t];
            }
        });
        const input = ref("");
        const category = ref("");
        function prePage() {
            if (!isSearchEvents.value) {
                if (props.curPage > 1)
                    router.push(`/cEvents/?page=${props.curPage - 1}&sort=${props.sort}&category=${category.value}`);
            }
            else {
                if (props.curPage > 1)
                    router.push(`/cEvents/?page=${props.curPage - 1}&sort=${props.sort}&input=${input.value}&category=${category.value}`);
            }
        }
        function nextPage() {
            if (!isSearchEvents.value) {
                if (props.curPage < props.lastPage)
                    router.push(`/cEvents/?page=${props.curPage + 1}&sort=${props.sort}&category=${category.value}`);
            }
            else {
                if (props.curPage < props.lastPage)
                    router.push(`/cEvents/?page=${props.curPage + 1}&sort=${props.sort}&input=${input.value}&category=${category.value}`);
            }
        }
        function goToPage() {
            if (!isSearchEvents.value) {
                router.push(`/cEvents/?page=${pageInput.value}&sort=${props.sort}&category=${category.value}`);
                // location.reload();
            }
            // context.emit("fetchPage", pageInput.value, props.sort);
            else
                router.push(`/cEvents/?page=${pageInput.value}&sort=${props.sort}&input=${input.value}&category=${category.value}`);
            // context.emit("fetchSearchPage", pageInput.value, props.sort, input.value);
        }
        // when curPage change, pageInput will change
        watch(props, () => {
            pageInput.value = props.curPage;
        });
        return {
            props,
            pages,
            pageInput,
            isSearchEvents,
            input,
            nextPage,
            prePage,
            goToPage,
            category
        };
    },
    // components: { router }
}
</script>

<style scoped>
.page-item {
    cursor: pointer;
}

.page-item.disabled {
    cursor: not-allowed;
}

.page-link.active,
.page-link {
    border-radius: 50%;

}

.form-control {
    font-size: 15px;
    font-family: Arial;
    width: 140px;
    height: 40px;
    border-width: 2px;
    color: #fff;
    border-color: #a8aca9;
    font-weight: bold;
    border-top-left-radius: 28px;
    border-top-right-radius: 28px;
    border-bottom-left-radius: 28px;
    border-bottom-right-radius: 28px;
    background: #ffffff;
}

.btn-secondary {
    position: absolute;
    right: 41px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #9b0000;
}

.btn-secondary:hover {
    background: #9b0000;
}

.input-group {
    margin-left: 30px;
    position: relative;
}

.page-link.active,
.active>.page-link {
    background-color: #9b0000;
    border-color: #9b0000;
}
</style>

