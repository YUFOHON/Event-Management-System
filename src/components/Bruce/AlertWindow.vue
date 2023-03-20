<template>
    <div id="liveAlertPlaceholder"></div>
</template>


<script setup>
import { onMounted, defineProps, watch, defineExpose } from 'vue';
const props = defineProps({
    msg: String
})

const alert = (message, type, time) => {
    // console.log(time)
    if (time == null) time = 1000

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

watch(() => props.msg, (first, second) => {

    alert(props.msg, 'danger')
    console.log(first, second)
});

defineExpose({
    alert
})

onMounted(() => {
    // console.log("props.msg", props.msg)
    // alert(props.msg, 'danger')

})


</script>
<style>
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
