<template>
    <head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-2vU6FvUcZUMpWhm0PJ6zQ9l1zOJhYdG+/z+0KUxJ6hLw6Uv5LodMa+6Xu5A5A5JjK0+gJf7x66xP4Hb7QZK4uw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
</head>
    <div>
      <h2>Star Rating Component</h2>
      <StarRating/>
      
      <p>Selected rating: {{ selectedRating }}</p>
    </div>
  </template>
  
  <script>
  import StarRating from '@/components/NicoleTam/starRating.vue'
  
  export default {
    name: "TestView",
    components: {
      StarRating
    },
    data() {
      return {
        selectedRating: null
      }
    },
    methods: {
      handleRatingSelected(rating) {
        this.selectedRating = rating
      }
    }
  }
  </script>