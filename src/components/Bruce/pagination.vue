<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">

            <li :class="curPage == 1 ? 'page-item disabled' : 'page-item'">
                <a class="page-link" @click="prePage">
                    Previous
                </a>
            </li>

            <li :class="props.curPage == page ? 'active' : 'page-item'" v-for="page in pages" :key="page">
                <a class="page-link " v-on:click="this.$emit('fetchPage', page)" v-if="page != '...'">
                    {{ page }}
                </a>
                <a class="page-link " v-else>
                    {{ page }}
                </a>
            </li>

            <li :class="props.curPage == props.lastPage ? 'page-item disabled' : 'page-item'">
                <a class="page-link" @click="nextPage">
                    Next
                </a>
            </li>

        </ul>
    </nav>
</template>

<script>
// import jwt_decode from "jwt-decode";
// import { ref, } from "vue";
import { computed } from "vue";
// import { defineEmits } from 'vue';

export default {
    name: 'paginationView',
    // emits: ['prePageEvent', 'nextPageEvent'],
    props: {
        curPage: Number,
        lastPage: Number,
        pagesProps: Array
    },
    // prePage: async function (page) {
    //     if (this.curPage > 1)
    //         this.$emit('fetchPage', page - 1)
    //     // this.fetchPage(page - 1)
    // },
    // nextPage: async function (page) {
    //     if (this.curPage < this.lastPage)
    //         this.$emit('fetchPage', page + 1)
    //     // this.fetchPage(page + 1)

    // },
    // fetchPage: async function (page) {
    //     this.$emit('fetchPage', page)
    // }

    setup(props, context) {
        //get the current page and last page
        // const curPage = ref(props.curPageProps)
        // const lastPage = ref(props.lastPageProps)
        // const _this = this
        const pages = computed(() => {
            let n = props.curPage, t = props.lastPage
            if (t < 10) return t;
            if (n <= 5) {
                return [1, 2, 3, 4, 5, 6, '...', t];
            } else if (n > t - 5) {
                return [1, '...', t - 5, t - 4, t - 3, t - 2, t - 1, t];
            } else {
                return [1, '...', n - 2, n - 1, n, n + 1, n + 2, '...', t];
            }
        })



        function prePage() {
            // console.log(page)
            if (props.curPage > 1)
                context.emit('fetchPage', props.curPage - 1)
        }
        function nextPage() {
            context.emit('fetchPage', props.curPage + 1)
        }
        return {
            props, pages, nextPage, prePage
        }

    }

}
</script>

<style scoped>
.page-item {
    cursor: pointer;
}

.page-item.disabled {
    cursor: not-allowed;
}
</style>