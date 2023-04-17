<template>
  <div>
    <div class="star_rating">
      <button class="star" v-for="i in max" :key='i' :value="i" @click="rate(i)">&star;</button>

      <div class="star_rating_current">
        <button class="star current" v-for="i in current" :key='i' :value="i">&starf;</button>
      </div>
      <p> Your rating: {{ current }} </p>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'

const allStar = document.querySelectorAll('.star.current')
console.log(allStar)

export default {
  name: "starRating",
  data() {
    return {
      max: 10,
      current: 0,
    }
  },
  watch: {
    current() {
      Vue.forceUpdate()
    }
  },
  setup(){
    
    const rate = async function(i){

      console.log(i)
      this.current = i

      console.log(this.current)
    }

    return{
      rate
    }

  }


}
</script>

<style>
.star {
  color: #f1c40f;
  background-color: unset;
  border: none;
}

.star_rating {
  display: inline-block;
  font-size: 24px;
  position: relative;
}

.star_rating_current {
  font-size: 24px;
  position: absolute;
  top: 0;
}


</style>