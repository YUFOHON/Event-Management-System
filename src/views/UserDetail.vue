<template>
    <div class="row">
        <navBar />
    </div>

    <div class="container rounded bg-white mt-5 mb-5">
        <form @submit.prevent="updateUser()">
            <div class="row mt-4">
                <div class="form-group col-md-6">
                    <label for="inputEmail4">Username</label>
                    <input type="text" class="form-control" v-model="user.username" placeholder="Username">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputPassword4">Password</label>
                    <input type="text" class="form-control" v-model="user.password" placeholder="Password">
                </div>
            </div>

            <div class="row mt-4">
                <div class="form-group col-md-4">
                    <label for="inputAddress">Name</label>
                    <input type="text" class="form-control" v-model="user.Patient_Name" placeholder="patient name">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputAddress2">Age</label>
                    <input type="text" class="form-control" v-model="user.Age" placeholder="Age">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputState">Gender</label>
                    <select v-model="user.Sex" class="form-control">
                        <option selected>Choose...</option>
                        <option>M</option>
                        <option>F</option>
                    </select>
                </div>
            </div>

            <div class="row mt-4">

                <div class="form-group col-md-6">
                    <label for="inputCity">Hospital</label>
                    <input type="text" class="form-control" v-model="user.Hospital">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputCity">Diagnosis</label>
                    <input type="text" class="form-control" v-model="user.Diagnosis">
                </div>
            </div>

            <div class="row mt-4">
                <div class="form-group col-md-6">
                    <label for="inputCity">Responsible Worker</label>
                    <input type="text" class="form-control" v-model="user.Responsible_Worker">
                </div>
                <div class="form-group col-md-6">
                    <label for="inputCity">Contact Person</label>
                    <input type="text" class="form-control" v-model="user.Contact_Person">
                </div>
            </div>

            <div class="row mt-4">
                <div class="form-group col-md-4">
                    <label for="inputCity">Relationship</label>
                    <input type="text" class="form-control" v-model="user.Relationship">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputCity">Sibling(1)</label>
                    <input type="text" class="form-control" id="inputCity">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputCity">Age(1)</label>
                    <input type="text" class="form-control" id="inputCity1">
                </div>

            </div>

            <div class="row mt-4">
                <div class="form-group col-md-4">
                    <label for="inputZip">Date of Open</label>
                    <input type="text" class="form-control" v-model="user.Date_of_open">
                </div>
                <div class="form-group col-md-4">
                    <label for="inputZip">Onset Date</label>
                    <input type="text" class="form-control" v-model="user.Onset_date">
                </div>
                <!-- <div class="form-group col-md-4">
                    <label for="inputZip">Relapsed Date</label>
                    <input type="text" class="form-control" id="inputZip">
                </div> -->
            </div>

            <!-- <div class="form-group">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck">
                <label class="form-check-label" for="gridCheck">
                    Check me out
                </label>
            </div>
        </div> -->
            <div class="row justify-content-center">
                <div class="col-md-2">
                    <button type="submit" class="green baseButton mt-4 ">Update!</button>
                </div>
                <div class="col-md-2">
                    <button type="submit" class="red baseButton mt-4 " @click="delUser()">delete!</button>
                </div>

            </div>
        </form>
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

    setup() {

        const user = ref({});
        const route = useRoute();
        alert(user);

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




<style>
.baseButton{
    padding: 6px;
    border: none;
    border-radius: 4px;
}

.green {
background-color: #99ffcc;
color: rgb(50, 49, 49);
/* border: 1px solid gray; */
}

.red {
background-color: #fc8181;
color: white;
/* border: 1px solid gray; */
}
</style>