<script setup>
import { defineEmits, defineProps, onMounted } from 'vue'
import {Html5QrcodeScanner} from "html5-qrcode"

const props = defineProps({
  qrbox: {
    type: Number,
    default: 250
  },
  fps: {
    type: Number,
    default: 10
  }, 
});

const emit = defineEmits(['result']);

const onScanSuccess = (decodedText, decodedResult) => {
  emit('result', decodedText, decodedResult);
}

onMounted(() => {
  const html5QrcodeScanner = new Html5QrcodeScanner('qr-code-full-region', props);
  html5QrcodeScanner.render(onScanSuccess);
});
</script>

<template>
<div id="qr-code-full-region"></div>
</template>