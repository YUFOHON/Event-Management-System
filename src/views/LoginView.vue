<template>
    <img src="@/assets/CCF.jpg" class="rounded mx-auto d-block" alt="Bootstrap" width="300" height="300">

    <div class="container">
        <form @submit.prevent="login()">
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email/ username</label>
                <input type="email" class="form-control" v-model="credential.email" aria-describedby="emailHelp">
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control" v-model="credential.password">
            </div>

            <div class="d-flex justify-content-center">
                <button type="submit" class="pink baseButton">Login</button>
            </div>

        </form>
    </div>
</template>
  
<script>
<<<<<<< HEAD
import { ref } from "vue";

=======
// import { ref } from "vue";
// import jwt_decode from "jwt-decode";
>>>>>>> 8c95d71dbc289487853962dd7295604b19c8277c

export default {
    name: 'LoginView',
    components: {
    },
    // setup() {
    //     const credential = ref({});

    //     const login = async function () {

<<<<<<< HEAD
            var response = await fetch("/api/login", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(credential.value)
            });

            if (response.ok) {
                var data = await response.json()

                alert(JSON.stringify(data))
                alert("login Successfully.")
            } else {
                alert(response.statusText)
            }
        }
=======
    //         var response = await fetch("/api/user/login", {
    //             method: "post",
    //             headers: {
    //                 "content-type": "application/json"
    //             },
    //             body: JSON.stringify(credential.value)
    //         });

    //         if (response.ok) {
    //             var data = await response.json()
    //             localStorage.setItem("user", data.token);

    //             var decoded = jwt_decode(data.token);
    //             console.log(decoded);
    //             alert(JSON.stringify(data))
    //             alert("login Successfully.")
    //         } else {
    //             alert(response.statusText)
    //         }
    //     }
>>>>>>> 8c95d71dbc289487853962dd7295604b19c8277c

    //     return {
    //         credential, login
    //     }
    // }
}
</script>

<style>
#app {
    font-family: Arial, Helvetica, sans-serif;
    color: #2c3e50;
}

.baseButton{
    padding: 6px;
    border: none;
    border-radius: 4px;
}

.pink {
background-color: palevioletred;
color: white;
/* border: 1px solid gray; */
}

</style>