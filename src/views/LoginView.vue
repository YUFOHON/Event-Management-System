<template>
    <div class="bg">
        <div class="loginForm">
            <div class="left">
                <video src="@/assets/loginVideo.mp4" muted autoplay loop></video>
            </div>
            <div class="right">
                <!-- <img src="@/assets/CCF.jpg" class="rounded mx-auto d-block" alt="Bootstrap" width="300" height="300"> -->
                <form @submit.prevent="login()">
                    <h1 class="">登入</h1>
                    <label for="exampleInputEmail1" class="form-label">Username</label>
                    <input type="text" class="form-control" v-model="credential.username" aria-describedby="emailHelp">


                    <label for="exampleInputPassword1" class="form-label">Password</label>
                    <input type="password" class="form-control" v-model="credential.password">


                    <div class="d-flex justify-content-center">
                        <button type="submit" class="btn btn-primary login-button mx-4">Login<font-awesome-icon
                                icon="fa-solid fa-right-to-bracket " /></button>
                        <!-- <a href="/createUser"> <button class="btn btn-primary login-button mx-4">Create
                                Account<font-awesome-icon icon="fa-solid fa-right-to-bracket " /></button> </a> -->
                    </div>

                </form>
            </div>

        </div>
    </div>



    <!-- <Alert ref="alert" /> -->
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
        // const alert = ref(null)
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

                if (data.role == "admin" || data.role == "staff") {
                    location.assign("/events")
                } else if (data.role == "user") {
                    location.assign("/cEvents")
                } else {
                    location.assign("/cEvents")
                }

            } else {
                // alert(response.statusText)
                alert(response.statusText, "danger", 30000)
            }

        }
        onMounted(() => {
            alert("歡迎使用CCF管理系統", "success", 3000)
            alert("no bug before push", "danger", 99999999999999)
 
        })

        return {
            credential, login, alert
        }
    }
}
</script>

<style scoped>
/* @keyframes dance {

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
} */

.baseButton {
    /* padding: 6px; */
    border: none;
    border-radius: 4px;
}

.login-button {
    background: #FE8F8F;
    color: white;
    font-weight: 500;
    /* background-image: linear-gradient(to right top, #d16ba5, #d48ac0, #d8a7d6, #dec3e7, #e8ddf4, #e6d8f1, #e5d4ed, #e4cfe9, #dda8cd, #d880a5, #cf5773, #bb2d3b);     */
    box-shadow: none;
    width: 100%;
    border: none;
    /* border-radius: 20px; */
}

.login-button:hover {
    background: #FCD2D1;
}

video {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.right {
    width: 300px;
    height: 360px;
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
    align-items: center;
    background-color: color(255, 255, 255, 0.9);
}

.bg {
    /* border-radius: 100%; */
    /* position: absolute; */
    display: flex;
    width: 100vw;
    height: 100vh;
    background-image: url("@/assets/watercolor.jpg");
    /* background-image: linear-gradient(to right top, #d16ba5, #d48ac0, #d8a7d6, #dec3e7, #e8ddf4, #e6d8f1, #e5d4ed, #e4cfe9, #dda8cd, #d880a5, #cf5773, #bb2d3b);     */
    justify-content: center;
    align-items: center;
}

.loginForm {
    width: 600px;
    height: 360px;
    background-color: #fff;
    box-shadow: 0 0 20px 10px rgba(0,0,0,0.1);
    border-radius: 10px;
    display: flex;
    overflow: hidden;
}

.left {
    width: 50%;
    height: 100%;
    background-color: #00c3ec;
}

input {
    width: fit-content;
    border: 1px solid gray;
    border-radius: 4px;
    width: 100%;
    margin-bottom: 10%;
    height:30px;
    border: none;
    outline: none;
    
}


h1 {
    font-size: 2rem;
    font-weight: 500;
    color: rgb(221, 10, 10);
    margin-bottom: 30px;
    text-align: center;
}

label {
    color: rgb(221, 10, 10);
    font-size: 1rem;
    padding-bottom: 15px;
    /* padding-left: 23%; */
    margin-bottom: -10px;
    width: fit-content;

}

/* img {

    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    animation: dance 4s ease-in-out 1;
    margin-bottom: 5%;
} */

/* h5, */
/* .h5 {
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
    text-align: center;
    font-size: 5rem;
} */
</style>