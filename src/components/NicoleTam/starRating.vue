
Sure, here's a simple star rating component in Vue.js:

```
<template>
  <div>
    <span v-for="(star, index) in maxStars" :class="'star'" :key="index" @click="setStarRating(index)">
      {{ star }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    maxStars: {
      type: Number,
      default: 5
    },
    initialRating: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      currentRating: this.initialRating
    };
  },
  methods: {
    setStarRating(index) {
      this.currentRating = index + 1;
    }
  }
};
</script>

<!-- <script>
export default {
  props: {
    maxStars: {
      type: Number,
      default: 5
    },
    initialRating: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      allStars: []
    };
  },
  created() {
    this.setStarRating(this.initialRating);
  },
  methods: {
    setStarRating(index) {
      this.allStars = new Array(this.maxStars).fill("&#9734");
      for (let i = 0; i <= index; i++) {
        this.$set(this.allStars, i, "&#9733");
      }
      this.$emit("rating-updated", index + 1);
    }
  }
};
</script> -->

<style> * {
   margin: 0;
   padding: 0;
   box-sizing: border-box;
 }

 .star {
   font-size: 3rem;
   color: rgb(250, 229, 42);
   background-color: unset;
   border: none;
 }

 .star:hover {
   cursor: pointer;
 }

 .star_rating {
   user-select: none;
 }
</style> 


