<template>
    <!-- <head> 
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    </head> -->
    <link href="http://apps.bdimg.com/libs/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet">
    <link href="css/star-rating.min.css" media="all" rel="stylesheet" type="text/css" />

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