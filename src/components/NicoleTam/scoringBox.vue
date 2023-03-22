<template>

    <div>
        <label for="rating-10">(1-10分，1分表示非常不值得推介；10分表示非常值得推介) </label>
        <b-form-rating id="rating-10" v-model="value10" stars="10"></b-form-rating>
        <p class="mt-2">Value: {{ value10 }}</p>
    </div>
</template>


<script>
export default {
    name: 'scoringBox',
    data() {
        return {
            value10: null,
        }
    }
}
</script>