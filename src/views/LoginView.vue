<template>
    <div class="container">
        <div class="loginForm">
            <h5>登入</h5>
            <img src="@/assets/CCF.jpg" class="rounded mx-auto d-block" alt="Bootstrap" width="300" height="300">
            <form @submit.prevent="login()">
                <div class="mb-3">
                    <label for="exampleInputEmail1" class="form-label">Username</label>
                    <input type="text" class="form-control" v-model="credential.username" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="credential.password">
                </div>

                <div class="d-flex justify-content-center">
                    <button type="submit" class="btn btn-primary login-button mx-4">Login<font-awesome-icon
                            icon="fa-solid fa-right-to-bracket " /></button>
                    <a href="/createUser"> <button class="btn btn-primary login-button mx-4">Create
                            Account<font-awesome-icon icon="fa-solid fa-right-to-bracket " /></button> </a>
                </div>

            </form>
        </div>
    </div>
    <Alert ref="alert" />
</template>
  
<script>
import { ref, onMounted } from "vue";
import jwt_decode from "jwt-decode";

export default {
    name: 'LoginView',
    components: {
    },
    setup() {
        const credential = ref({});
        const alert=ref(null)
        const login = async function () {

            var response = await fetch("/api/user/login", {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(credential.value)
            });

            if (response.ok) {
                var data = await response.json()
                localStorage.setItem("token", data.token);
                localStorage.setItem("role", data.role);
                localStorage.setItem("userId", data.userId);

                var decoded = jwt_decode(data.token);
                localStorage.setItem("tt", decoded["user_id"]);
                // console.log(decoded["user_id"]);
                // alert(JSON.stringify(decoded))
                // alert(JSON.stringify(data))
                
                if (data.role == "admin") {
                    location.assign("/events")
                } else if (data.role == "user") {
                    location.assign("/cEvents")
                }else{
                    location.assign("/cEvents")
                }

            } else {
                // alert(response.statusText)
                alert.value.alert(response.statusText, "success",3000)
            }

        }
        onMounted(() => {
            alert.value.alert("歡迎使用CCF管理系統", "success",3000)
        })

        return {
            credential, login,alert
        }
    }
}
</script>

<style scoped>
#app {
    font-family: Arial, Helvetica, sans-serif;
    color: #2c3e50;
}

@keyframes dance {

    0%,
    100% {
        transform: translateX(0%);
        transform-origin: 50% 50%;
        
    }

    15% {
        transform: translateX(-30px) rotate(-6deg)scale(1.1);
    }

    30% {
        transform: translateX(15px) rotate(6deg)scale(1);
    }

    45% {
        transform: translateX(-15px) rotate(-3.6deg)scale(1.1);
    }

    60% {
        transform: translateX(9px) rotate(2.4deg)scale(1);
    }

    75% {
        transform: translateX(-6px) rotate(-1.2deg)scale(1.1);
    }
}

.baseButton {
    padding: 6px;
    border: none;
    border-radius: 4px;
}

.login-button {
    background: #FE8F8F;
    box-shadow: none;
    border: none
}

.login-button:hover {
    background: #FCD2D1;
}

.container {
    /* border-radius: 100%; */
    display: flex;
    flex-direction: column;
    background-image: url("@/assets/BG2.jpg");
    background-size: 100% 100%;
    background-attachment: fixed;

    width: 100%;
    height: 100%;
    min-width: 900px;
    min-height: 1000px;

    justify-content: center;
    align-items: center;

}

.loginForm {
    /* border-radius: 80%; */
    border-top-right-radius: 5%;
    border-top-left-radius: 5%;
    border-bottom-right-radius: 5%;
    border-bottom-left-radius: 5%;
    background-color: #fff;
    min-width: 500px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 15px 30px;
    padding: 30px 20px;
}

input {
    margin-left: 120px;
    width: fit-content;
    border: 1px solid gray;
    border-radius: 4px;
}

label {
    margin-left: 200px;
    width: fit-content;

}

img {

    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    animation: dance 4s ease-in-out 1 ;
    margin-bottom: 5%;
}

h5,
.h5 {
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
    text-align: center;
    font-size: 5rem;
}</style>