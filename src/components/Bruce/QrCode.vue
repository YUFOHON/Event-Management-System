<script setup>
import { defineProps, onMounted, ref } from 'vue'
import QRCode from 'qrcode'

const props = defineProps({
    data: {
        type: String,
        required: true
    }
});

const src = ref("");
onMounted(async () => {
    src.value = await QRCode.toDataURL(props.data, {
        color: {
            dark: '#0000FF',  // Blue dots
            light: '#0000' // Transparent background
        }
    });
}

);
</script>

<template>
  <img :src="src" />
</template>