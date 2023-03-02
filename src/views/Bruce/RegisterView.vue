<template>
    <div>
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
                ,
                {
                    name: '註冊表格',
                    URL: '#'
                }]" :sortButton="false" :eventHistoryButton="false" :addButton="false" :searchButton="false" />
        </div>

        <div class="row">
            <registerForm :eventID="eventID" :eventName="eventName" :userId="userID" />>
        </div>

    </div>
</template>

<script>
import navBar from '@/components/public/navBar.vue'
import navSecondBar from '@/components/Bruce/navSecondBar.vue'
import { useRoute } from 'vue-router';
import registerForm from '@/components/Bruce/registerForm.vue';


export default {
    name: 'RegisterView',
    components: {
        navBar,
        navSecondBar,
        registerForm

    },
    setup() {
        const route = useRoute();
        const eventID = route.query.eventId;
        const eventName = route.query.eventName;
        const userID = localStorage.getItem('userId');
        return {
            eventID, eventName, registerForm, userID
        }
    }
}

</script>