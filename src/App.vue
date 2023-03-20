<template>
  <router-view />

</template>



<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
window.addEventListener('storage', res => {
  console.log(res)
  if (res.key === 'userId') {
    router.push(`/login`)
  }
})


</script>

<style >
/* @import '@/assets/font/index.css'; */
#app {
  /* font-family: 't'; */
  font-weight: 530;
  padding: 0; margin: 0; 
}

</style>

