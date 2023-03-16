<template>


    <div class="container">
        <div class="loginForm">
            <h5>Login</h5>
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
                <button type="submit" class="btn btn-primary login-button mx-4">Login<font-awesome-icon icon="fa-solid fa-right-to-bracket " /></button>
                <a href="/createUser"> <button class="btn btn-primary login-button mx-4">Create Account<font-awesome-icon icon="fa-solid fa-right-to-bracket " /></button> </a>
            </div>
      
        </form>
    </div>
    </div>

</template>
  
<script>
import { ref } from "vue";
import jwt_decode from "jwt-decode";

export default {
    name: 'LoginView',
    components: {
    },
    setup() {
        const credential = ref({});

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
                alert("Login Successfully.")
                if(data.role == "admin"){
                    location.assign("/events")
                } else if(data.role == "user"){
                    location.assign("/cEvents")
                }
                
            } else {
                alert(response.statusText)
            }

        }

        return {
            credential, login
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
		transform: translateX(-30px) rotate(-6deg);
	}

	30% {
		transform: translateX(15px) rotate(6deg);
	}

	45% {
		transform: translateX(-15px) rotate(-3.6deg);
	}

	60% {
		transform: translateX(9px) rotate(2.4deg);
	}

	75% {
		transform: translateX(-6px) rotate(-1.2deg);
	}
}
.baseButton{
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

.container{
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

input{
    margin-left: 120px;
    width: fit-content;
    border: 1px solid gray;
    border-radius: 4px;
}
label{
    margin-left: 200px;
    width: fit-content;

}
img{
  
    -moz-user-select: none; 
-webkit-user-select: none; 
-ms-user-select: none; 
-khtml-user-select: none; 
user-select: none;
animation: dance 4s ease 0s infinite normal forwards;
}

h5, .h5 {
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    color: inherit;
    text-align: center;
    font-size: 5rem;
}
</style>