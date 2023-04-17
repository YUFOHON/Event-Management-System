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
                <div class="row mt-4">
                    <div class="form-group col-md-6">
                        <label for="exampleInputEmail1" class="form-label">電郵地址</label>
                        <input type="email" class="form-control" v-model="user.email" aria-describedby="email">
                        <div id="emailHelp" class="form-text">本機構不會向第三方分享你的電郵地址.</div>
                    </div>
                    <div class="form-group col-md-6">
                        <label for="exampleInputEmail1" class="form-label">用戶名稱</label>
                        <input type="text" class="form-control" v-model="user.username" aria-describedby="full name">
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="form-group col-md-4">
                        <label for="exampleInputPassword1" class="form-label">密碼</label>
                        <input type="password" class="form-control" v-model="user.password">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="exampleInputPassword1" class="form-label">身分</label>
                        <select class="form-control" v-model="user.is_admin">
                            <option selected>請選擇</option>
                            <option :value=true>管理員</option>
                            <option :value=false>員工</option>
                            <option :value=false>一般用戶</option>
                        </select>
                    </div>
                    <div class="form-group col-md-4">
                        <label for="exampleInputPassword1" class="form-label">電話</label>
                        <input type="text" class="form-control" v-model="user.phone">
                    </div>
                </div>
                <div class="row mt-4">
                    <div class="form-group col-md-4" v-if="user.is_admin==false">
                        <label for="inputAddress">姓名</label>
                        <input type="text" class="form-control" v-model="user.Patient_Name" placeholder="Staff name">
                    </div>
                    <div class="form-group col-md-4" v-if="user.is_admin==true">
                        <label for="inputAddress">姓名</label>
                        <input type="text" class="form-control" v-model="user.Staff_Name" placeholder="patient name">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputAddress2">年紀</label>
                        <input type="text" class="form-control" v-model="user.Age" placeholder="Age">
                    </div>
                    <div class="form-group col-md-4">
                        <label for="inputState">性別</label>
                        <select v-model="user.Sex" class="form-control">
                            <option selected>Choose...</option>
                            <option>M</option>
                            <option>F</option>
                        </select>
                    </div>
                </div>

                <div v-if="user.is_admin == false" class="form-group">
                    <div class="row mt-4">
                        <div class="form-group col-md-6">
                            <label for="inputCity">醫院</label>
                            <input type="text" class="form-control" v-model="user.Hospital">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputCity">診斷</label>
                            <input type="text" class="form-control" v-model="user.Diagnosis">
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="form-group col-md-4">
                            <label for="inputCity">負責職員</label>
                            <input type="text" class="form-control" v-model="user.Responsible_Worker">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputCity">聯絡人</label>
                            <input type="text" class="form-control" v-model="user.Contact_Person">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="inputCity">關係</label>
                            <input type="text" class="form-control" v-model="user.Relationship">
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-md-2">
                        <button v-if="!$route.params.id" type="submit" class="btn btn-primary create-button mt-4">建立用戶</button>
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
.create-button {
    background: #FE8F8F;
    box-shadow: none;
    border: none
}

.create-button:hover {
    background: #FCD2D1;
}
</style>