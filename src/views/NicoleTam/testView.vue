<template>
    <!-- <div> 
        <star-rating :max-stars="5" :initial-rating="3"></star-rating>
    <p>Current rating: {{ currentRating }}</p>
    </div> -->
    <head>
        <meta charset="utf-8">

        <title>VueJS Quiz Sample</title>
        <meta name="description" content="VueJS Quiz">
    </head>
    
    <body>
        <div id="app">
            <div class="container">
                <div class="jumbotron mt-3">
                    <h1 class="mb-5">{{ quiz.title }}</h1>
                    <hr>
                    <p v-if="errors[questionIndex]" class="alert alert-danger">
                        {{ error }}
                    </p>
                    <div v-for="(question, index) in quiz.questions" :key='index' >
                        <div v-show="index === questionIndex">

                            <h4 class="mt-5 mb-3">{{ question.text }}</h4>

                            <div v-for="answer in question.answers" :key='answer' class="form-check">
                                <label class="form-check-label">
                                    <input class="form-check-input" type="radio" :value="answer.value" :name="index"
                                        v-model="responses[index]">
                                    {{ answer.text }}
                                </label>
                            </div>

                            <div class="mt-5">
                                <button class="btn btn-primary" v-if="questionIndex > 0" @click="prev">
                                    prev
                                </button>
                                <button class="btn btn-secondary" @click="next">
                                    next
                                </button>
                            </div>
                        </div>
                    </div>

                    <div v-show="questionIndex === quiz.questions.length">
                        <h3>Your Results</h3>
                        <p>
                            You are: {{ score() }}
                        </p>

                        <button class="btn btn-success" @click="playAgain">
                            Play Again!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>


<script>
// import StarRating from '@/components/NicoleTam/starRating.vue';
// import starRating from '@/components/NicoleTam/starRating.vue'

let quiz = {
    title: "Quiz Sample Title",
    questions: [
        {
            text: 'Question 1 description',
            answers: [
                {
                    text: 'Answer 1',
                    value: 1
                },
                {
                    text: 'Answer 2',
                    value: 2
                },
                {
                    text: 'Answer 3',
                    value: 3
                },
            ]
        },
        {
            text: 'Question 2 description',
            answers: [
                {
                    text: 'Answer 1',
                    value: 1
                },
                {
                    text: 'Answer 2',
                    value: 2
                },
                {
                    text: 'Answer 3',
                    value: 3
                },
            ]
        }
    ]
};
export default {
    name: "FeedbackView",
    data: () => ({
        quiz: quiz,
        questionIndex: 0,
        responses: [],
        errors: [],
        error: ""
    }),
    setup() {
        // return { starRating };
    },
    methods: {
        prev: function () {
            this.questionIndex--;
        },
        next: function () {
            if (this.responses[this.questionIndex] === undefined) {
                this.errors[this.questionIndex] = 1;
                this.error = "Please select your answer";
            }
            else {
                this.errors[this.questionIndex] = 0;
                this.questionIndex++;
            }
        },
        score: function () {
        },
        playAgain: function () {
            this.questionIndex = 0;
        }
    },
    // components: { StarRating }
}
</script>