<template>
  <router-view />
  <div id="liveAlertPlaceholder"></div>
</template>



<script setup>
import { useRouter } from "vue-router";
// import {  } from "vue";
// import Alert from '@/components/Bruce/AlertWindow.vue';
const alert = (message, type, time) => {
  // console.log(time)
  if (time == null) time = 1000
  if (type == null) type = 'success'
  const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div style="padding-left:50%;">${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  setTimeout(() => {
    wrapper.remove()
  }, time)

  alertPlaceholder.append(wrapper)
}

window.alert = alert



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
  padding: 0;
  margin: 0;
}

#liveAlertPlaceholder {
  position: fixed;
  top: 0%;
  right: 0%;
  width: 100%;
  align-content: center;
  /* padding-left: 50%; */
  /* height: 100%; */
  /* z-index: 999;
    pointer-events: none; */
}
</style>

