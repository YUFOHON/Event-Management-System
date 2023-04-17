<template>
    <div class="row">
        <navBar />
    </div>
    <div class="backGround">
        <div class="container">



            <form @submit.prevent="updateUser()">

                <div class="d-flex justify-content-between align-items-center mb-3 baseButton">
                    <h1 class="mx-auto" style="font-weight: bolder;">用戶設定</h1>
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-3">

                        <div class="form-group" style="margin: auto;">
                            <img v-if="user.Sex == 'F'" src="../assets/girl.jpg" class="rounded-circle img-fluid"
                                id="avatar" alt="Avatar" />
                            <img v-if="user.Sex == 'M'" src="../assets/boy.jpg" class="rounded-circle img-fluid" id="avatar"
                                alt="Avatar" />

                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="row mt-4">
                            <div class="form-group col-md-6">
                                <label for="inputEmail4">用戶名稱</label>
                                <input type="text" class="form-control" v-model="user.username" placeholder="Username">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputPassword4">密碼</label>
                                <input type="text" class="form-control" v-model="user.password" placeholder="Password">
                            </div>
                        </div>

                        <div class="row mt-4">
                            <div v-if="user.is_admin==false" class="form-group col-md-4">
                                <label for="inputAddress">姓名</label>
                                <input type="text" class="form-control" v-model="user.Patient_Name"
                                    placeholder="patient name">
                            </div>
                            <div v-if="user.is_admin==true" class="form-group col-md-4">
                                <label for="inputAddress">姓名</label>
                                <input type="text" class="form-control" v-model="user.Staff_Name"
                                    placeholder="Staff name">
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

                        <div v-if="user.is_admin==false" class="row mt-4" >

                            <div class="form-group col-md-6">
                                <label for="inputCity">醫院</label>
                                <input type="text" class="form-control" v-model="user.Hospital">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="inputCity">診斷</label>
                                <input type="text" class="form-control" v-model="user.Diagnosis">
                            </div>
                        </div>

                        <div v-if="user.is_admin==false" class="row mt-4">
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

                        <!-- <div v-if="user.Sibling_1 == null && user.Age_1 == null" class="row mt-4">
                <button class="btn btn-primary" @click="addSibling">Add Sibling</button>

            </div> -->
                        <div class="row mt-4">
                            <div class="form-group col-md-4">
                                <label for="inputZip">Date of Open</label>
                                <input v-model="user.Date_of_open" data-format="dd/mm/yyyy" type="date"
                                    class="form-control">
                            </div>
                            <div class="form-group col-md-4">
                                <label for="inputZip">Onset Date</label>
                                <input v-model="user.Onset_date" data-format="dd/mm/yyyy" type="date" class="form-control">
                            </div>

                            <hr class="mt-4">
                            <div v-if="user.Sibling_1 != null && user.Age_1 != null" class="row mt-4">
                                <div class="form-group col-md-6">
                                    <label for="inputCity">兄弟姐妹(1)</label>
                                    <input type="text" class="form-control" v-model="user.Sibling_1">
                                </div>


                                <div class="form-group col-md-6">
                                    <label for="inputCity">年紀(1)</label>
                                    <div class="form-inline">
                                        <input type="text" class="form-control" v-model="user.Age_1">
                                    </div>
                                </div>
                            </div>
                            <!-- <div class="row mt-4">
                                <button @click.prevent="addSibling" class="btn btn-outline-primary">Add Siblings</button>
                            </div>

                            <div v-for="(relative, index) in relatives" :key="index" class="row mt-4">
                                <div class="form-group col-md-6">
                                    <input type="text" class="form-control" v-model="relative.Sibling"
                                        placeholder="Enter Sibling's name: " />
                                    <input type="text" class="form-control" v-model="relative.Age"
                                        placeholder="Enter Sibling's age: " />
                                </div> -->
                                <!-- <div class="form-group col-md-6">
                                    <label for="inputCity">年紀(2)</label>
                                    <input type="text" class="form-control" v-model="user.Age_2">
                                </div> -->
                                <!-- <button @click.prevent="remove(index)" class="btn btn-outline-danger" v-show="index != 0">
                                    Remove
                                </button>
                            </div> -->


                            <div v-if="user.Sibling_2 != null && user.Age_2 != null" class="row mt-4">
                                <div class="form-group col-md-6">
                                    <label for="inputCity">兄弟姐妹(2)</label>
                                    <input type="text" class="form-control" v-model="user.Sibling_2">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputCity">年紀(2)</label>
                                    <input type="text" class="form-control" v-model="user.Age_2">
                                </div>
                            </div>
                            <div v-if="user.Sibling_3 != null && user.Age_3 != null" class="row mt-4">
                                <div class="form-group col-md-6">
                                    <label for="inputCity">兄弟姐妹(3)</label>
                                    <input type="text" class="form-control" v-model="user.Sibling_3">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="inputCity">年紀(3)</label>
                                    <input type="text" class="form-control" v-model="user.Age_3">
                                </div>
                            </div>

                        </div>
                        <div class="row justify-content-center align-items-center">
                            <div class="col-md-2">
                                <button type="submit" class="btn btn-primary edit-button mt-4 ">更新</button>
                            </div>
                            <div class="col-md-2">
                                <button type="submit" class="btn btn-primary del-button mt-4 "
                                    @click="delUser()">刪除</button>
                            </div>

                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>
</template>



<script>
import navBar from "@/components/public/navBar.vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
    name: "UserDetail",
    components: {
        navBar,
        // navSecondBar
        // SideBar
    },
    data() {
        return {
            relatives: [
                {
                    Sibling_2: "",
                },
            ],
        };
    },
    methods: {
        addSibling() {
            this.relatives.push({
                Sibling: "",
                Age: ""
            });
        },
        remove(index){
            this.relative.splice(index,1);
        }
    },

    setup() {

        const user = ref({});
        const route = useRoute();
        // alert(user);

        onMounted(async () => {
            // alert("here")
            alert(route.params.id);
            var response = await fetch("/api/users/detail/" + route.params.id);
            if (response.ok) {
                user.value = await response.json();

            }

        });

        const updateUser = async function () {
            delete user.value._id;
            var response = await fetch("/api/users/" + route.params.id, {
                method: "put",
                headers:
                {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify(user.value)
            });

            if (response.ok) {
                var text = await response.text();
                alert(text);
                location.assign("/users");

            } else {
                alert(response.statusText)
            }

        }

        const delUser = async function () {
            var response = await fetch("/api/users/" + route.params.id, {
                method: "delete",
                headers: {
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Type': 'application/json'
                },
            });
            if (response.ok) {
                // var text = await response.text();
                alert("User Deleted");
                location.assign("/users")
            } else {
                alert(response.statusText)
            }
        }


        return {
            navBar,
            id: new URLSearchParams(window.location.search).get("id"),
            user,
            updateUser,
            delUser
        }


    }
}

</script>




<style scoped>
.form-group label {
    color: black;
    font-weight: bold;
}

.baseButton {
    padding: 6px;
    border: none;
    border-radius: 4px;
}

.edit-button {
    background: #FE8F8F;
    box-shadow: none;
    border: none
}

.edit-button:hover {
    background: #FCD2D1;
}

.del-button {
    background: #911F27;
    box-shadow: none;
    border: none
}

.del-button:hover {
    background: #FCD2D1;
}

form {
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

    justify-content: center;
    align-items: center;
}
</style>