<template>
    
        <div class="row" id="navBar">
            <navBar />
        </div>
<div class="backGround">
        <div class="container mt-5">
            <div class="d-flex justify-content-between align-items-center mb-3 baseButton"
                style="background-color: #FEF1E6;">
                <h1 class="mx-auto baseButton" style="font-weight: bolder; ">新增用戶</h1>
            </div>
            <form @submit.prevent="createUser()">
                <div class="row">
                    <div class="form-group col-md-6">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="email" class="form-control" v-model="user.email" aria-describedby="email">
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="exampleInputEmail1" class="form-label">Username</label>
                        <input type="text" class="form-control" v-model="user.username" aria-describedby="full name">
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-4">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" v-model="user.password">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="exampleInputPassword1" class="form-label">role</label>
                        <select class="form-control" v-model="user.role">
                            <option selected>Open this select menu</option>
                            <option value="admin">Admin</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="exampleInputPassword1" class="form-label">Phone</label>
                        <input type="text" class="form-control" v-model="user.phone">
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-2">
                        <button v-if="!$route.params.id" type="submit" class="btn btn-primary mt-4">Create</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>


<script>
import { ref } from "vue";
import navBar from '@/components/public/navBar.vue';

export default {
    name: 'CreateUserView',
    components: {
        navBar
    },
    props: {
        id: String,
        newRecord: Boolean
    },
    setup() {
        const user = ref({});

        const createUser = async function () {

            var response = await fetch("/api/user/create", {
                method: "post",
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/json'
                },

                // body: new URLSearchParams(new FormData(event.target))
                body: JSON.stringify(user.value)
            });
            console.log(user.value)
            if (response.ok) {

                var text = await response.text();
                alert(text);
                location.assign("/login")
            } else {
                alert(response.statusText)
            }
        }

        return {
            user,
            createUser,
            navBar
        }
    }
}
</script>

<style scoped>
.container {
    border-top-right-radius: 5%;
    border-top-left-radius: 5%;
    border-bottom-right-radius: 5%;
    border-bottom-left-radius: 5%;
    background-color: #fff;
    min-width: 500px;

    box-shadow: rgba(0, 0, 0, 0.1) 0px 15px 30px;
    padding: 30px 20px;
    margin-top: 1px;
}

.baseButton {
    padding: 6px;
    border: none;
    border-radius: 4px;
}

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
</style>