<template>
    <div id="liveAlertPlaceholder"></div>
</template>


<script setup>
import { onMounted, defineProps,watch } from 'vue';
const props = defineProps({
    msg: String
})

const alert = (message, type) => {
    const alertPlaceholder = document.getElementById('liveAlertPlaceholder')

    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

    alertPlaceholder.append(wrapper)
}

watch(() => props.msg, (first, second) => {

    alert(props.msg, 'danger')
    console.log(first, second)
});

onMounted(() => {
    // console.log("props.msg", props.msg)
    // alert(props.msg, 'danger')

})


</script>
<style>
#liveAlertPlaceholder {
    position: fixed; 
     top: 0;
    right: 0;
    width: 100%;
    /* height: 100%; */
    /* z-index: 999;
    pointer-events: none; */
}
</style>
