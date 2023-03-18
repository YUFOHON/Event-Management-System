<template>
    <div class="row col-5">
  <h4 class="fw-bold text-center mt-3"></h4>
  <form class=" bg-white px-4" action="">
    <p class="fw-bold">How satisfied are you with our service?</p>
    <div class="form-check mb-2">
      <input class="form-check-input" type="radio" name="exampleForm" id="radioExample1" />
      <label class="form-check-label" for="radioExample1">
        Option 1
      </label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="radio" name="exampleForm" id="radioExample2" />
      <label class="form-check-label" for="radioExample2">
        Option 2
      </label>
    </div>
    <div class="form-check mb-2">
      <input class="form-check-input" type="radio" name="exampleForm" id="radioExample3" />
      <label class="form-check-label" for="radioExample3">
        Option 3
      </label>
    </div>
  </form>
  <div class="text-end">
    <button type="button" class="btn btn-primary">Submit</button>
  </div>
</div>
  </template>
  
  <script>
    // import { VueFeedbackReaction } from 'vue-feedback-reaction';
    // import { VueReactionEmoji } from 'vue-feedback-reaction';
  
    export default {
      name: 'FeedbackView',
      components: {
        // VueFeedbackReaction,
        // VueReactionEmoji
      },
    //   data: () => ({
    //     reaction: 'hate',
    //     isActive: false,
    //     isDisabled: false
    // })
    };
  </script>